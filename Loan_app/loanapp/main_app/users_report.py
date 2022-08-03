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


def list_users(user_status, accepted_by_client_slug, accepted_from_date, accepted_to_date, custom_search):

    today = datetime.now().date()
    list_of_user_preferences_instances = []

    # default users

    default_users_ids = SystemUser.objects.values_list('id', flat=True)

    # users by status

    if user_status is None or user_status == '':
        users_by_status_title = ''
        ids_of_users_by_status = SystemUser.objects.values_list('id', flat=True)
    else:
        if user_status == 'active':
            users_by_status_title = ' active '
            ids_of_users_by_status = SystemUser.objects.filter(active=True).values_list('id', flat=True)
        elif user_status == 'deactive':
            users_by_status_title = ' deactive '
            ids_of_users_by_status = SystemUser.objects.filter(active=False).values_list('id', flat=True)
        else:
            users_by_status_title = ''
            ids_of_users_by_status = SystemUser.objects.values_list('id', flat=True)

    # users verified by employee

    if accepted_by_client_slug is None or accepted_by_client_slug == '':
        clients_of_employee_title = ''
        ids_of_clients_of_employee = default_users_ids
    else:
        check_client = SystemUser.objects.filter(slug=accepted_by_client_slug).count()
        if check_client == 0:
            clients_of_employee_title = ''
            ids_of_clients_of_employee = default_users_ids
        else:
            ids_of_clients_of_employee = SystemUser.objects.filter(account_verified_by=accepted_by_client_slug).values_list('id', flat=True)

            get_employee_details = SystemUser.objects.all().filter(slug=accepted_by_client_slug)
            for employee_data in get_employee_details:
                employee_first_name = employee_data.first_name
                employee_last_name = employee_data.last_name

            clients_of_employee_title = ' verified by '+employee_first_name+' '+employee_last_name+' '


    # get users accepted from a date

    if accepted_from_date is None or accepted_from_date == '' or accepted_from_date == 'undefined-undefined-undefined':
        users_verified_from_a_date_title = ''
        ids_of_users_verified_from_a_date = default_users_ids
    else:
        users_verified_from_a_date_title = accepted_from_date
        ids_of_users_verified_from_a_date = SystemUser.objects.filter(account_verified_on_date_time__gte=accepted_from_date).values_list('id', flat=True)

    # get users accepted to a date
    
    if accepted_to_date is None or accepted_to_date == '' or accepted_to_date == 'undefined-undefined-undefined':
        users_verified_to_a_date_title = ''
        ids_of_users_verified_to_a_date = default_users_ids
    else:
        users_verified_to_a_date_title = accepted_to_date
        ids_of_users_verified_to_a_date = SystemUser.objects.filter(account_verified_on_date_time__lte=accepted_to_date).values_list('id', flat=True)

    if users_verified_from_a_date_title == '' and users_verified_to_a_date_title == '':
        users_date_range_title = ''
    elif users_verified_from_a_date_title != '' and users_verified_to_a_date_title == '':
        users_date_range_title = '. Validated from '+users_verified_from_a_date_title
    elif users_verified_from_a_date_title == '' and users_verified_to_a_date_title != '':
        users_date_range_title = '. Validated before '+loans_granted_to_a_date_title
    elif users_verified_from_a_date_title != '' and users_verified_to_a_date_title != '':
        users_date_range_title = '. Validated from '+users_verified_from_a_date_title+' to '+users_verified_to_a_date_title
    else:
        users_date_range_title = ''

    # get users by custom search

    if custom_search is None or custom_search == '':
        users_with_search_term_title = ''
        ids_of_users_with_search_term = default_users_ids
    else:
        users_with_search_term_title = '. Search term: '+custom_search
        ids_of_users_with_search_term = SystemUser.objects.filter(Q(loan_code__icontains=custom_search)).values_list('id', flat=True)

    ids_of_the_users_to_return_list = list(set(ids_of_users_by_status) & set(ids_of_users_verified_from_a_date) & set(ids_of_users_verified_from_a_date)
                                              & set(ids_of_users_verified_to_a_date) & set(ids_of_users_with_search_term))

    title = 'List of '+users_by_status_title+' users '+clients_of_employee_title+''+users_date_range_title+''+users_with_search_term_title

    return ids_of_the_users_to_return_list, title



