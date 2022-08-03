from django.shortcuts import render
from django.core.mail import send_mail
from datetime import datetime, timedelta, time
from django.conf import settings
from django.db.models import Count, Sum, Q, F
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
# content functions
from main_app.models import SystemUser, UserTransactions


def list_transactions(user_instance, status, transaction_type, requesting_user_type, transaction_from_date, transaction_to_date, custom_search):

    today = datetime.now().date()
    list_of_user_preferences_instances = []

    # default transactions

    if requesting_user_type == 'client':
        default_transaction_ids = UserTransactions.objects.filter(user=user_instance, rejected=False).values_list('id', flat=True)
    else:
        default_transaction_ids = UserTransactions.objects.filter(rejected=False).values_list('id', flat=True)

    # get transactions by status

    if status is None or status == '':
        transaction_by_status_ids = default_transaction_ids
    else:
        if status == 'notifications':
            transaction_by_status_ids = UserTransactions.objects.filter(Q(notify_loan_admin=True)|Q(notify_user=True)).values_list('id', flat=True)
        elif status == 'completed':
            transaction_by_status_ids = UserTransactions.objects.filter(Q(notify_loan_admin=False)|Q(notify_user=False)).values_list('id', flat=True)
        elif status == 'pending':
            transaction_by_status_ids = UserTransactions.objects.filter(verified=False).values_list('id', flat=True)
        else:
            transaction_by_status_ids = default_transaction_ids

    # get transactions by type

    if transaction_type is None or transaction_type == '':
        transaction_by_type_ids = default_transaction_ids
    else:
        transaction_by_type_ids = UserTransactions.objects.filter(transaction_type=transaction_type).values_list('id', flat=True)

    # get transactions from a date

    if transaction_from_date is None or transaction_from_date == '' or transaction_from_date == 'undefined-undefined-undefined':
        transaction_from_a_date_ids = default_transaction_ids
    else:
        transaction_from_a_date_ids = UserTransactions.objects.filter(transaction_carried_out_on_date_time__gte=transaction_from_date).values_list('id', flat=True)

    # get transactions from a date
    
    if transaction_to_date is None or transaction_to_date == '' or transaction_to_date == 'undefined-undefined-undefined':
        transaction_to_a_date_ids = default_transaction_ids
    else:
        transaction_to_a_date_ids = UserTransactions.objects.filter(transaction_carried_out_on_date_time__lte=transaction_to_date).values_list('id', flat=True)

    # get transactions by custom search

    if custom_search is None or custom_search == '':
        transaction_by_custom_search_ids = default_transaction_ids
    else:
        transaction_by_custom_search_ids = UserTransactions.objects.filter(Q(transaction_code__icontains=custom_search)
                                                               | Q(description__icontains=custom_search)) \
                                               .values_list('id', flat=True)

    ids_of_the_transactions_to_return_list = list(set(transaction_by_status_ids) & set(transaction_by_type_ids)
                                              & set(transaction_by_custom_search_ids) & set(transaction_from_a_date_ids) & set(transaction_to_a_date_ids))

    # returned_transactions = UserTransactions.objects.all().filter(id__in=ids_of_the_transactions_to_return_list)

    return ids_of_the_transactions_to_return_list



