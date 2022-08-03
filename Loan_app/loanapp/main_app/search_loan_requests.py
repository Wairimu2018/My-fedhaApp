from django.shortcuts import render
from django.core.mail import send_mail
from datetime import datetime, timedelta, time
from django.conf import settings
from django.db.models import Count, Sum, Q, F
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
# content functions
from main_app.models import SystemUser, UserTransactions, LoansRecord


def list_loan_requests(transaction_status, requested_by_client_slug, transaction_from_date, transaction_to_date, custom_search):

    today = datetime.now().date()
    list_of_user_preferences_instances = []

    # default loan requests

    default_transaction_ids = LoansRecord.objects.values_list('id', flat=True)

    # loan requests by status

    if transaction_status is None or transaction_status == '':
        title_of_loan_requests_by_status = ''
        ids_of_loan_requests_by_status = LoansRecord.objects.filter(loan_request_rejected=False).values_list('id', flat=True)
    else:
        if transaction_status == 'rejected':
            title_of_loan_requests_by_status = 'rejected'
            ids_of_loan_requests_by_status = LoansRecord.objects.filter(loan_request_rejected=True).values_list('id', flat=True)
        else:
            title_of_loan_requests_by_status = ''
            ids_of_loan_requests_by_status = LoansRecord.objects.filter(loan_request_rejected=False).values_list('id', flat=True)

    # loan requests of client

    if requested_by_client_slug is None or requested_by_client_slug == '':
        title_of_loan_requests_of_client = ''
        ids_of_loan_requests_of_client = default_transaction_ids
    else:
        check_client = SystemUser.objects.filter(slug=requested_by_client_slug).count()
        if check_client == 0:
            title_of_loan_requests_of_client = ''
            ids_of_loan_requests_of_client = default_transaction_ids
        else:
            client_instance = SystemUser.objects.get(slug=requested_by_client_slug)
            ids_of_loan_requests_of_client = LoansRecord.objects.filter(user=client_instance).values_list('id', flat=True)

            get_client_details = SystemUser.objects.all().filter(slug=requested_by_client_slug)
            for client_data in get_client_details:
                client_first_name = client_data.first_name
                client_last_name = client_data.last_name

            title_of_loan_requests_of_client = ' of '+client_first_name+' '+client_last_name+' '


    # get transactions from a date

    if transaction_from_date is None or transaction_from_date == '' or transaction_from_date == 'undefined-undefined-undefined':
        loans_granted_from_a_date_title = ''
        ids_of_loans_granted_from_a_date = default_transaction_ids
    else:
        loans_granted_from_a_date_title = transaction_from_date
        ids_of_loans_granted_from_a_date = LoansRecord.objects.filter(granted_on_date_time__gte=transaction_from_date).values_list('id', flat=True)

    # get transactions from a date
    
    if transaction_to_date is None or transaction_to_date == '' or transaction_to_date == 'undefined-undefined-undefined':
        loans_granted_to_a_date_title = ''
        ids_of_loans_granted_to_a_date = default_transaction_ids
    else:
        loans_granted_to_a_date_title = transaction_to_date
        ids_of_loans_granted_to_a_date = LoansRecord.objects.filter(granted_on_date_time__lte=transaction_to_date).values_list('id', flat=True)

    if loans_granted_from_a_date_title == '' and loans_granted_to_a_date_title == '':
        loans_date_range_title = ''
    elif loans_granted_from_a_date_title != '' and loans_granted_to_a_date_title == '':
        loans_date_range_title = ' given from '+loans_granted_from_a_date_title
    elif loans_granted_from_a_date_title == '' and loans_granted_to_a_date_title != '':
        loans_date_range_title = ' given up to '+loans_granted_to_a_date_title
    elif loans_granted_from_a_date_title != '' and loans_granted_to_a_date_title != '':
        loans_date_range_title = ' given from '+loans_granted_from_a_date_title+' to '+loans_granted_to_a_date_title
    else:
        loans_date_range_title = ''

    # get transactions by custom search

    if custom_search is None or custom_search == '':
        loans_with_search_term_title = ''
        ids_of_loans_with_search_term = default_transaction_ids
    else:
        loans_with_search_term_title = '. Search term: '+custom_search
        ids_of_loans_with_search_term = LoansRecord.objects.filter(Q(loan_code__icontains=custom_search)).values_list('id', flat=True)

    ids_of_the_transactions_to_return_list = list(set(ids_of_loan_requests_of_client) & set(ids_of_loan_requests_by_status) & set(ids_of_loans_granted_from_a_date)
                                              & set(ids_of_loans_granted_to_a_date) & set(ids_of_loans_with_search_term))

    title = 'List of '+title_of_loan_requests_by_status+' loans '+title_of_loan_requests_of_client+''+loans_date_range_title+''+loans_with_search_term_title

    # returned_transactions = LoansRecord.objects.all().filter(id__in=ids_of_the_transactions_to_return_list)

    return ids_of_the_transactions_to_return_list, title



