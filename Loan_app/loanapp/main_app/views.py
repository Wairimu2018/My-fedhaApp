from django.core.mail import send_mail
from twilio.rest import Client, TwilioRestClient
from django.shortcuts import render, get_list_or_404, get_object_or_404, redirect
from django.conf import settings
from django.db.models import Count, Sum, Q, F
from django.contrib import messages
from django.http import Http404, HttpResponse, HttpResponseRedirect
# from django.core.urlresolvers import resolve, reverse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.urls import resolve, reverse
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from datetime import datetime, timedelta, time
from .models import (AccessLevel, Right, AccessLevelRight, SystemUser, LoginTokens, PasswordReset, CompanyDetails, 
    UserTransactions, SlidingAdverts, OurServices, OurProjects, Testimonial, News, OurPartners, Messagges, UserAccounts,
    Department, Position, DownloadableResource, BlogArticleCategory, BlogArticle, MobileAppVersion, OrganizationsCategories, 
    Country, Town, PersonOfficialDesignation, MaritalStatus, Gender, MemberOrganizations, Gallery, ServiceCategories,
    LoansRecord)
from .forms import (MemberOrganizationsForm, EditUserForm, UserRegistrationForm, ConfirmUserRegistrationForm,
    EditMemberOrganizationsForm, ApproveOrganizationMembershipForm, AddEmployeeForm)
from .serializers import UserTransactionsSerializer, UserAccountsSerializer, ProductsSerializer
from .functions import *
from .search_transaction import *
from .search_loan_requests import *
from .users_report import *

# sitemap

def sitemap_view(request):

    sitemap_context = {
        'sitemap': 'sitemap'
    }
    return render(request, 'main_app/sitemap.xml', sitemap_context)

# home

def home_view(request):

    system_configuration_data = configure_system()
    system_configuration_data = track_loan_defaulters()

    today = datetime.now().date()

    page_title = 'Home'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')
    
    sliding_adverts = SlidingAdverts.objects.all().order_by('-id')
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    company_details = CompanyDetails.objects.all()
    for company_data in company_details:
        loanApp__email = company_data.email
        loanApp__tel = company_data.tel1

    check_new_projects = OurProjects.objects.filter(deleted=False, realized=False).count()
    if check_new_projects == 3 or check_new_projects > 3:
        our_projects = OurProjects.objects.all().filter(deleted=False, realized=True)
    else:
        left_number = 3 - check_new_projects
        not_realized_projects = OurProjects.objects.all().filter(deleted=False, realized=False)
        realized_projects = OurProjects.objects.all().filter(deleted=False, realized=True)[:left_number]

        our_projects = not_realized_projects | realized_projects

    testimonials = Testimonial.objects.all().filter(active=True)
    news_list = News.objects.all().filter(deleted=False).order_by('-id')[:8]
    our_partners_list = OurPartners.objects.all().filter(active=True)
    our_team = SystemUser.objects.all().filter(active=True, is_employee=True)
    new_users = SystemUser.objects.all().filter(account_verified=False, registered_for_newsletters_only=False)

    new_user_full_name = request.POST.get('full_name', None)
    new_user_tel = request.POST.get('tel', None)
    new_user_email = request.POST.get('email', None)

    if new_user_full_name == None or new_user_full_name == '' or new_user_tel == None or new_user_tel == '' or new_user_email == None or new_user_email == '':
        pass
    else:
        check_new_user_membership = SystemUser.objects.filter(Q(email=new_user_email) | Q(tel1=new_user_tel)).count()
        if check_new_user_membership == 0:
            new_user_first_name = new_user_full_name.split(' ', 1)[:1]
            new_user_last_name = new_user_full_name.split(' ', 1)[1:]

            if new_user_last_name == []:
                messages.error(request, "Please enter your full name to proceed.")
            else:
                none_official_designation_instance = PersonOfficialDesignation.objects.get(slug='none')
                none_marital_status_instance = MaritalStatus.objects.get(slug='none')
                none_sex_instance = Gender.objects.get(slug='none')
                none_position_instance = Position.objects.get(slug='none')
                none_access_level_instance = AccessLevel.objects.get(slug='none')

                get_lattest_town_data = Town.objects.all().order_by('-id')[:1]
                for lattest_town_data in get_lattest_town_data:
                    lattest_town_slug = lattest_town_data.slug

                lattest_town_instance = Town.objects.get(slug=lattest_town_slug)

                SystemUser.objects.create(first_name=new_user_first_name[0], last_name=new_user_last_name[0], email=new_user_email, tel1=new_user_tel, 
                    sex=none_sex_instance, town=lattest_town_instance, next_of_kin_town=lattest_town_instance, access_level=none_access_level_instance, 
                    position_at_loanApp=none_position_instance, official_designation=none_official_designation_instance, marital_status=none_marital_status_instance)

                # text user

                # sms_sent, message_sid = send_twilio_sms(new_user_tel, "Dear "+new_user_full_name+",\n\n We have received your request to join loanApp . We will review your application and get back to you as soon as possible.\n\n Regards.")
             
                # text loanApp

                # sms_sent, message_sid = send_twilio_sms(loanApp__tel, "A new registration has just been sent. Please attend it as soon as possible.")

                to_loanApp_email = ['myfedha2019@gmail.com']
                send_mail('My-Fedha  Registration', 'Hello,\n\n My name is '+new_user_full_name+'. I would like to join My-Fedha . My phone number is '+new_user_tel+' and my email address is '+new_user_email+'\n\n Regards,', settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

                message_to_user = "Dear "+new_user_full_name+",\n\n welcome to My-Fedha  Limited where dreams are realized. We are glad that you chose to be part of us. We have a wide variety of products for you to enjoy. We have two types of accounts (withdrawable and savings/fixed deposit). The withdrawable account enables you to deposit and withdraw cash via Mpesa and Credid/debitcards; buy Safaricom, Airtel and Orange airtime, transfer to other members and transfer to your savings among many other functions. The savings account enables you to access a loan that is upto a maximum of three times your savings. The loan can be secured by your savings, guarantors who are members of the  and whose savings add up to the loan amount or securities such as car log book or land title deed. All transactions come with accurate reports for accounting purposed. You can access your account either using the Android application on Google Play Store or via www.my-fedha.co.ke.\n You are required to keep your account secure by using strong passwords that cannot be easily guessed and by changing your passwords regularly.\n Please note that you are not supposed to share your account information with anyone. Our staff will not ask for your account Passwords. Our system is highly secured guaranteeing you safety of your money. Also to ensure that you are making payment to your account, every Mpesa transaction send to your phone for confirmation comes with your name and loanApp  Global as the recipient. Do not respond to any requests without your name. \n For inquiries, please get in touch with us on "+loanApp__tel+" or info@my-fedha.co.ke.\n\n Thank you for choosing My-Fedha .\n\n Regards,\n\n\n My-Fedha  Team"
                
                to_user_email = [new_user_email]
                send_mail('My-Fedha  Registration', message_to_user, settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)
                
                messages.success(request, "Request sent!")
        else:
            messages.success(request, "You are already registered!")

        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

    newsletter_email = request.POST.get('newsletterEmail', None)

    if newsletter_email == None or newsletter_email == '':
        pass
    else:
        check_new_newsletter_user = SystemUser.objects.filter(email=newsletter_email).count()
        if check_new_newsletter_user != 0:
            SystemUser.objects.filter(email=newsletter_email).update(registered_for_newsletter=True)
            messages.success(request, "You are successfully registered for our newsletter!")
        else:
            none_official_designation_instance = PersonOfficialDesignation.objects.get(slug='none')
            none_marital_status_instance = MaritalStatus.objects.get(slug='none')
            none_sex_instance = Gender.objects.get(slug='none')
            none_position_instance = Position.objects.get(slug='none')
            none_access_level_instance = AccessLevel.objects.get(slug='none')

            get_lattest_town_data = Town.objects.all().order_by('-id')[:1]
            for lattest_town_data in get_lattest_town_data:
                lattest_town_slug = lattest_town_data.slug

            lattest_town_instance = Town.objects.get(slug=lattest_town_slug)

            SystemUser.objects.create(first_name='Newsletter user', sex=none_sex_instance, last_name='Newsletter user', email=newsletter_email, 
                registered_for_newsletter=True, registered_for_newsletters_only=True, town=lattest_town_instance, next_of_kin_town=lattest_town_instance, 
                access_level=none_access_level_instance, position_at_loanApp=none_position_instance, 
                official_designation=none_official_designation_instance, marital_status=none_marital_status_instance)

            messages.success(request, "You are successfully registered for our newsletter!")

        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

    ids_of_the_pending_loan_requests_transactions_list = list_transactions('', 'pending', 'borrow', 'employee', '', '', '')
    pending_loan_requests = UserTransactions.objects.all().filter(id__in=ids_of_the_pending_loan_requests_transactions_list, rejected=False)

    ids_of_the_pending_loan_refunds_transactions_list = list_transactions('', 'pending', 'refund', 'employee', '', '', '')
    pending_loan_refunds_requests = UserTransactions.objects.all().filter(id__in=ids_of_the_pending_loan_refunds_transactions_list, rejected=False)

    loan_transaction_slug = request.GET.get('loan_transaction_slug', None)
    requested_transaction_type = request.GET.get('requested_transaction_type', None)
    loan_payment_transfer_confirmation = request.GET.get('loan_payment_transfer', None)
    
    if loan_payment_transfer_confirmation == 'true':     

        if user_logged == 'true' and user_is_admin == True:
            check_transaction = UserTransactions.objects.filter(slug=loan_transaction_slug, rejected=False, verified=False).count()
            if check_transaction == 0:
                messages.error(request, "Sorry, we couldn't find the transaction!")
                return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
            else:
                logged_user_instance = SystemUser.objects.get(slug=logged_user_slug)

                get_company_data = CompanyDetails.objects.all()
                for company_data in get_company_data:
                    loanApp__tel = company_data.tel1
                    company_email = company_data.email
                    number_of_days_to_refund_loan = company_data.number_of_days_to_refund_loan
                    number_of_loan_payment_installments = company_data.number_of_loan_payment_installments

                get_the_transaction_details = UserTransactions.objects.all().filter(slug=loan_transaction_slug)
                for transaction_data in get_the_transaction_details:
                    the_transaction_type = transaction_data.transaction_type
                    transaction_code = transaction_data.transaction_code
                    the_transaction_amount = transaction_data.transacted_amount
                    client_slug = transaction_data.user.slug
                    user_email = transaction_data.user.email
                    user_tel = transaction_data.user.tel1
                    current_loan_amount = transaction_data.user.current_loan_amount
                    current_amount_in_account = transaction_data.user.current_amount_in_account
                    loan_amount_given_to_client = transaction_data.user.loan_amount_given_to_client
                    loan_interest = transaction_data.user.loan_interest

                    if transaction_data.loan_record != None:
                        loan_transaction_record_slug = transaction_data.loan_record.slug
                    else:
                        loan_transaction_record_slug = ''

                if requested_transaction_type == 'reject':
                    if loan_transaction_record_slug != '':
                        logged_user_instance = SystemUser.objects.get(slug=user_slug)
                        LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_request_rejected=True, loan_request_rejected_on_date_time=today, loan_request_rejected_by=logged_user_instance)

                    UserTransactions.objects.filter(slug=loan_transaction_slug, rejected=False, verified=False).update(notify_user=True, notify_loan_admin=False, rejected=True)
                        
                    # text user

                    # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' being payment of your loanApp loan has been confirmed.\nThank you for trusting loanApp .')
                     
                    # text loanApp

                    # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.')
                        
                    to_user_email = [user_email]
                    send_mail('My-Fedha  loan request cancellation', 'Your loan request with the transaction code '+transaction_code+' has been rejected! Contact our customer care for more information.\nThank you for trusting My-Fedha .',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                    to_company_email = ['myfedha2019@gmail.com']
                    send_mail('My-Fedha  loan request cancellation', 'The loan request with the transaction code '+transaction_code+' has been rejected!',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    messages.success(request, "Loan request rejected!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

                else:
                    UserTransactions.objects.filter(slug=loan_transaction_slug, rejected=False, verified=False).update(verified=True, transaction_verified_on=today, transaction_verified_by=logged_user_instance, notify_user=True, notify_loan_admin=False)

                    if the_transaction_type == 'deposit':
                        new_amount_in_account = current_amount_in_account + the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' has been confirmed.\nThank you for trusting loanApp .')
                         
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+'.')

                        to_user_email = [user_email]
                        send_mail('My-Fedha  deposit confirmation', 'Your deposit with the transaction code '+transaction_code+' has been confirmed.\nThank you for trusting My-Fedha .',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha  deposit confirmation', 'You have confirmed the deposit with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'withdrawal':
                        new_amount_in_account = current_amount_in_account - the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                         
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.')

                        to_user_email = [user_email]
                        send_mail('My-Fedha withdrawal confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha withdrawal confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'borrow':

                        loan_due_date = today + timedelta(days=number_of_days_to_refund_loan)

                        next_payment_timedelta = number_of_days_to_refund_loan/number_of_loan_payment_installments

                        loan_next_refund_due_date = today + timedelta(days=int(number_of_loan_payment_installments))

                        if loan_transaction_record_slug != '':
                            logged_user_instance = SystemUser.objects.get(slug=user_slug)
                            LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_granted=True, granted_on_date_time=today, granted_by=logged_user_instance, loan_due_date=loan_due_date)

                        new_loan_amount = current_loan_amount + the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount, loan_amount_given_to_client=loan_amount_given_to_client, loan_interest=loan_interest, loan_next_refund_due_date=loan_next_refund_due_date, loan_due_date=loan_due_date)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.')


                        to_user_email = [user_email]
                        send_mail('My-Fedha loan confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting My-Fedha .',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha loan confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'refund':

                        new_loan_amount = current_loan_amount - the_transaction_amount

                        if new_loan_amount < 0:
                            new_amount_in_account = current_amount_in_account - new_loan_amount
                            SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                            new_loan_amount = 0

                        if loan_transaction_record_slug != '':
                            get_loan_details = LoansRecord.objects.all().filter(slug=loan_transaction_record_slug)
                            for loan_data in get_loan_details:
                                loan_amount_taken = loan_data.amount_taken
                                loan_cumulative_interest = loan_data.cumulative_interest

                            total_to_pay = loan_amount_taken+loan_cumulative_interest
                            current_amount_refunded = total_to_pay-new_loan_amount
                            
                            LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(amount_remained_to_refund=new_loan_amount, current_amount_refunded=current_amount_refunded)

                            logged_user_instance = SystemUser.objects.get(slug=user_slug)
                            if new_loan_amount < 0 or new_loan_amount == 0:
                                LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_refunded=True, refund_completed_on_date_time=today, refund_verified_by=logged_user_instance)


                        SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' being payment of your loanApp loan has been confirmed.\nThank you for trusting loanApp .')
                         
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.')
                            
                        to_user_email = [user_email]
                        send_mail('My-Fedha loan refund confirmation', 'Your deposit with the transaction code '+transaction_code+' being payment of your My-Fedha loan has been confirmed.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha loan refund confirmation', 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    else:
                        UserTransactions.objects.filter(slug=loan_transaction_slug, rejected=False, verified=False).update(verified=False, notify_user=True, notify_loan_admin=True)

                    messages.success(request, "Transaction verified!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

    home_context = {
        'system_configuration_data': system_configuration_data,
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'SlidingAdverts': sliding_adverts,
        'companyDetails': company_details,
        'ourOffers': our_services,
        'ourProjects': our_projects,
        'testimonials': testimonials,
        'newsList': news_list,
        'ourTeam': our_team,
        'newUsers': new_users,
        'partnersList': our_partners_list,
        'pendingLoanRequests': pending_loan_requests,
        'pendingLoanRefundsRequests': pending_loan_refunds_requests
    }
    return render(request, 'main_app/home.html', home_context)


# loans report

def loans_report_view(request):

    system_configuration_data = configure_system()

    today = datetime.now().date()

    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')    

    transaction_from_date = request.GET.get('transaction_from_date', None)
    transaction_to_date = request.GET.get('transaction_to_date', None)
    custom_search = request.GET.get('custom_search', None)
    transaction_status = request.GET.get('transaction_status', None)
    requested_by_client_slug = request.GET.get('requested_by_client_slug', None)

    # format from date

    if transaction_from_date == None or transaction_from_date == '':
        pass
    else:
        report_from_day = transaction_from_date[3:][:2]
        report_from_month = transaction_from_date[:2]
        report_from_year = transaction_from_date[-4:]

        transaction_from_date = report_from_year+'-'+report_from_month+'-'+report_from_day

    # format to date

    if transaction_to_date == None or transaction_to_date == '':
        pass
    else:
        report_to_day = transaction_to_date[3:][:2]
        report_to_month = transaction_to_date[:2]
        report_to_year = transaction_to_date[-4:]

        transaction_to_date = report_to_year+'-'+report_to_month+'-'+report_to_day

    company_details = CompanyDetails.objects.all()
    clients_list = SystemUser.objects.all()

    ids_of_returned_loans_list, report_title = list_loan_requests(transaction_status, requested_by_client_slug, transaction_from_date, transaction_to_date, custom_search)
    
    get_loans_list = LoansRecord.objects.all().filter(id__in=ids_of_returned_loans_list, loan_granted=True)

    amount_of_loans_given = LoansRecord.objects.filter(id__in=ids_of_returned_loans_list, loan_granted=True).aggregate(Sum('amount_taken')).get('amount_taken__sum', 0.00)
    if amount_of_loans_given == None:
        amount_of_loans_given = 0

    amount_loan_remained_to_refund = LoansRecord.objects.filter(id__in=ids_of_returned_loans_list, loan_granted=True).aggregate(Sum('amount_remained_to_refund')).get('amount_remained_to_refund__sum', 0.00)
    if amount_loan_remained_to_refund == None:
        amount_loan_remained_to_refund = 0

    amount_of_paid_loans = amount_of_loans_given - amount_loan_remained_to_refund

    total_loan_interest = LoansRecord.objects.filter(id__in=ids_of_returned_loans_list, loan_granted=True).aggregate(Sum('total_interest')).get('total_interest__sum', 0.00)
    if total_loan_interest == None:
        total_loan_interest = 0

    paginator = Paginator(get_loans_list, 15)
    page = request.GET.get('page')
    try:
        loans_list = paginator.page(page)
    except PageNotAnInteger:
        loans_list = paginator.page(1)
    except EmptyPage:
        loans_list = paginator.page(paginator.num_pages)

    loans_report_context = {
        'reportTitle': report_title,
        'amountOfLoansGiven': amount_of_loans_given,
        'amountOfPaidLoans': amount_of_paid_loans,
        'amountLoanRemainedToRefund': amount_loan_remained_to_refund,
        'totalLoanInterest': total_loan_interest,
        'system_configuration_data': system_configuration_data,
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'companyDetails': company_details,
        'clientsList': clients_list,
        'loansList': loans_list
    }
    return render(request, 'main_app/loans_report.html', loans_report_context)


# users report

def users_report_view(request):

    system_configuration_data = configure_system()

    today = datetime.now().date()

    page_title = 'Users Report'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')    

    accepted_from_date = request.GET.get('accepted_from_date', None)
    accepted_to_date = request.GET.get('accepted_to_date', None)
    custom_search = request.GET.get('custom_search', None)
    user_status = request.GET.get('user_status', None)
    accepted_by_client_slug = request.GET.get('accepted_by_client_slug', None)

    # accepted from date

    if accepted_from_date == None or accepted_from_date == '':
        pass
    else:
        accepted_from_day = accepted_from_date[3:][:2]
        accepted_from_month = accepted_from_date[:2]
        accepted_from_year = accepted_from_date[-4:]

        accepted_from_date = accepted_from_year+'-'+accepted_from_month+'-'+accepted_from_day

    # accepted to date

    if accepted_to_date == None or accepted_to_date == '':
        pass
    else:
        accepted_to_day = accepted_to_date[3:][:2]
        accepted_to_month = accepted_to_date[:2]
        accepted_to_year = accepted_to_date[-4:]

        accepted_to_date = accepted_to_year+'-'+accepted_to_month+'-'+accepted_to_day

    company_details = CompanyDetails.objects.all()
    employees_list = SystemUser.objects.all().filter(is_employee=True)

    ids_of_returned_users_list, report_title = list_users(user_status, accepted_by_client_slug, accepted_from_date, accepted_to_date, custom_search)
    
    get_users_list = SystemUser.objects.all().filter(id__in=ids_of_returned_users_list)
    number_of_returned_users = SystemUser.objects.filter(id__in=ids_of_returned_users_list).count()
    number_of_all_users = SystemUser.objects.all().count()

    paginator = Paginator(get_users_list, 15)
    page = request.GET.get('page')
    try:
        users_list = paginator.page(page)
    except PageNotAnInteger:
        users_list = paginator.page(1)
    except EmptyPage:
        users_list = paginator.page(paginator.num_pages)

    users_report_context = {
        'reportTitle': report_title,
        'system_configuration_data': system_configuration_data,
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'companyDetails': company_details,
        'numberOfAllUsers': number_of_all_users,
        'numberOfReturnedUsers': number_of_returned_users,
        'employeesList': employees_list,
        'usersList': users_list
    }
    return render(request, 'main_app/users_report.html', users_report_context)


# authentication view

def authentication_view(request):

    user_email = request.session.get('user_email')
    if user_email != None:
        return HttpResponseRedirect(reverse('mainAppNamespace:AuthenticationName'))
    else:
        page_title = 'Authentication'
        page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
        page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

        user_logged = request.session.get('user_logged')
        user_firebase_id = request.session.get('user_firebase_id')
        user_slug = request.session.get('user_slug')
        user_email = request.session.get('user_email')
        user_profile_image_url = request.session.get('user_profile_image_url')
        user_account_verified = request.session.get('user_account_verified')
        user_first_name = request.session.get('user_first_name')
        user_middle_name = request.session.get('user_middle_name')
        user_last_name = request.session.get('user_last_name')
        user_is_admin = request.session.get('user_is_admin')
        user_is_employee = request.session.get('user_is_employee')

        membership_application_form = DownloadableResource.objects.all().filter(title='Membership application form')
        pre_membership_application_form = DownloadableResource.objects.all().filter(title='Pre-membership application form')

        action = request.GET.get('action')
        action_type = request.GET.get('type')

        our_services = OurServices.objects.all().filter(active=True).order_by('order')

        if action == 'requesting-membership':
            hide_login = True
        else:
            hide_login = False

        if action_type == 'pre-registration':
            show_pre_registration = True
            show_registration = False
        elif action_type == 'registration':
            show_registration = True
            show_pre_registration = False
        else:
            hide_login = None
            show_registration = None
            show_pre_registration = None

        company_details = CompanyDetails.objects.all()
        for company_data in company_details:
            loanApp__email = company_data.email

        # user login

        email_address = request.POST.get('username', None)
        raw_password = request.POST.get('password', None)

        if email_address == None or email_address == '' or raw_password == None or raw_password == '':
            pass
        else:
            hashed_password = hash_password_function(raw_password)
            check_user = SystemUser.objects.filter(email=email_address, password=hashed_password).count()
            if check_user == 0:
                messages.error(request, "Login error! Please check your email and password and try again!")
            else:
                get_user_data = SystemUser.objects.all().filter(email=email_address, password=hashed_password)
                for user_data in get_user_data:                    
                    request.session['user_logged'] = 'true'
                    request.session['user_firebase_id'] = user_data.firebase_id
                    request.session['user_slug'] = user_data.slug
                    request.session['user_email'] = user_data.email
                    request.session['user_profile_image_url'] = user_data.profile_image_url
                    request.session['user_account_verified'] = user_data.account_verified
                    request.session['user_first_name'] = user_data.first_name
                    request.session['user_middle_name'] = user_data.middle_name
                    request.session['user_last_name'] = user_data.last_name
                    request.session['user_is_admin'] = user_data.is_admin
                    request.session['user_is_employee'] = user_data.is_employee

                messages.success(request, "Login successful! Welcome to My-Fedha!")

            return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

        # user registration

        first_name = request.POST.get('firstName', None)
        last_name = request.POST.get('lastName', None)
        id_number = request.POST.get('idNumber', None)
        telephone = request.POST.get('telephone', None)
        create_user_email = request.POST.get('createUserEmail', None)
        create_user_password = request.POST.get('createUserPassword', None)
        password_confirmation = request.POST.get('passwordConfirmation', None)

        get_company_data = CompanyDetails.objects.all()
        for company_data in get_company_data:
            loanApp__tel = company_data.tel1
            minimum_loan_limit = company_data.minimum_loan_limit

        if first_name == None or first_name == '' or last_name == None or last_name == '' or id_number == None or id_number == '' or telephone == None or telephone == '' or create_user_email == None or create_user_email == '' or create_user_password == None or create_user_password == '' or password_confirmation == None or password_confirmation == '':
            pass
        else:
            if create_user_password != password_confirmation:
                messages.error(request, "The two passwords don't match. Please check your password and try again!")
            else:
                check_user_account = SystemUser.objects.filter(Q(email=create_user_email) | Q(tel1=telephone) | Q(tel2=telephone)).count()
                if check_user_account != 0:
                    messages.success(request, "You seem already registered. Please login to proceed!")
                else:
                    hashed_create_user_password = hash_password_function(create_user_password)

                    

                    SystemUser.objects.create(id_number=id_number, first_name=first_name, last_name=last_name, email=create_user_email, tel1=telephone, password=hashed_create_user_password, loan_limit=minimum_loan_limit)

                    # get new user data

                    get_user_data = SystemUser.objects.all().filter(email=create_user_email)
                    for user_data in get_user_data:
                        user_slug = user_data.slug
                        verified = user_data.account_verified
                        middle_name = user_data.middle_name
                        profile_image_url = user_data.profile_image_url

                    # text user

                    # sms_sent, message_sid = send_twilio_sms(telephone, 'Dear '+first_name+' '+last_name+',\n\n We have received your request to join loanApp . We will review your application and get back to you as soon as possible.\n\n Regards,')
             
                    # text loanApp

                    # sms_sent, message_sid = send_twilio_sms(loanApp__tel, "Hello,\n\n My name is "+first_name+" "+last_name+". I would like to join loanApp . My email address is "+create_user_email+" and my phone number is "+telephone+"\n\nRegards,")

                    to_loanApp_email = ['myfedha2019@gmail.com']
                    send_mail('My-Fedha Registration', 'Hello,\n\n My name is '+first_name+' '+last_name+'. I would like to join My-Fedha . My email address is '+create_user_email+' and my phone number is '+telephone+'\n\nRegards,',
                              settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

                    message_to_user = "Dear "+first_name+" "+last_name+",\n\n welcome to My-Fedha  Limited where dreams are realized. We are glad that you chose to be part of us. We have a wide variety of products for you to enjoy. We have two types of accounts (withdrawable and savings/fixed deposit). The withdrawable account enables you to deposit and withdraw cash via Mpesa and Credid/debitcards; buy Safaricom, Airtel and Orange airtime, transfer to other members and transfer to your savings among many other functions. The savings account enables you to access a loan that is upto a maximum of three times your savings. The loan can be secured by your savings, guarantors who are members of the  and whose savings add up to the loan amount or securities such as car log book or land title deed. All transactions come with accurate reports for accounting purposed. You can access your account either using the Android application on Google Play Store or via www.my-fedha.co.ke.\n You are required to keep your account secure by using strong passwords that cannot be easily guessed and by changing your passwords regularly.\n Please note that you are not supposed to share your account information with anyone. Our staff will not ask for your account Passwords. Our system is highly secured guaranteeing you safety of your money. Also to ensure that you are making payment to your account, every Mpesa transaction send to your phone for confirmation comes with your name and My-Fedha  Global as the recipient. Do not respond to any requests without your name. \n For inquiries, please get in touch with us on "+loanApp__tel+" or info@my-fedha.co.ke.\n\n Thank you for choosing My-Fedha .\n\n Regards,\n\n\n My-Fedha  Team"
                
                    to_user_email = [create_user_email]
                    send_mail('My-Fedha Registration', message_to_user,
                              settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)


                    messages.success(request, "Account successfully created! Please login to proceed!")
            
            return HttpResponseRedirect(reverse('mainAppNamespace:AuthenticationName'))


        # pre registration

        form = MemberOrganizationsForm(request.POST or None, request.FILES or None)

        # organization copy of registration certificate

        form.fields['organization_copy_of_registration_certificate'].label = "Organization copy of registration certificate"
        form.fields['organization_copy_of_registration_certificate'].widget.attrs['class'] = 'form-control margin-bottom'
        form.fields['organization_copy_of_registration_certificate'].widget.attrs['id'] = 'organization_copy_of_registration_certificate'
        form.fields['organization_copy_of_registration_certificate'].widget.attrs['required'] = 'required'

        # Organization brochure

        form.fields['organization_brochure'].label = "Organization brochure"
        form.fields['organization_brochure'].widget.attrs['class'] = 'form-control margin-bottom'
        form.fields['organization_brochure'].widget.attrs['id'] = 'organization_brochure'
        form.fields['organization_brochure'].widget.attrs['required'] = 'required'

        # select organization category

        form.fields['organization_category'].queryset = OrganizationsCategories.objects.filter(active=True)
        form.fields['organization_category'].label = "Please Select This Code "
        form.fields['organization_category'].widget.attrs['required'] = 'required'
        form.fields['organization_category'].widget.attrs['class'] = 'form-control wpcf7-select'

        # organization logo

        form.fields['organization_logo'].label = "Organization logo"
        form.fields['organization_logo'].widget.attrs['class'] = 'form-control margin-bottom'
        form.fields['organization_logo'].widget.attrs['id'] = 'organization_logo'
        form.fields['organization_logo'].widget.attrs['required'] = 'required'

        if form.is_valid():
            organization_email = request.POST.get('organization_email')
            organization_tel = request.POST.get('organization_telephone')
            name_of_organization = request.POST.get('name_of_organization')

            save_pre_membership = form.save(commit=False)
            save_pre_membership.save()

            # text user

            # sms_sent, message_sid = send_twilio_sms(organization_tel, 'loanApp  pre-membership Registration', 'We have received your pre-membership registration. Your application will be reviewed by our comitee. We will get back to you when it is done!\n\n Regards,')
             
            # text loanApp

            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A pre-membership registration has been filled by '+name_of_organization+'. Please attend the request as soon as possible.')


            to_organization_email = [organization_email]
            send_mail('My-Fedha pre-membership Registration', 'We have received your pre-membership registration. Your application will be reviewed by our comitee. We will get back to you when it is done!\n\n Regards,', settings.EMAIL_HOST_USER, to_organization_email, fail_silently=True)

            to_loanApp_email = ['myfedha2019@gmail.com']
            send_mail('My-Fedha pre-membership Registration', 'A pre-membership registration has been filled by '+name_of_organization+'. Please attend the request as soon as possible.', settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

            messages.success(request, "Pre-membership registration successfully sent!")
            
            return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))


        # user registration

        user_form = UserRegistrationForm(request.POST or None, request.FILES or None)

        # select official designation

        user_form.fields['official_designation'].queryset = PersonOfficialDesignation.objects.all()
        user_form.fields['official_designation'].label = "Please select your designation "
        user_form.fields['official_designation'].widget.attrs['required'] = 'required'
        user_form.fields['official_designation'].widget.attrs['class'] = 'form-control wpcf7-select'

        # select your gender

        user_form.fields['sex'].queryset = Gender.objects.all()
        user_form.fields['sex'].label = "Please select your gender "
        user_form.fields['sex'].widget.attrs['required'] = 'required'
        user_form.fields['sex'].widget.attrs['class'] = 'form-control wpcf7-select'

        # select marital status

        user_form.fields['marital_status'].queryset = MaritalStatus.objects.all()
        user_form.fields['marital_status'].label = "Please select marital status "
        user_form.fields['marital_status'].widget.attrs['required'] = 'required'
        user_form.fields['marital_status'].widget.attrs['class'] = 'form-control wpcf7-select'

        # select your town

        user_form.fields['town'].queryset = Town.objects.all()
        user_form.fields['town'].label = "Please select your town "
        user_form.fields['town'].widget.attrs['required'] = 'required'
        user_form.fields['town'].widget.attrs['class'] = 'form-control wpcf7-select'

        # select your next of kin town

        user_form.fields['next_of_kin_town'].queryset = Town.objects.all()
        user_form.fields['next_of_kin_town'].label = "Please select your next of kin town "
        user_form.fields['next_of_kin_town'].widget.attrs['required'] = 'required'
        user_form.fields['next_of_kin_town'].widget.attrs['class'] = 'form-control wpcf7-select'

        if user_form.is_valid():
            user_requesting_registration_email = request.POST.get('email')
            user_requesting_registration_first_name = request.POST.get('first_name')
            user_requesting_registration_last_name = request.POST.get('last_name')
            user_requesting_registration_tel = request.POST.get('tel1')

            save_membership = user_form.save(commit=False)
            save_membership.save()

            # text user

            # sms_sent, message_sid = send_twilio_sms(user_requesting_registration_tel, 'Dear '+user_requesting_registration_first_name+' '+user_requesting_registration_last_name+',\n\n We have received your request to join loanApp . We will review your application and get back to you as soon as possible.\n\n Regards,')
             
            # text loanApp

            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'Hello,\n\n My name is '+user_requesting_registration_first_name+' '+user_requesting_registration_last_name+'. I would like to join loanApp . My phone number is '+user_requesting_registration_tel+' and my email address is '+user_requesting_registration_email+'\n\nRegards,')

            message_to_user = "Dear "+user_requesting_registration_first_name+" "+user_requesting_registration_last_name+",\n\n welcome to My-Fedha  Limited where dreams are realized. We are glad that you chose to be part of us. We have a wide variety of products for you to enjoy. We have two types of accounts (withdrawable and savings/fixed deposit). The withdrawable account enables you to deposit and withdraw cash via Mpesa and Credid/debitcards; buy Safaricom, Airtel and Orange airtime, transfer to other members and transfer to your savings among many other functions. The savings account enables you to access a loan that is upto a maximum of three times your savings. The loan can be secured by your savings, guarantors who are members of the  and whose savings add up to the loan amount or securities such as car log book or land title deed. All transactions come with accurate reports for accounting purposed. You can access your account either using the Android application on Google Play Store or via www.my-fedha.co.ke.\n You are required to keep your account secure by using strong passwords that cannot be easily guessed and by changing your passwords regularly.\n Please note that you are not supposed to share your account information with anyone. Our staff will not ask for your account Passwords. Our system is highly secured guaranteeing you safety of your money. Also to ensure that you are making payment to your account, every Mpesa transaction send to your phone for confirmation comes with your name and My-Fedha  Global as the recipient. Do not respond to any requests without your name. \n For inquiries, please get in touch with us on "+loanApp__tel+" or info@my-fedha.co.ke.\n\n Thank you for choosing My-Fedha .\n\n Regards,\n\n\n My-Fedha  Team"
            
            to_user_requesting_registration_email = [user_requesting_registration_email]
            send_mail('My-Fedha  membership registration', message_to_user, settings.EMAIL_HOST_USER, to_user_requesting_registration_email, fail_silently=True)

            to_loanApp_email = ['myfedha2019@gmail.com']
            send_mail('My-Fedha  membership registration', 'Hello,\n\n My name is '+user_requesting_registration_first_name+' '+user_requesting_registration_last_name+'. I would like to join My-Fedha . My phone number is '+user_requesting_registration_tel+' and my email address is '+user_requesting_registration_email+'\n\nRegards,', settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

            messages.success(request, "Membership registration successfully sent!")
            
            return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

        authentication_context = {
            'pageTitle': page_title,
            'userLogged': user_logged,
            'userFirebaseId': user_firebase_id,
            'userSlug': user_slug,
            'userEmail': user_email,
            'userProfileImageUrl': user_profile_image_url,
            'userAccountVerified': user_account_verified,
            'userFirstName': user_first_name,
            'userMiddleName': user_middle_name,
            'userLastName': user_last_name,
            'userIsAdmin': user_is_admin,
            'userIsEmployee': user_is_employee,
            'companyDetails': company_details,
            'pageDescription': page_description,
            'pageKeywords': page_keywords,
            'hideLogin': hide_login,
            'showRegistration': show_registration,
            'showPreRegistration': show_pre_registration,
            'membershipApplicationForm': membership_application_form,
            'preMembershipApplicationForm': pre_membership_application_form,
            'form': form,
            'ourOffers': our_services,
            'userForm': user_form
        }
        return render(request, 'main_app/authentication.html', authentication_context)


# login view

def login_view(request):

    user_logged = request.session.get('user_logged')
    if user_logged == 'true':
        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
    else:
        page_title = 'Login'
        page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
        page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

        user_logged = request.session.get('user_logged')
        user_firebase_id = request.session.get('user_firebase_id')
        user_slug = request.session.get('user_slug')
        user_email = request.session.get('user_email')
        user_profile_image_url = request.session.get('user_profile_image_url')
        user_account_verified = request.session.get('user_account_verified')
        user_first_name = request.session.get('user_first_name')
        user_middle_name = request.session.get('user_middle_name')
        user_last_name = request.session.get('user_last_name')
        user_is_admin = request.session.get('user_is_admin')
        user_is_employee = request.session.get('user_is_employee')

        company_details = CompanyDetails.objects.all()
        for company_data in company_details:
            loanApp__email = company_data.email

        # user login

        email_address = request.POST.get('username', None)
        raw_password = request.POST.get('password', None)

        if email_address == None or email_address == '' or raw_password == None or raw_password == '':
            pass
        else:
            hashed_password = hash_password_function(raw_password)
            check_user = SystemUser.objects.filter(email=email_address, password=hashed_password).count()
            if check_user == 0:
                messages.error(request, "Login error! Please check your email and password and try again!")
            else:
                get_user_data = SystemUser.objects.all().filter(email=email_address, password=hashed_password)
                for user_data in get_user_data:                    
                    request.session['user_logged'] = 'true'
                    request.session['user_firebase_id'] = user_data.firebase_id
                    request.session['user_slug'] = user_data.slug
                    request.session['user_email'] = user_data.email
                    request.session['user_profile_image_url'] = user_data.profile_image_url
                    request.session['user_account_verified'] = user_data.account_verified
                    request.session['user_first_name'] = user_data.first_name
                    request.session['user_middle_name'] = user_data.middle_name
                    request.session['user_last_name'] = user_data.last_name
                    request.session['user_is_admin'] = user_data.is_admin
                    request.session['user_is_employee'] = user_data.is_employee

                messages.success(request, "Login successful! Welcome to My-Fedha!")

            return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

        login_context = {
            'pageTitle': page_title,
            'userLogged': user_logged,
            'userFirebaseId': user_firebase_id,
            'userSlug': user_slug,
            'userEmail': user_email,
            'userProfileImageUrl': user_profile_image_url,
            'userAccountVerified': user_account_verified,
            'userFirstName': user_first_name,
            'userMiddleName': user_middle_name,
            'userLastName': user_last_name,
            'userIsAdmin': user_is_admin,
            'userIsEmployee': user_is_employee,
            'companyDetails': company_details,
            'pageDescription': page_description,
            'pageKeywords': page_keywords
        }
        return render(request, 'main_app/login.html', login_context)


# user profile view

def user_profile_view(request, user_slug):

    today = datetime.now().date()

    page_title = 'Company Overview'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    logged_user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    if logged_user_slug == user_slug:        
        can_change_password = True
        can_edit_user_details = True
    else:
        can_change_password = False
        if user_is_admin == True or user_is_admin == 'True' or user_is_admin == 'true':
            can_edit_user_details = True
        elif user_is_employee == True or user_is_employee == 'True' or user_is_employee == 'true':
            can_edit_user_details = True
        else:
            can_edit_user_details = False    

    the_user_data = get_list_or_404(SystemUser, slug=user_slug, deleted=False)
    instance = get_object_or_404(SystemUser, slug=user_slug, deleted=False)

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    all_user_transactions = UserTransactions.objects.all().filter(user=instance)

    user_current_loan = LoansRecord.objects.all().filter(user=instance, loan_granted=True, loan_refunded=False, loan_request_rejected=False)

    check_user_current_loan = LoansRecord.objects.filter(user=instance, loan_granted=True, loan_refunded=False, loan_request_rejected=False).count()
    if check_user_current_loan == 0:
        total_amount_to_pay = 0
        user_current_loan_transactions = UserTransactions.objects.all()[:0]
    else:
        for user_current_loan_data in user_current_loan:
            user_current_loan_slug = user_current_loan_data.slug
            user_current_loan_amount = user_current_loan_data.amount_taken
            user_current_loan_total_interest = user_current_loan_data.total_interest

        total_amount_to_pay = user_current_loan_amount+user_current_loan_total_interest

        user_current_loan_instance = LoansRecord.objects.get(slug=user_current_loan_slug)
        user_current_loan_transactions = UserTransactions.objects.all().filter(loan_record=user_current_loan_instance)

    form = EditUserForm(request.POST or None, request.FILES or None, instance=instance)

    # organization copy of registration certificate

    # form.fields['physical_membership_registration_form'].label = "Please upload physicaly filled membership registration form"
    # form.fields['physical_membership_registration_form'].widget.attrs['class'] = 'form-control margin-bottom'
    # form.fields['physical_membership_registration_form'].widget.attrs['id'] = 'physical_membership_registration_form'
    # form.fields['physical_membership_registration_form'].widget.attrs['required'] = 'required'

    # select official designation

    form.fields['official_designation'].queryset = PersonOfficialDesignation.objects.all()
    form.fields['official_designation'].label = "Please select your designation "
    form.fields['official_designation'].widget.attrs['required'] = 'required'
    form.fields['official_designation'].widget.attrs['class'] = 'form-control wpcf7-select'

    # select your gender

    form.fields['sex'].queryset = Gender.objects.all()
    form.fields['sex'].label = "Please select your gender "
    form.fields['sex'].widget.attrs['required'] = 'required'
    form.fields['sex'].widget.attrs['class'] = 'form-control wpcf7-select'

    # select marital status

    form.fields['marital_status'].queryset = MaritalStatus.objects.all()
    form.fields['marital_status'].label = "Please select marital status "
    form.fields['marital_status'].widget.attrs['required'] = 'required'
    form.fields['marital_status'].widget.attrs['class'] = 'form-control wpcf7-select'

    # select your town

    form.fields['town'].queryset = Town.objects.all()
    form.fields['town'].label = "Please select your town "
    form.fields['town'].widget.attrs['required'] = 'required'
    form.fields['town'].widget.attrs['class'] = 'form-control wpcf7-select'

    # select your next of kin town

    form.fields['next_of_kin_town'].queryset = Town.objects.all()
    form.fields['next_of_kin_town'].label = "Please select your next of kin town "
    form.fields['next_of_kin_town'].widget.attrs['required'] = 'required'
    form.fields['next_of_kin_town'].widget.attrs['class'] = 'form-control wpcf7-select'

    if form.is_valid():
        if logged_user_slug == user_slug or can_edit_user_details == True:
            updateUser = form.save(commit=False)
            updateUser.save()

            messages.success(request, "Account updated!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))


    # add employee form
    
    add_employee_form = AddEmployeeForm(request.POST or None, request.FILES or None, instance=instance)

    # select employee position

    add_employee_form.fields['position_at_loanApp'].queryset = Position.objects.all()
    add_employee_form.fields['position_at_loanApp'].label = "Employee position"
    add_employee_form.fields['position_at_loanApp'].widget.attrs['required'] = 'required'
    add_employee_form.fields['position_at_loanApp'].widget.attrs['class'] = 'form-control wpcf7-select'



    # confirm user registration

    user_registration_confirmation_form = ConfirmUserRegistrationForm(request.POST or None, request.FILES or None, instance=instance)

    # upload physical form

    # user_registration_confirmation_form.fields['physical_membership_registration_form'].label = "Please upload physicaly filled membership registration form"
    # user_registration_confirmation_form.fields['physical_membership_registration_form'].widget.attrs['class'] = 'form-control margin-bottom'
    # user_registration_confirmation_form.fields['physical_membership_registration_form'].widget.attrs['id'] = 'physical_membership_registration_form'
    # user_registration_confirmation_form.fields['physical_membership_registration_form'].widget.attrs['required'] = 'required'

    if user_registration_confirmation_form.is_valid():

        if user_is_admin == True or user_is_admin == 'True' or user_is_admin == 'true':
            confirmRegistration = user_registration_confirmation_form.save(commit=False)
            confirmRegistration.save()

            logged_user_instance = SystemUser.objects.get(slug=logged_user_slug)

            SystemUser.objects.filter(slug=user_slug).update(membership_account_approved=True, membership_account_approved_by_user=logged_user_slug, membership_account_approved_on_datetime=today, account_verified=True, account_verified_by=logged_user_slug, account_verified_on_date_time=today)

            messages.success(request, "Account verified!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))

    old_password = request.POST.get('oldPassword', None)
    new_password = request.POST.get('newPassword', None)
    new_password_confirmation = request.POST.get('passwordConfirmation', None)

    if old_password == None or old_password == '' or new_password == None or new_password == '' or new_password_confirmation == None or new_password_confirmation == '':
        pass
    else:
        if logged_user_slug == user_slug:
            hashed_new_password = hash_password_function(new_password)
            SystemUser.objects.filter(slug=user_slug).update(password=hashed_new_password)

            messages.success(request, "Password successfully changed!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))

    user = request.GET.get('user', None)
    action = request.GET.get('action', None)

    if user == None or user == '' or action == None or action == '':
        pass
    else:
        check_user = SystemUser.objects.filter(slug=user).count()
        if check_user == 0:
            messages.error(request, "Sorry, we couldn't find the user!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
        else:
            if user_is_employee == True or user_is_employee == 'True' or user_is_employee == 'true':

                if action == 'activate':
                    SystemUser.objects.filter(slug=user).update(active=True)

                    messages.success(request, "User successfully activated!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user,)))
                elif action == 'deactivate':
                    SystemUser.objects.filter(slug=user).update(active=False)

                    messages.success(request, "User successfully deactivated!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user,)))
                else:
                    messages.error(request, "Ununderstood operation!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user,)))
            else:
                messages.error(request, "Sorry, you are not allowed to perform operation!")
                return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user,)))


    user_profile_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': logged_user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'userData': the_user_data,
        'userCurrentLoan': user_current_loan,
        'totalAmountToPay': total_amount_to_pay,
        'allUserTransactions': all_user_transactions,
        'userCurrentLoanTransactions': user_current_loan_transactions,
        'canChangePassword': can_change_password,
        'canEditUserDetails': can_edit_user_details,
        'userRegistrationConfirmationForm': user_registration_confirmation_form,
        'AddEmployeeForm': add_employee_form,
        'form': form
    }
    return render(request, 'main_app/user_profile.html', user_profile_context)


# manage employees view

def manage_employees_view(request, user_slug, action):

    today = datetime.now().date()

    page_title = 'Company Overview'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    logged_user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    if logged_user_slug == None or logged_user_slug == '':
        messages.error(request, "Please login to proceed!")
        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
    else:
        if user_is_admin == False or user_is_admin == 'False' or user_is_admin == 'false':
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
        else:
            check_client = SystemUser.objects.filter(slug=user_slug).count()
            if check_client == 0:
                messages.error(request, "Sorry, we failed to find the user!")
                return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
            else:
                company_details = CompanyDetails.objects.all()
                the_user_data = SystemUser.objects.all().filter(slug=user_slug)

                if action == 'remove':
                    SystemUser.objects.filter(slug=user_slug).update(is_admin=False, is_employee=False)

                    messages.success(request, "Employee successfully removed!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
                elif action == 'add':
                    employee_position = request.POST.get('position_at_loanApp', None)
                    SystemUser.objects.filter(slug=user_slug).update(position_at_loanApp=employee_position, is_admin=True, is_employee=True)

                    messages.success(request, "Employee successfully added!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
                else:
                    messages.error(request, "Ununderstood operation!")
                    return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))


# user profile view

def update_user_profile_view(request, user_slug):

    today = datetime.now().date()

    page_title = 'Company Overview'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    logged_user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    official_designation = request.POST.get('official_designation', None)
    id_number = request.POST.get('id_number', None)
    first_name = request.POST.get('first_name', None)
    middle_name = request.POST.get('middle_name', None)
    last_name = request.POST.get('last_name', None)
    sex = request.POST.get('sex', None)
    dob = request.POST.get('dob', None)
    marital_status = request.POST.get('marital_status', None)
    profession = request.POST.get('profession', None)
    employer = request.POST.get('employer', None)
    employer_address = request.POST.get('employer_address', None)
    terms_of_service = request.POST.get('terms_of_service', None)
    contract_ending_date = request.POST.get('contract_ending_date', None)
    email = request.POST.get('email', None)
    tel1 = request.POST.get('tel1', None)
    tel2 = request.POST.get('tel2', None)
    address = request.POST.get('address', None)
    town = request.POST.get('town', None)
    kra_pin = request.POST.get('kra_pin', None)
    next_of_kin_full_name = request.POST.get('next_of_kin_full_name', None)
    next_of_kin_relationship = request.POST.get('next_of_kin_relationship', None)
    next_of_kin_tel = request.POST.get('next_of_kin_tel', None)
    next_of_kin_id_number = request.POST.get('next_of_kin_id_number', None)
    next_of_kin_address = request.POST.get('next_of_kin_address', None)
    next_of_kin_town = request.POST.get('next_of_kin_town', None)
    next_of_kin_email = request.POST.get('next_of_kin_email', None)
    facebook_profile_link = request.POST.get('facebook_profile_link', None)
    linkedin_profile_link = request.POST.get('linkedin_profile_link', None)
    twitter_profile_link = request.POST.get('twitter_profile_link', None)

    if '/' in dob[:4]:
        dob_month = dob[:2]
        dob_day = dob[3:5]
        dob_year = dob[6:10]

        dob = dob_year+'-'+dob_month+'-'+dob_day

    if '/' in contract_ending_date[:4]:
        contract_ending_date_month = contract_ending_date[:2]
        contract_ending_date_day = contract_ending_date[3:5]
        contract_ending_date_year = contract_ending_date[6:10]

        contract_ending_date = contract_ending_date_year+'-'+contract_ending_date_month+'-'+contract_ending_date_day

    if first_name == None or first_name == '':
        messages.error(request, "Please fill in the form with the required data to proceed!")
        return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
    else:
        if logged_user_slug == user_slug or can_edit_user_details == True:

            SystemUser.objects.filter(slug=user_slug).update(official_designation=official_designation, id_number=id_number, first_name=first_name, middle_name=middle_name, last_name=last_name, sex=sex, dob=dob, marital_status=marital_status, profession=profession, employer=employer, employer_address=employer_address, terms_of_service=terms_of_service, contract_ending_date=contract_ending_date, email=email, tel1=tel1, tel2=tel2, address=address, town=town, kra_pin=kra_pin, next_of_kin_full_name=next_of_kin_full_name, next_of_kin_relationship=next_of_kin_relationship, next_of_kin_tel=next_of_kin_tel, next_of_kin_id_number=next_of_kin_id_number, next_of_kin_address=next_of_kin_address, next_of_kin_town=next_of_kin_town, next_of_kin_email=next_of_kin_email, facebook_profile_link=facebook_profile_link, linkedin_profile_link=linkedin_profile_link, twitter_profile_link=twitter_profile_link)
            
            # updateUser = form.save(commit=False)
            # updateUser.save()

            messages.success(request, "Account updated!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:UserProfileName', args=(user_slug,)))



# organization details view

def organization_details_view(request, organization_slug):

    today = datetime.now().date()

    page_title = 'Company Overview'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    logged_user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    the_organization_data = get_list_or_404(MemberOrganizations, slug=organization_slug)

    instance = get_object_or_404(MemberOrganizations, slug=organization_slug)
    form = EditMemberOrganizationsForm(request.POST or None, request.FILES or None, instance=instance)

    # organization copy of registration certificate

    form.fields['organization_copy_of_registration_certificate'].label = "Organization copy of registration certificate"
    form.fields['organization_copy_of_registration_certificate'].widget.attrs['class'] = 'form-control margin-bottom'
    form.fields['organization_copy_of_registration_certificate'].widget.attrs['id'] = 'organization_copy_of_registration_certificate'
    form.fields['organization_copy_of_registration_certificate'].widget.attrs['required'] = 'required'

    # Organization brochure

    form.fields['organization_brochure'].label = "Organization brochure"
    form.fields['organization_brochure'].widget.attrs['class'] = 'form-control margin-bottom'
    form.fields['organization_brochure'].widget.attrs['id'] = 'organization_brochure'
    form.fields['organization_brochure'].widget.attrs['required'] = 'required'

    # select organization category

    form.fields['organization_category'].queryset = OrganizationsCategories.objects.filter(active=True)
    form.fields['organization_category'].label = "Please Select This Code "
    form.fields['organization_category'].widget.attrs['required'] = 'required'
    form.fields['organization_category'].widget.attrs['class'] = 'form-control wpcf7-select'

    # organization logo

    form.fields['organization_logo'].label = "Organization logo"
    form.fields['organization_logo'].widget.attrs['class'] = 'form-control margin-bottom'
    form.fields['organization_logo'].widget.attrs['id'] = 'organization_logo'
    form.fields['organization_logo'].widget.attrs['required'] = 'required'

    if form.is_valid():
        if user_is_admin == True or user_is_admin == 'True' or user_is_admin == 'true':
            updateOrganizationData = form.save(commit=False)
            updateOrganizationData.save()

            messages.success(request, "Account updated!")
            return HttpResponseRedirect(reverse('mainAppNamespace:OrganizationDetailsName', args=(organization_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:OrganizationDetailsName', args=(organization_slug,)))


    # confirm user registration

    organization_registration_confirmation_form = ApproveOrganizationMembershipForm(request.POST or None, request.FILES or None, instance=instance)

    # upload physical form

    organization_registration_confirmation_form.fields['physical_pre_membership_registration_form'].label = "Please upload physicaly filled membership registration form"
    organization_registration_confirmation_form.fields['physical_pre_membership_registration_form'].widget.attrs['class'] = 'form-control margin-bottom'
    organization_registration_confirmation_form.fields['physical_pre_membership_registration_form'].widget.attrs['id'] = 'physical_pre_membership_registration_form'
    organization_registration_confirmation_form.fields['physical_pre_membership_registration_form'].widget.attrs['required'] = 'required'

    if organization_registration_confirmation_form.is_valid():

        if user_is_admin == True or user_is_admin == 'True' or user_is_admin == 'true':
            confirmOrganizationRegistration = organization_registration_confirmation_form.save(commit=False)
            confirmOrganizationRegistration.save()

            logged_user_instance = SystemUser.objects.get(slug=logged_user_slug)

            MemberOrganizations.objects.filter(slug=organization_slug).update(request_viewed=True, request_viewed_by=logged_user_instance, request_viewed_on_date_time=today, pre_membership_approved=True, pre_membership_approved_by=logged_user_instance, pre_membership_approved_on_date_time=today)

            messages.success(request, "Organization membership approved!")
            return HttpResponseRedirect(reverse('mainAppNamespace:OrganizationDetailsName', args=(organization_slug,)))
        else:
            messages.error(request, "You are not allowed to perform this operation!")
            return HttpResponseRedirect(reverse('mainAppNamespace:OrganizationDetailsName', args=(organization_slug,)))

    organization_details_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': logged_user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'organizationData': the_organization_data,
        'organizationRegistrationConfirmationForm': organization_registration_confirmation_form,
        'editOrganizationRegistrationForm': form
    }
    return render(request, 'main_app/organization_details.html', organization_details_context)

# logout view

def logout_view(request):
  user_logged = request.session.get('user_logged')  

  if user_logged == None:
    messages.success(request, "Signing out successful!")
    return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))
  else:
    del request.session['user_logged']
    del request.session['user_firebase_id']
    del request.session['user_slug']
    del request.session['user_email']
    del request.session['user_profile_image_url']
    del request.session['user_account_verified']
    del request.session['user_first_name']
    del request.session['user_middle_name']
    del request.session['user_last_name']
    del request.session['user_is_admin']
    del request.session['user_is_employee']

    messages.success(request, "Signing out successful!")
    return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))


# company overview view

def company_overview_view(request):

    page_title = 'Company Overview'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    company_overview_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services
    }
    return render(request, 'main_app/company_overview.html', company_overview_context)


# company history view

def company_history_view(request):

    page_title = 'Company History'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    company_history_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services
    }
    return render(request, 'main_app/company_history.html', company_history_context)

# careers view

def careers_view(request):

    page_title = 'Careers'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    available_positions = Position.objects.all().filter(advertised=True)
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    careers_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'availablePositions': available_positions,
        'ourOffers': our_services
    }
    return render(request, 'main_app/careers.html', careers_context)

# resources view

def resources_view(request):

    page_title = 'Resources'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    available_resources = DownloadableResource.objects.all().filter(can_be_downloaded=True)
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    resources_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'availableResources': available_resources,
        'ourOffers': our_services
    }
    return render(request, 'main_app/resources.html', resources_context)


# m view

def msacco_view(request):

    page_title = 'My-Fedha'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    m_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services
    }
    return render(request, 'main_app/m.html', m_context)


# membership view

def membership_view(request):

    page_title = 'Membership'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    membership_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services
    }
    return render(request, 'main_app/membership.html', membership_context)

# product details view

def product_details_view(request):

    page_title = 'Service'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    product_application_form = DownloadableResource.objects.all().filter(title='Product application')

    requested_service_slug = request.GET.get('selected_product', None)
    if requested_service_slug == None or requested_service_slug == '':
        no_service = 'true'
        requested_service = OurServices.objects.all()[:0]
    else:
        check_requested_service = OurServices.objects.filter(slug=requested_service_slug).count()
        if check_requested_service == 0:
            no_service = 'true'
            requested_service = OurServices.objects.all()[:0]
        else:
            no_service = 'false'
            requested_service = OurServices.objects.all().filter(slug=requested_service_slug)

    product_details_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'noService': no_service,
        'requestedServiceSlug': requested_service_slug,
        'requestedService': requested_service,
        'product_application_form': product_application_form
    }
    return render(request, 'main_app/product_details.html', product_details_context)

# tenders list view

def tenders_list_view(request):

    page_title = 'Tenders'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    realized_projects = request.GET.get('realized', None)
    if realized_projects == 'true':
        realized = True
    else:
        realized = False

    departments_list = Department.objects.filter(active=True)
    
    get_tenders_list = OurProjects.objects.filter(realized=realized, deleted=False)
    paginator = Paginator(get_tenders_list, 12)
    page = request.GET.get('page')
    try:
        tenders_list = paginator.page(page)
    except PageNotAnInteger:
        tenders_list = paginator.page(1)
    except EmptyPage:
        tenders_list = paginator.page(paginator.num_pages)

    tenders_list_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'tendersList': tenders_list,
        'departmentsList': departments_list,
    }
    return render(request, 'main_app/tenders_list.html', tenders_list_context)

# tenders details view

def tender_details_view(request, tender_slug):

    page_title = 'Tender'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    realized_projects = request.GET.get('realized', None)
    if realized_projects == 'true':
        realized = True
    else:
        realized = False

    tender_details = get_list_or_404(OurProjects, slug=tender_slug, deleted=False)

    tenders_details_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'tenderDetails': tender_details
    }
    return render(request, 'main_app/tenders_details.html', tenders_details_context)

# news view

def news_view(request):

    page_title = 'News'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    
    get_news_list = News.objects.all().filter(deleted=False).order_by('-id')
    paginator = Paginator(get_news_list, 12)
    page = request.GET.get('page')
    try:
        news_list = paginator.page(page)
    except PageNotAnInteger:
        news_list = paginator.page(1)
    except EmptyPage:
        news_list = paginator.page(paginator.num_pages)

    news_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'newsList': news_list
    }
    return render(request, 'main_app/news.html', news_context)

# news details view

def news_details_view(request, news_slug):

    page_title = 'News'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    news_details = get_list_or_404(News, slug=news_slug, deleted=False)

    news_details_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'newsDetails': news_details
    }
    return render(request, 'main_app/news_details.html', news_details_context)

# blog view

def blog_view(request):

    page_title = 'Blog'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    article_categories_list = BlogArticleCategory.objects.filter(active=True)
    recent_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')[:5]

    selected_article_category_slug = request.GET.get('article_category')
    if selected_article_category_slug == None or selected_article_category_slug == '':
        get_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')
    else:
        check_selected_blog_category = BlogArticleCategory.objects.filter(slug=selected_article_category_slug, active=True).count()
        if check_selected_blog_category == 0:
            get_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')
        else:
            selected_blog_category_instance = BlogArticleCategory.objects.get(slug=selected_article_category_slug)
            get_articles_list = BlogArticle.objects.filter(deleted=False, category=selected_blog_category_instance).order_by('-id')

    get_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')
    paginator = Paginator(get_articles_list, 12)
    page = request.GET.get('page')
    try:
        articles_list = paginator.page(page)
    except PageNotAnInteger:
        articles_list = paginator.page(1)
    except EmptyPage:
        articles_list = paginator.page(paginator.num_pages)

    blog_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'articleCategoriesList': article_categories_list,
        'recentArticlesList': recent_articles_list,
        'articlesList': articles_list
    }
    return render(request, 'main_app/blog.html', blog_context)


# blog article details view

def blog_article_view(request, article_slug):

    page_title = 'Article'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')
    article_categories_list = BlogArticleCategory.objects.filter(active=True)
    recent_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')[:5]

    selected_article_category_slug = request.GET.get('article_category')
    if selected_article_category_slug == None or selected_article_category_slug == '':
        get_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')
    else:
        check_selected_blog_category = BlogArticleCategory.objects.filter(slug=selected_article_category_slug, active=True).count()
        if check_selected_blog_category == 0:
            get_articles_list = BlogArticle.objects.filter(deleted=False).order_by('-id')
        else:
            selected_blog_category_instance = BlogArticleCategory.objects.get(slug=selected_article_category_slug)
            get_articles_list = BlogArticle.objects.filter(deleted=False, category=selected_blog_category_instance).order_by('-id')

    article_details = get_list_or_404(BlogArticle, slug=article_slug, deleted=False)

    article_details_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'articleCategoriesList': article_categories_list,
        'recentArticlesList': recent_articles_list,
        'articleDetails': article_details
    }
    return render(request, 'main_app/article_details.html', article_details_context)


# gallery view

def gallery_view(request):

    page_title = 'Gallery'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    gallery = Gallery.objects.all().filter(active=True)
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    gallery_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services,
        'gallery': gallery
    }
    return render(request, 'main_app/gallery.html', gallery_context)


# contact view

def contact_view(request):

    page_title = 'Contact'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    company_details = CompanyDetails.objects.all()
    our_services = OurServices.objects.all().filter(active=True).order_by('order')

    full_name = request.POST.get('fullname', None)
    email = request.POST.get('email', None)
    subject = request.POST.get('subject', None)
    message = request.POST.get('message', None)

    for company_data in company_details:
        loanApp__email = company_data.email
        loanApp__tel = company_data.tel1

    if full_name == None or full_name == '' or email == None or email == '' or message == None or message == '':
        pass
    else:
        Messagges.objects.create(full_name=full_name, email=email, subject=subject, message=message)

        # text loanApp

        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, message+'\n\n'+full_name+'\n'+email)

        to_loanApp_email = ['myfedha2019@gmail.com']
        send_mail(subject, message+'\n\n'+full_name+'\n'+email, settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

        messages.success(request, "Message sent!")

        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))

        # return HttpResponseRedirect(reverse('mainAppNamespace:ContactName'))

    contact_context = {
        'pageTitle': page_title,
        'userLogged': user_logged,
        'userFirebaseId': user_firebase_id,
        'userSlug': user_slug,
        'userEmail': user_email,
        'userProfileImageUrl': user_profile_image_url,
        'userAccountVerified': user_account_verified,
        'userFirstName': user_first_name,
        'userMiddleName': user_middle_name,
        'userLastName': user_last_name,
        'userIsAdmin': user_is_admin,
        'userIsEmployee': user_is_employee,
        'companyDetails': company_details,
        'pageDescription': page_description,
        'pageKeywords': page_keywords,
        'ourOffers': our_services
    }
    return render(request, 'main_app/contact.html', contact_context)



# administration view

def administration_view(request):

    today = datetime.now().date()

    page_title = 'Admin'
    page_description = 'My-Fedha is an app designed to give easy access to loans with people all around Kenya at a very affordable rate.'
    page_keywords = 'My-Fedha, My-Fedha App, Kenya instant loan, loan app'

    user_logged = request.session.get('user_logged')
    user_firebase_id = request.session.get('user_firebase_id')
    user_slug = request.session.get('user_slug')
    user_email = request.session.get('user_email')
    user_profile_image_url = request.session.get('user_profile_image_url')
    user_account_verified = request.session.get('user_account_verified')
    user_first_name = request.session.get('user_first_name')
    user_middle_name = request.session.get('user_middle_name')
    user_last_name = request.session.get('user_last_name')
    user_is_admin = request.session.get('user_is_admin')
    user_is_employee = request.session.get('user_is_employee')

    if user_is_admin == True or user_is_admin == 'True' or user_is_admin == 'true':

        company_details = CompanyDetails.objects.all()
        new_member_organizations = MemberOrganizations.objects.all().filter(pre_membership_approved=False).order_by('-id')
        number_of_pre_membership_requests = MemberOrganizations.objects.filter(pre_membership_approved=False).count()
        new_membership_registration_requests = SystemUser.objects.all().filter(membership_account_approved=False).order_by('-id')
        number_of_new_membership_registration_requests = SystemUser.objects.filter(membership_account_approved=False).count()

        new_messages = Messagges.objects.all().filter(attended=False).order_by('-id')
        number_of_new_messages = Messagges.objects.filter(attended=False).count()

        processed_message_slug = request.GET.get('message_slug', None)
        if processed_message_slug != None:
            check_message_to_process = Messagges.objects.filter(slug=processed_message_slug).count()
            if check_message_to_process != 0:
                logged_user_instance = SystemUser.objects.get(slug=user_slug)
                Messagges.objects.filter(slug=processed_message_slug).update(attended=True, attended_on_datetime=today, attended_by=logged_user_instance)

                messages.success(request, "Message attended!")
                return HttpResponseRedirect(reverse('mainAppNamespace:AdministrationName'))

        administration_context = {
            'pageTitle': page_title,
            'userLogged': user_logged,
            'userFirebaseId': user_firebase_id,
            'userSlug': user_slug,
            'userEmail': user_email,
            'userProfileImageUrl': user_profile_image_url,
            'userAccountVerified': user_account_verified,
            'userFirstName': user_first_name,
            'userMiddleName': user_middle_name,
            'userLastName': user_last_name,
            'userIsAdmin': user_is_admin,
            'userIsEmployee': user_is_employee,
            'companyDetails': company_details,
            'pageDescription': page_description,
            'pageKeywords': page_keywords,
            'numberOfPreMembershipRequests': number_of_pre_membership_requests,
            'newMemberOrganizations': new_member_organizations,
            'numberOfNewMembershipRegistrationRequests': number_of_new_membership_registration_requests,
            'newMembershipRegistrationRequests': new_membership_registration_requests,
            'newMessages': new_messages,
            'numberOfNewMessages': number_of_new_messages
        }
        return render(request, 'main_app/administration.html', administration_context)

    else:
        messages.error(request, "You are not allowed to access this section!")
        return HttpResponseRedirect(reverse('mainAppNamespace:HomeName'))



# Rest Test App Version Class

class RestTestAppVersionClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        get_mobile_app_version = MobileAppVersion.objects.all().order_by('-id')[:1]
        for mobile_app_version_data in get_mobile_app_version:
            version = mobile_app_version_data.version

        return Response([{"current_version": version}])


# Rest Test Login User Class

class RestTestLoginUserClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        email = request.GET.get('email', None)
        password = request.GET.get('password', None)

        hashed_password = hash_password_function(password)

        test_user = SystemUser.objects.filter(email=email, password=hashed_password).count()
        if test_user == 0:
            result = '0'
            user_firebase_id = 'none'
            message = 'You are not registered!'
        else:
            get_user_details = SystemUser.objects.all().filter(email=email, password=hashed_password)
            for user_data in get_user_details:
                user_firebase_id = user_data.firebase_id

            if user_firebase_id == None or user_firebase_id == 'none' or user_firebase_id == '':
                user_firebase_id = 'none'

            result = '1'
            user_firebase_id = 'none'
            message = 'You are registered!'

        return Response([{"result": result, "user_firebase_id": user_firebase_id, "message": message}])


# create new user class

class RestUserRegistrationClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        firebase_id = request.GET.get('firebase_id', None)
        id_number = request.GET.get('id_number', None)
        first_name = request.GET.get('first_name', None)
        last_name = request.GET.get('last_name', None)
        email = request.GET.get('email', None)
        tel = request.GET.get('tel', None)
        user_password = request.GET.get('password', None)
        password_confirmation = request.GET.get('password_confirmation', None)

        company_details = CompanyDetails.objects.all()
        for company_data in company_details:
            loanApp__email = company_data.email
            loanApp__tel = company_data.tel1

        if id_number != None:
            id_number = id_number.strip()

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if first_name != None:
            first_name = first_name.strip()

        if last_name != None:
            last_name = last_name.strip()

        if email != None:
            email = email.strip()

        if tel != None:
            tel = tel.strip()

        if user_password != None:
            user_password = user_password.strip()

        if password_confirmation != None:
            password_confirmation = password_confirmation.strip()

        if firebase_id is None or first_name is None or last_name is None or id_number is None or email is None or tel is None or user_password is None or password_confirmation is None:
            return Response([{"result": "0", "success": "", "error": "Please enter all the required data "
                                                                                  "to proceed!", "firebase_id": "", "user_slug": "", "verified": "", 
                                      "email_address": "", "first_name": "", "middle_name": "", "last_name": "", "profile_image_url": ""}])
        else:
            if user_password != password_confirmation:
                return Response([{"result": "0", "success": "",
                                  "error": "The two passwords don't match. Please check your password and try again!",
                                  "firebase_id": "", "user_slug": "", "verified": "", "profile_image_url": "",
                                      "email_address": "", "first_name": "", "middle_name": "", "last_name": ""}])
            else:
                check_user_account = SystemUser.objects.filter(
                    Q(firebase_id=firebase_id) | Q(email=email) | Q(tel1=tel) | Q(tel2=tel)).count()
                if check_user_account != 0:
                    return Response([{"result": "0", "success": "",
                                      "error": "You seem already registered!", "profile_image_url": "", "firebase_id": "", "user_slug": "", "verified": "", 
                                      "email_address": "", "first_name": "", "middle_name": "", "last_name": ""}])
                else:
                    hashed_password = hash_password_function(user_password)

                    get_company_data = CompanyDetails.objects.all()
                    for company_data in get_company_data:
                        minimum_loan_limit = company_data.minimum_loan_limit

                    none_official_designation_instance = PersonOfficialDesignation.objects.get(slug='none')
                    none_marital_status_instance = MaritalStatus.objects.get(slug='none')
                    none_sex_instance = Gender.objects.get(slug='none')
                    none_position_instance = Position.objects.get(slug='none')
                    none_access_level_instance = AccessLevel.objects.get(slug='none')

                    get_lattest_town_data = Town.objects.all().order_by('-id')[:1]
                    for lattest_town_data in get_lattest_town_data:
                        lattest_town_slug = lattest_town_data.slug

                    lattest_town_instance = Town.objects.get(slug=lattest_town_slug)

                    SystemUser.objects.create(firebase_id=firebase_id, id_number=id_number, first_name=first_name,
                                              last_name=last_name, email=email, tel1=tel, password=hashed_password, loan_limit=minimum_loan_limit, 
                                              sex=none_sex_instance, town=lattest_town_instance, next_of_kin_town=lattest_town_instance, 
                                              access_level=none_access_level_instance, position_at_loanApp=none_position_instance, 
                                              official_designation=none_official_designation_instance, marital_status=none_marital_status_instance)

                    # get new user data

                    get_user_data = SystemUser.objects.all().filter(firebase_id=firebase_id)
                    for user_data in get_user_data:
                        user_slug = user_data.slug
                        verified = user_data.account_verified
                        middle_name = user_data.middle_name
                        profile_image_url = user_data.profile_image_url  

                    # text user

                    # sms_sent, message_sid = send_twilio_sms(tel, 'Dear '+first_name+' '+last_name+',\n\n We have received your request to join loanApp . We will review your application and get back to you as soon as possible.\n\n Regards,')
             
                    # text loanApp

                    # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'Hello,\n\n My name is '+first_name+' '+last_name+'. I would like to join loanApp . My email address is '+email+' and my phone number is '+tel+'\n\nRegards,')                  

                    to_loanApp_email = ['myfedha2019@gmail.com']
                    send_mail('My-Fedha Registration', 'Hello,\n\n My name is '+first_name+' '+last_name+'. I would like to join My-Fedha . My email address is '+email+' and my phone number is '+tel+'\n\nRegards,',
                              settings.EMAIL_HOST_USER, to_loanApp_email, fail_silently=True)

                    message_to_user = "Dear "+first_name+" "+last_name+",\n\n welcome to My-Fedha  Limited where dreams are realized. We are glad that you chose to be part of us. We have a wide variety of products for you to enjoy. We have two types of accounts (withdrawable and savings/fixed deposit). The withdrawable account enables you to deposit and withdraw cash via Mpesa and Credid/debitcards; buy Safaricom, Airtel and Orange airtime, transfer to other members and transfer to your savings among many other functions. The savings account enables you to access a loan that is upto a maximum of three times your savings. The loan can be secured by your savings, guarantors who are members of the  and whose savings add up to the loan amount or securities such as car log book or land title deed. All transactions come with accurate reports for accounting purposed. You can access your account either using the Android application on Google Play Store or via www.my-fedha.co.ke.\n You are required to keep your account secure by using strong passwords that cannot be easily guessed and by changing your passwords regularly.\n Please note that you are not supposed to share your account information with anyone. Our staff will not ask for your account Passwords. Our system is highly secured guaranteeing you safety of your money. Also to ensure that you are making payment to your account, every Mpesa transaction send to your phone for confirmation comes with your name and My-Fedha  Global as the recipient. Do not respond to any requests without your name. \n For inquiries, please get in touch with us on "+loanApp__tel+" or info@my-fedha.co.ke.\n\n Thank you for choosing My-Fedha .\n\n Regards,\n\n\n My-Fedha Team"
            
                    to_user_email = [email]
                    send_mail('My-Fedha Registration', message_to_user,
                              settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                    return Response([{"result": "1", "success": "Registration successful!", "error": "",
                                      "firebase_id": firebase_id, "user_slug": user_slug, "verified": verified, "profile_image_url": profile_image_url, 
                                      "email_address": email, "first_name": first_name, "middle_name": middle_name, "last_name": last_name}])


# Rest Authentication Class

class RestAuthenticationClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        user_slug = request.GET.get('user_slug', None)
        firebase_id = request.GET.get('firebase_id', None)
        current_token = request.GET.get('current_token', None)
        suggested_token = request.GET.get('suggested_token', None)
        email_address = request.GET.get('email_address', None)
        raw_password = request.GET.get('user_password', None)
        authentication_type = request.GET.get('authentication_type', None)

        if user_slug != None:
            user_slug = user_slug.strip()

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if suggested_token != None:
            suggested_token = suggested_token.strip()

        if email_address != None:
            email_address = email_address.strip()

        if raw_password != None:
            raw_password = raw_password.strip()

        if authentication_type != None:
            authentication_type = authentication_type.strip()

        if authentication_type == 'login':
            if email_address is None or raw_password is None:
                return Response([{"result": "0", "success": "", "verified": "", "profile_image_url": "",
                                  "error": "Please enter your email and password to proceed!", "active_login_token": "",
                                  "suggested_token": "", "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": "", "is_admin": ""}])

            else:
                hashed_password = hash_password_function(raw_password)

                check_user = SystemUser.objects.filter(Q(tel1=email_address) | Q(tel2=email_address) | Q(id_number=email_address) | Q(email=email_address)).filter(firebase_id=firebase_id,
                                                       password=hashed_password).count()

                if check_user == 0:

                    return Response([{"result": "0", "success": "", "verified": "", "profile_image_url": "",
                                  "error": "Login error! Please check your email and password and try again!", "active_login_token": "",
                                  "suggested_token": "", "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": "", "is_admin": ""}])
                else:
                    the_user_instance = SystemUser.objects.get(firebase_id=firebase_id)

                    get_user_data = SystemUser.objects.all().filter(email=email_address, password=hashed_password)
                    for user_data in get_user_data:
                        firebase_id = user_data.firebase_id
                        user_slug = user_data.slug
                        user_email_address = user_data.email
                        profile_image_url = user_data.profile_image_url
                        verified = user_data.account_verified
                        first_name = user_data.first_name
                        middle_name = user_data.middle_name
                        last_name = user_data.last_name
                        is_admin = user_data.is_admin


                    if current_token is None:
                        current_token = ''

                    if suggested_token is None:
                        suggested_token = ''

                    result, active_login_token, token_to_suggest, message = \
                        request_login_token_generation_function(user_slug, firebase_id, current_token, suggested_token,
                                                                'xcGTj8*90_Y_yy')
                    if result == '0':
                        return Response([{"result": "0", "success": "", "verified": "", "profile_image_url": "",
                                  "error": message, "active_login_token": "",
                                  "suggested_token": "", "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": ""}])
                    else:
                        LoginTokens.objects.filter(user=the_user_instance, active=True) \
                            .update(is_next=False, active=False)

                        LoginTokens.objects.create(user=the_user_instance, token=active_login_token,
                                                   is_next=False)

                        return Response([{"result": "1", "success": "Login successful!", "verified": verified, 
                            "profile_image_url": profile_image_url, "error": "", "active_login_token": active_login_token,
                                  "suggested_token": suggested_token, "user_slug": user_slug, "firebase_id": firebase_id, "is_admin": is_admin, 
                                  "email_address": user_email_address, "first_name": first_name, "middle_name": middle_name, "last_name": last_name}])

        else:
            check_user = SystemUser.objects.filter(slug=user_slug, firebase_id=firebase_id).count()
            if check_user == 0:

                return Response([{"result": "0", "success": "", "verified": "", "profile_image_url": "",
                                  "error": "Sorry, we couldn't authenticate you. Please login to proceed!", "active_login_token": "",
                                  "suggested_token": "", "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": "", "is_admin": ""}])
            else:
                the_user_instance = SystemUser.objects.get(slug=user_slug)

                result, active_login_token, token_to_suggest, message = \
                    request_login_token_generation_function(user_slug, firebase_id, current_token, suggested_token,
                                                            'renew')

                if result == '0':

                    return Response([{"result": result, "success": "", "verified": "", "profile_image_url": "",
                                  "error": message, "active_login_token": "",
                                  "suggested_token": "", "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": "", "is_admin": ""}])
                else:
                    LoginTokens.objects.filter(user=the_user_instance, token=current_token) \
                        .update(is_next=False, active=False)
                    LoginTokens.objects.filter(user=the_user_instance, token=suggested_token) \
                        .update(is_next=False, active=True)

                    LoginTokens.objects.create(user=the_user_instance, token=token_to_suggest,
                                               is_next=True)

                    get_user_data = SystemUser.objects.all().filter(slug=user_slug)
                    for user_data in get_user_data:
                        is_admin = user_data.is_admin

                    return Response([{"result": result, "success": "Login successful!", "verified": "", "profile_image_url": "",
                                  "error": "", "active_login_token": active_login_token,
                                  "suggested_token": token_to_suggest, "user_slug": "", "firebase_id": "", "email_address": ""
                                  , "first_name": "", "middle_name": "", "last_name": "", "is_admin": is_admin}])


# Rest Get User Urgent Action Class

class RestGetUserUrgentActionClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        system_configuration_data = track_loan_defaulters()

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message, "urgent_action": "", "current_amount_in_account": "", "current_loan_amount": "", "loan_due_date": "", "loan_next_refund_due_date": "", "loan_limit": ""}])
        else:
            get_company_data = CompanyDetails.objects.all()
            for company_data in get_company_data:
                minimum_days_of_deposit_to_take_loan = company_data.minimum_days_of_deposit_to_take_loan

            user_instance = SystemUser.objects.get(slug=user_slug)

            get_user_data = SystemUser.objects.all().filter(slug=user_slug)
            for user_data in get_user_data:
                cleared_for_loan = user_data.cleared_for_loan
                started_deposit_on_datetime = user_data.started_deposit_on_datetime
                loan_limit = user_data.loan_limit
                current_loan_amount = user_data.current_loan_amount
                loan_next_refund_due_date = user_data.loan_next_refund_due_date
                loan_due_date = user_data.loan_due_date
                current_amount_in_account = user_data.current_amount_in_account

            proceed_now = True

            if cleared_for_loan == True:
                if current_loan_amount == 0:
                    urgent_action = 'borrow'
                else:
                    urgent_action = 'refund'
            else:
                if proceed_now == True:
                    urgent_action = 'borrow'
                else:
                    if started_deposit_on_datetime is not None:
                        # formated_current_date = datetime.strptime(today, '%m/%d/%Y').strftime('%Y-%m-%d')

                        today_date_ready_for_difference = datetime.strptime(str(today), "%Y-%m-%d")
                        started_deposit_on_datetime_ready_for_difference = datetime.strptime(str(started_deposit_on_datetime), "%Y-%m-%d")

                        deposited_for_number_of_days = (today_date_ready_for_difference - started_deposit_on_datetime_ready_for_difference).days

                        if deposited_for_number_of_days > minimum_days_of_deposit_to_take_loan:
                            SystemUser.objects.filter(slug=user_slug).update(cleared_for_loan=True)
                            urgent_action = 'borrow'
                        else:
                            urgent_action = 'deposit'
                    else:
                        urgent_action = 'deposit'


            return Response([{"result": "1", "error": "", "success": "", "urgent_action": urgent_action, "current_amount_in_account": current_amount_in_account, "current_loan_amount": current_loan_amount, "loan_due_date": loan_due_date, "loan_next_refund_due_date": loan_next_refund_due_date, "loan_limit": loan_limit}])


# Rest Get User Account Details Class

class RestGetUserAccountDetailsClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message, "cleared_for_loan": "", "loan_limit": "", "current_loan_amount": "", "loan_next_refund_due_date": "", "loan_due_date": "", "current_amount_in_account": "", "user_pending_deposits_amount": "", "user_pending_loan_requests_amount": "", "user_pending_refunds_amount": "", "user_pending_withdrawal_amount": "", "user_mpesa_number": ""}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            get_user_data = SystemUser.objects.all().filter(slug=user_slug)
            for user_data in get_user_data:
                user_mpesa_number = user_data.tel1
                cleared_for_loan = user_data.cleared_for_loan
                loan_limit = user_data.loan_limit
                current_loan_amount = user_data.current_loan_amount
                loan_next_refund_due_date = user_data.loan_next_refund_due_date
                loan_due_date = user_data.loan_due_date
                current_amount_in_account = user_data.current_amount_in_account

            user_pending_deposits_amount = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='deposit').aggregate(Sum('transacted_amount')).get('transacted_amount__sum', 0.00)
            if user_pending_deposits_amount == None:
                user_pending_deposits_amount = 0

            user_pending_loan_requests_amount = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='borrow').aggregate(Sum('transacted_amount')).get('transacted_amount__sum', 0.00)
            if user_pending_loan_requests_amount == None:
                user_pending_loan_requests_amount = 0

            user_pending_refunds_amount = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='refund').aggregate(Sum('transacted_amount')).get('transacted_amount__sum', 0.00)
            if user_pending_refunds_amount == None:
                user_pending_refunds_amount = 0

            user_pending_withdrawal_amount = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='withdrawal').aggregate(Sum('transacted_amount')).get('transacted_amount__sum', 0.00)
            if user_pending_withdrawal_amount == None:
                user_pending_withdrawal_amount = 0

            return Response([{"result": "1", "error": "", "success": "", "cleared_for_loan": cleared_for_loan, "loan_limit": loan_limit, "current_loan_amount": current_loan_amount, "loan_next_refund_due_date": loan_next_refund_due_date, "loan_due_date": loan_due_date, "current_amount_in_account": current_amount_in_account, "user_pending_deposits_amount": user_pending_deposits_amount, "user_pending_loan_requests_amount": user_pending_loan_requests_amount, "user_pending_refunds_amount": user_pending_refunds_amount, "user_pending_withdrawal_amount": user_pending_withdrawal_amount, "user_mpesa_number": user_mpesa_number}])


# Rest Get Products List Class

class RestGetProductsListClass(ListAPIView):
    serializer_class = ProductsSerializer

    def get_queryset(self, *args, **kwargs):

        today = datetime.now().date()

        user_slug = self.request.GET.get('user_slug', None)
        firebase_id = self.request.GET.get('firebase_id', None)
        account_type = self.request.GET.get('account_type', None)
        current_token = self.request.GET.get('current_token', None) 
        except_user_products = self.request.GET.get('except_user_products', None)     
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        user_products_ids_list = []

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            queryset_list = OurServices.objects.all().filter(active=True)
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            if except_user_products == 'true':
                get_user_products = UserAccounts.objects.all().filter(user=user_instance)
                for user_products_data in get_user_products:
                    user_products_ids_list.append(user_products_data.product.id)

                if account_type == 'savings':
                    savings_category_instance = ServiceCategories.objects.get(slug='savings')
                    queryset_list = OurServices.objects.filter(service_type=savings_category_instance, active=True).exclude(id__in=user_products_ids_list)

                elif account_type == 'loans':
                    loans_category_instance = ServiceCategories.objects.get(slug='loan')
                    queryset_list = OurServices.objects.filter(service_type=loans_category_instance, active=True).exclude(id__in=user_products_ids_list)
                else:
                    queryset_list = OurServices.objects.all().filter(active=True).exclude(id__in=user_products_ids_list)

            else:
                if account_type == 'savings':
                    savings_category_instance = ServiceCategories.objects.get(slug='savings')
                    queryset_list = OurServices.objects.filter(service_type=savings_category_instance, active=True)

                elif account_type == 'loans':
                    loans_category_instance = ServiceCategories.objects.get(slug='loan')
                    queryset_list = OurServices.objects.filter(service_type=loans_category_instance, active=True)
                else:
                    queryset_list = OurServices.objects.all().filter(active=True)

        return queryset_list


# Rest Register User For Products Class

class RestRegisterUserForProductsClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        user_slug = self.request.GET.get('user_slug', None)
        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        product_slug = self.request.GET.get('product_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:            
            check_product = OurServices.objects.filter(slug=product_slug).count()
            if check_product == 0:
                return Response([{"result": "0", "success": "", "error": "Sorry, we failed to find the product you requested!"}])
            else:
                user_instance = SystemUser.objects.get(slug=user_slug)
                product_instance = OurServices.objects.get(slug=product_slug)

                check_user_account = UserAccounts.objects.filter(user=user_instance, product=product_instance).count()
                if check_user_account != 0:
                    return Response([{"result": "0", "success": "", "error": "You are already registered for this product!"}])
                else:
                    get_product_details = OurServices.objects.all().filter(slug=product_slug)
                    for product_data in get_product_details:
                        product_name = product_data.title

                    account_code = generate_account_code()

                    UserAccounts.objects.create(user=user_instance, product=product_instance, account_code=account_code)
                    return Response([{"result": "1", "success": "You are successfully registered for "+product_name+" account!", "error": ""}])

# Rest Get User Accounts List Class

class RestGetUserAccountsListClass(ListAPIView):
    serializer_class = UserAccountsSerializer

    def get_queryset(self, *args, **kwargs):

        today = datetime.now().date()

        user_slug = self.request.GET.get('user_slug', None)
        firebase_id = self.request.GET.get('firebase_id', None)
        account_type = self.request.GET.get('account_type', None)
        current_token = self.request.GET.get('current_token', None)        
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            queryset_list = UserAccounts.objects.all()[:0]
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            if account_type == 'savings':
                savings_category_instance = ServiceCategories.objects.get(slug='savings')
                get_savings_products_ids = OurServices.objects.filter(service_type=savings_category_instance, active=True).values_list('id', flat=True)

                queryset_list = UserAccounts.objects.all().filter(user=user_instance, product__in=get_savings_products_ids)

            elif account_type == 'loans':
                loans_category_instance = ServiceCategories.objects.get(slug='loan')
                get_loans_products_ids = OurServices.objects.filter(service_type=loans_category_instance, active=True).values_list('id', flat=True)

                queryset_list = UserAccounts.objects.all().filter(user=user_instance, product__in=get_loans_products_ids)
            else:
                queryset_list = UserAccounts.objects.all()[:0]

        return queryset_list

# Rest Make Deposit Class

class RestMakeDepositClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        amount = self.request.GET.get('amount', None)        
        user_slug = self.request.GET.get('user_slug', None)
        firebase_id = self.request.GET.get('firebase_id', None)
        mpesa_number = self.request.GET.get('mpesa_number', None)
        current_token = self.request.GET.get('current_token', None)        
        currently_suggested_token = self.request.GET.get('suggested_token', None)        
        save_in_account_slug = self.request.GET.get('save_in_account_slug', None)
        
        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if amount != None:
            amount = amount.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message, "mpesa_paybill_number": "", "transaction_code": ""}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            amount_is_int = test_int(amount)
            if amount_is_int == '0':
                return Response([{"result": "0", "success": "", "error": "Please input the amount as an integer!", "mpesa_paybill_number": "", "transaction_code": ""}])
            else:
                if int(amount) < 0 or int(amount) == 0:
                    return Response([{"result": "0", "success": "", "error": "Please enter an amount greater than 0", "mpesa_paybill_number": "", "transaction_code": ""}])
                else:
                    kenyan_number_test_result, number_to_use = verify_kenyan_phone_number(mpesa_number)
                    if kenyan_number_test_result == False:
                        return Response([{"result": "0", "success": "", "error": "Tel number error. Please enter a valid kenyan safaricom number to proceed!", "mpesa_paybill_number": "", "transaction_code": ""}])
                    else:
                        mpesa_number_to_use = number_to_use[1:]

                        test_mpesa_number = check_safaricom_phone_number(mpesa_number_to_use)
                        if test_mpesa_number == 0:
                            return Response([{"result": "0", "success": "", "error": "This is not a safaricom number. Please enter a safaricom number for the mpesa.", "mpesa_paybill_number": "", "transaction_code": ""}])
                        else:
                            get_user_data = SystemUser.objects.all().filter(slug=user_slug)
                            for user_data in get_user_data:
                                user_tel = user_data.tel1
                                user_email = user_data.email

                            get_company_data = CompanyDetails.objects.all()
                            for company_data in get_company_data:
                                loanApp__tel = company_data.tel1
                                company_email = company_data.email
                                mpesa_paybill_number = company_data.mpesa_paybill_number

                            # test account 

                            user_account_check = UserAccounts.objects.filter(slug=save_in_account_slug).count()
                            if user_account_check == 0:
                                return Response([{"result": "0", "success": "", "error": "Sorry we failed to find your account!", "mpesa_paybill_number": "", "transaction_code": ""}])
                            else:
                                user_account_instance = UserAccounts.objects.get(slug=save_in_account_slug)

                                get_user_account_details = UserAccounts.objects.all().filter(slug=save_in_account_slug)
                                for user_account_data in get_user_account_details:
                                    user_account_name = user_account_data.product.title

                                transaction_code = generate_transaction_code(user_instance, user_tel)
                                UserTransactions.objects.create(user=user_instance, transaction_from_account=user_account_instance, transaction_type='deposit', transacted_amount=int(amount), used_paybill_number=mpesa_paybill_number, transaction_code=transaction_code)

                                get_new_transaction_details = UserTransactions.objects.filter(user=user_instance, transaction_from_account=user_account_instance, transaction_type='deposit', transacted_amount=int(amount), used_paybill_number=mpesa_paybill_number, transaction_code=transaction_code)
                                for new_transaction_data in get_new_transaction_details:
                                    new_transaction_slug = new_transaction_data.slug

                                mpesa_api_access_token = get_mpesa_access_token()
                                perform_client_mpesa_transfer(mpesa_api_access_token, transaction_code, amount, mpesa_number_to_use, user_account_name, new_transaction_slug)

                                # text user

                                # sms_sent, message_sid = send_twilio_sms(user_tel, 'You have successfully made a deposit of KES '+str(amount)+' to loanApp .\n Transaction code : '+transaction_code+'\n Thank you for trusting loanApp .')
                         
                                # text loanApp

                                # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A deposit of KES '+str(amount)+' has been successfully made. Please confirm it as soon as possible.')

                                to_user_email = [user_email]
                                send_mail('My-Fedha deposit', 'You have successfully made a deposit of KES '+str(amount)+' to My-Fedha.\n Transaction code : '+transaction_code+'\n Thank you for trusting My-Fedha .',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                                to_company_email = ['myfedha2019@gmail.com']
                                send_mail('My-Fedha deposit', 'A deposit of KES '+str(amount)+' has been successfully made. Please confirm it as soon as possible.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                                return Response([{"result": "1", "success": "Saving request sent!", "error": "", "mpesa_paybill_number": mpesa_paybill_number, "transaction_code": transaction_code}])


# Rest Request Withdrawal Class

class RestRequestWithdrawalClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        amount = self.request.GET.get('amount', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if amount != None:
            amount = amount.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            amount_is_int = test_int(amount)
            if amount_is_int == '0':
                return Response([{"result": "0", "success": "", "error": "Please input the amount as an integer!"}])
            else:
                if int(amount) < 0 or int(amount) == 0:
                    return Response([{"result": "0", "success": "", "error": "Please enter an amount greater than 0"}])
                else:
                    get_company_data = CompanyDetails.objects.all()
                    for company_data in get_company_data:
                        loanApp__tel = company_data.tel1
                        company_email = company_data.email

                    get_user_data = SystemUser.objects.all().filter(slug=user_slug)
                    for user_data in get_user_data:
                        user_tel = user_data.tel1
                        user_email = user_data.email
                        current_amount_in_account = user_data.current_amount_in_account

                    user_pending_withdrawal_amount = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='withdrawal').aggregate(Sum('transacted_amount')).get('transacted_amount__sum', 0.00)
                    if user_pending_withdrawal_amount == None:
                        user_pending_withdrawal_amount = 0

                    user_pending_withdrawal_amount = user_pending_withdrawal_amount + int(amount)


                    if current_amount_in_account < user_pending_withdrawal_amount:
                        return Response([{"result": "0", "success": "", "error": "The total amount you have requested is more than the amount you have currently in your savings account!"}])
                    else:
                        transaction_code = generate_transaction_code(user_instance, user_tel)
                        UserTransactions.objects.create(user=user_instance, transaction_type='withdrawal', transacted_amount=int(amount), transaction_code=transaction_code)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your withdrawal request of KES '+str(amount)+' has been sent to loanApp .\n Transaction code : '+transaction_code+'\n Thank you for trusting loanApp .')
             
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A withdrawal of KES '+str(amount)+' has been requested. Please attend it as soon as possible!')

                        to_user_email = [user_email]
                        send_mail('My-Fedha Withdrawal', 'Your withdrawal request of KES '+str(amount)+' has been sent to My-Fedha.\n Transaction code : '+transaction_code+'\n Thank you for trusting My-Fedha.',
                              settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha Withdrawal', 'A withdrawal of KES '+str(amount)+' has been requested. Please attend it as soon as possible!',
                              settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        return Response([{"result": "1", "success": "Withdrawal request sent!", "error": ""}])


# Rest Loan Request Class

class RestLoanRequestClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        amount = self.request.GET.get('amount', None)
        description = self.request.GET.get('description', None)
        intended_number_of_days_to_repay = self.request.GET.get('intended_number_of_days_to_repay', None)

        get_company_data = CompanyDetails.objects.all()
        for company_data in get_company_data:
            number_of_days_to_refund_loan = company_data.number_of_days_to_refund_loan

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if amount != None:
            amount = amount.strip()

        if description != None:
            description = description.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            amount_is_int = test_int(amount)
            if amount_is_int == '0':
                return Response([{"result": "0", "success": "", "error": "Please input the amount as an integer!"}])
            else:
                intended_number_of_days_to_repay = test_int(intended_number_of_days_to_repay)
                if intended_number_of_days_to_repay == '0':
                    return Response([{"result": "0", "success": "", "error": "Please input the number of weeks as an integer!"}])
                else:
                    if int(intended_number_of_days_to_repay) < 0 or int(intended_number_of_days_to_repay) == 0:
                        return Response([{"result": "0", "success": "", "error": "Please enter the number of weeks as an integer greater than 0"}])
                    else:
                        if int(intended_number_of_days_to_repay) > number_of_days_to_refund_loan:
                            return Response([{"result": "0", "success": "", "error": "Sorry, the number of days to repay must be less than "+str(number_of_days_to_refund_loan)+"!"}])
                        else:

                            if int(amount) < 0 or int(amount) == 0:
                                return Response([{"result": "0", "success": "", "error": "Please enter an amount greater than 0"}])
                            else:
                                get_user_data = SystemUser.objects.all().filter(slug=user_slug)
                                for user_data in get_user_data:
                                    user_tel = user_data.tel1
                                    user_email = user_data.email
                                    started_deposit_on_datetime = user_data.started_deposit_on_datetime
                                    cleared_for_loan = user_data.cleared_for_loan
                                    loan_limit = user_data.loan_limit
                                    current_loan_amount = user_data.current_loan_amount
                                    current_amount_in_account = user_data.current_amount_in_account

                                get_company_data = CompanyDetails.objects.all()
                                for company_data in get_company_data:
                                    company_email = company_data.email
                                    loanApp__tel = company_data.tel1
                                    loan_interest_percentage = company_data.loan_interest_percentage

                                if cleared_for_loan is False:
                                    return Response([{"result": "0", "success": "", "error": "Sorry, you are not yet eligible for a loan. Feel free to contact us for more details."}])
                                else:
                                    # lead crb testing

                                    if current_loan_amount > 0:
                                        return Response([{"result": "0", "success": "", "error": "You have an outstanding loan. Please clear your loan first!"}])
                                    else:
                                        check_user_pending_loan_request = UserTransactions.objects.filter(user=user_instance, verified=False, rejected=False, transaction_type='borrow').count()
                                        if check_user_pending_loan_request != 0:
                                            return Response([{"result": "0", "success": "", "error": "You already have a pending request!"}])
                                        else:
                                            transaction_code = generate_transaction_code(user_instance, user_tel)

                                            loan_interest, amount_to_give = compute_loan_interest(int(amount), loan_interest_percentage)

                                            intended_date_to_repay_loan = today + timedelta(days=int(intended_number_of_days_to_repay))

                                            LoansRecord.objects.create(user=user_instance, loan_code=transaction_code, amount_taken=int(amount), amount_remained_to_refund=int(amount), amount_given_to_client=int(amount_to_give), loan_original_interest=int(loan_interest), total_interest=int(loan_interest), intended_date_to_repay_loan=intended_date_to_repay_loan)

                                            loan_transaction_instance = LoansRecord.objects.get(loan_code=transaction_code)

                                            UserTransactions.objects.create(loan_record=loan_transaction_instance, user=user_instance, transaction_type='borrow', transacted_amount=int(amount), loan_amount_given_to_client=int(amount_to_give), loan_interest=int(loan_interest), number_of_intended_days_to_repay_loan=int(intended_number_of_days_to_repay), intended_date_to_repay_loan=intended_date_to_repay_loan, transaction_code=transaction_code, description=description)

                                            # text user

                                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your request for a KES '+str(amount)+' loan has been sent to loanApp . You will receive KES '+str(amount_to_give)+'. KES '+str(loan_interest)+' is the loan interest \n Transaction code : '+transaction_code+'\n Thank you for trusting loanApp .')
                         
                                            # text loanApp

                                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A loan request of KES '+str(amount)+' has been requested. Please attend it as soon as possible!')

                                            to_user_email = [user_email]
                                            send_mail('My-Fedha loan request', 'Your request for a KES '+str(amount)+' loan has been sent to My-Fedha. You will receive KES '+str(amount_to_give)+'. KES '+str(loan_interest)+' is the loan interest \n Transaction code : '+transaction_code+'\n Thank you for trusting My-Fedha.',
                                                  settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                                            to_company_email = ['myfedha2019@gmail.com']
                                            send_mail('My-Fedha loan request', 'A loan request of KES '+str(amount)+' has been requested. Please attend it as soon as possible!',
                                                  settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                                            return Response([{"result": "1", "success": "Loan request sent!", "error": ""}])



# Rest Refund Loan Class

class RestRefundLoanClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        amount = self.request.GET.get('amount', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if amount != None:
            amount = amount.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message, "mpesa_paybill_number": "", "transaction_code": ""}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            amount_is_int = test_int(amount)
            if amount_is_int == '0':
                return Response([{"result": "0", "success": "", "error": "Please input the amount as an integer!", "mpesa_paybill_number": "", "transaction_code": ""}])
            else:
                if int(amount) < 0 or int(amount) == 0:
                    return Response([{"result": "0", "success": "", "error": "Please enter an amount greater than 0", "mpesa_paybill_number": "", "transaction_code": ""}])
                else:
                    get_user_data = SystemUser.objects.all().filter(slug=user_slug)
                    for user_data in get_user_data:
                        user_tel = user_data.tel1
                        user_email = user_data.email
                        current_loan_amount = user_data.current_loan_amount

                    get_company_data = CompanyDetails.objects.all()
                    for company_data in get_company_data:
                        loanApp__tel = company_data.tel1
                        mpesa_paybill_number = company_data.mpesa_paybill_number

                    if current_loan_amount == 0:
                        return Response([{"result": "0", "success": "", "error": "You don't have an outstanding loan!", "mpesa_paybill_number": "", "transaction_code": ""}])
                    else:
                        if current_loan_amount < int(amount):
                            return Response([{"result": "0", "success": "", "error": "You are paying more than your outstanding loan balance. Please correct the amount and try again!"}])
                        else:
                            transaction_code = generate_transaction_code(user_instance, user_tel)

                            get_user_current_loan_details = LoansRecord.objects.all().filter(user=user_instance, loan_granted=True, loan_refunded=False, loan_request_rejected=False)
                            for user_current_loan_data in get_user_current_loan_details:
                                user_current_loan_slug = user_current_loan_data.slug

                            user_current_loan_instance = LoansRecord.objects.get(slug=user_current_loan_slug)

                            UserTransactions.objects.create(user=user_instance, loan_record=user_current_loan_instance, transaction_type='refund', transacted_amount=int(amount), used_paybill_number=mpesa_paybill_number, transaction_code=transaction_code)

                            # text user

                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'You have successfully made a deposit of KES '+str(amount)+' to loanApp  being payment of your loan.\n Transaction code : '+transaction_code+'\n Thank you for trusting loanApp .')
                         
                            # text loanApp

                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A loan payment of KES '+str(amount)+' has been made. Please confirm it as soon as possible.')

                            to_user_email = [user_email]
                            send_mail('My-Fedha loan refund', 'You have successfully made a deposit of KES '+str(amount)+' to My-Fedha being payment of your loan.\n Transaction code : '+transaction_code+'\n Thank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                            to_company_email = ['myfedha2019@gmail.com']
                            send_mail('My-Fedha loan refund', 'A loan payment of KES '+str(amount)+' has been made. Please confirm it as soon as possible.',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                            return Response([{"result": "1", "success": "Loan refund request sent!", "error": "", "mpesa_paybill_number": mpesa_paybill_number, "transaction_code": transaction_code}])


# Rest User Number Of Notifications Class

class RestUserNumberOfNotificationsClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()
        current_datetime = datetime.now()        

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message, "numberOfUserNotifications": ""}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            user_pending_deposits_amount = UserTransactions.objects.filter(user=user_instance, rejected=False, notify_user=True, transaction_type='deposit').count()
            user_pending_loan_requests_amount = UserTransactions.objects.filter(user=user_instance, rejected=False, notify_user=True, transaction_type='borrow').count()
            user_pending_refunds_amount = UserTransactions.objects.filter(user=user_instance, rejected=False, notify_user=True, transaction_type='refund').count()           
            user_pending_withdrawal_amount = UserTransactions.objects.filter(user=user_instance, rejected=False, notify_user=True, transaction_type='withdrawal').count()

            numberOfUserNotifications = user_pending_deposits_amount + user_pending_loan_requests_amount + user_pending_refunds_amount + user_pending_withdrawal_amount

            return Response([{"result": "1", "success": "Success", "error": "", "numberOfUserNotifications": numberOfUserNotifications}])


# Rest Transactions History Class

class RestTransactionsHistoryClass(ListAPIView):
    serializer_class = UserTransactionsSerializer

    def get_queryset(self, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        history_type = self.request.GET.get('history_type', None)
        transaction_type = self.request.GET.get('transaction_type', None)
        requesting_user_type = self.request.GET.get('requesting_user_type', None)
        transaction_from_date = self.request.GET.get('transaction_from_date', None)
        transaction_to_date = self.request.GET.get('transaction_to_date', None)
        custom_search = self.request.GET.get('custom_search', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if history_type != None:
            history_type = history_type.strip()

        if transaction_type != None:
            transaction_type = transaction_type.strip()

        if requesting_user_type != None:
            requesting_user_type = requesting_user_type.strip()

        if transaction_from_date != None:
            transaction_from_date = transaction_from_date.strip()

        if transaction_to_date != None:
            transaction_to_date = transaction_to_date.strip()

        if custom_search != None:
            custom_search = custom_search.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            ids_of_the_transactions_to_return_list = list_transactions(user_instance, history_type, transaction_type, requesting_user_type, transaction_from_date, transaction_to_date, custom_search)

            queryset_list = UserTransactions.objects.all().filter(id__in=ids_of_the_transactions_to_return_list)

        return queryset_list


# Rest Acknowledge Transaction Class

class RestAcknowledgeTransactionClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        user_slug = self.request.GET.get('user_slug', None)
        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        mpesa_api_confirming = self.request.GET.get('mpesa_api_confirming', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        transaction_slug = self.request.GET.get('transaction_slug', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if transaction_slug != None:
            transaction_slug = transaction_slug.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            user_instance = SystemUser.objects.get(slug=user_slug)

            check_user_transaction = UserTransactions.objects.filter(user=user_instance, slug=transaction_slug, rejected=False, notify_user=True).count()
            if check_user_transaction == 0:
                return Response([{"result": "0", "success": "", "error": "Sorry, we couldn't find your transaction"}])
            else:
                UserTransactions.objects.filter(user=user_instance, slug=transaction_slug, rejected=False).update(notify_user=False, notify_loan_admin=False)

                return Response([{"result": "1", "success": "Transaction completed!", "error": ""}])


# Rest Verify Transactions Class

class RestVerifyTransactionsClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        transaction_slug = self.request.GET.get('transaction_slug', None)
        requested_transaction_type = self.request.GET.get('transaction_type', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if transaction_slug != None:
            transaction_slug = transaction_slug.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            test_loan_admin = SystemUser.objects.filter(slug=user_slug, is_admin=True).count()
            if test_loan_admin == 0:
                return Response([{"result": "0", "success": "", "error": "You are not allowed to perform this operation!"}])
            else:
                check_transaction = UserTransactions.objects.filter(slug=transaction_slug, rejected=False, verified=False).count()
                if check_transaction == 0:
                    return Response([{"result": "0", "success": "", "error": "Sorry, we couldn't find the transaction"}])
                else:
                    logged_user_instance = SystemUser.objects.get(slug=user_slug)

                    get_company_data = CompanyDetails.objects.all()
                    for company_data in get_company_data:
                        loanApp__tel = company_data.tel1
                        company_email = company_data.email
                        number_of_days_to_refund_loan = company_data.number_of_days_to_refund_loan
                        number_of_loan_payment_installments = company_data.number_of_loan_payment_installments

                    get_the_transaction_details = UserTransactions.objects.all().filter(slug=transaction_slug)
                    for transaction_data in get_the_transaction_details:
                        the_transaction_type = transaction_data.transaction_type
                        transaction_code = transaction_data.transaction_code
                        the_transaction_amount = transaction_data.transacted_amount
                        client_slug = transaction_data.user.slug
                        user_email = transaction_data.user.email
                        user_tel = transaction_data.user.tel1
                        current_loan_amount = transaction_data.user.current_loan_amount
                        current_amount_in_account = transaction_data.user.current_amount_in_account
                        loan_amount_given_to_client = transaction_data.user.loan_amount_given_to_client
                        loan_interest = transaction_data.user.loan_interest

                        if transaction_data.loan_record is None or transaction_data.loan_record == '':
                            loan_transaction_record_slug = ''                            
                        else:
                            loan_transaction_record_slug = transaction_data.loan_record.slug

                    if requested_transaction_type == 'reject':

                        if loan_transaction_record_slug != '':                            
                            LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_request_rejected=True, loan_request_rejected_on_date_time=today, loan_request_rejected_by=logged_user_instance)

                        UserTransactions.objects.filter(slug=transaction_slug, rejected=False, verified=False).update(notify_user=True, notify_loan_admin=False, rejected=True)
                        
                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' being payment of your loanApp loan has been confirmed.\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.')
                        
                        to_user_email = [user_email]
                        send_mail('My-Fedha loan request cancellation', 'Your loan request with the transaction code '+transaction_code+' has been rejected! Contact our customer care for more information.\nThank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha loan request cancellation', 'The loan request with the transaction code '+transaction_code+' has been rejected!',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        return Response([{"result": "1", "success": "Loan request rejected!", "error": ""}])

                    else:
                        UserTransactions.objects.filter(slug=transaction_slug, rejected=False, verified=False).update(verified=True, transaction_verified_on=today, transaction_verified_by=logged_user_instance, notify_user=True, notify_loan_admin=False)

                        if the_transaction_type == 'deposit':
                            new_amount_in_account = current_amount_in_account + the_transaction_amount
                            SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                            # text user

                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' has been confirmed.\nThank you for trusting loanApp .')
                         
                            # text loanApp

                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+'.')

                            to_user_email = [user_email]
                            send_mail('My-Fedha deposit confirmation', 'Your deposit with the transaction code '+transaction_code+' has been confirmed.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                            to_company_email = ['myfedha2019@gmail.com']
                            send_mail('My-Fedha deposit confirmation', 'You have confirmed the deposit with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        elif the_transaction_type == 'withdrawal':
                            new_amount_in_account = current_amount_in_account - the_transaction_amount
                            SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                            # text user

                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                         
                            # text loanApp

                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.')

                            to_user_email = [user_email]
                            send_mail('My-Fedha withdrawal confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                            to_company_email = ['myfedha2019@gmail.com']
                            send_mail('My-Fedha withdrawal confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        elif the_transaction_type == 'borrow':

                            loan_due_date = today + timedelta(days=number_of_days_to_refund_loan)

                            next_payment_timedelta = number_of_days_to_refund_loan/number_of_loan_payment_installments

                            loan_next_refund_due_date = today + timedelta(days=int(number_of_loan_payment_installments))

                            new_loan_amount = current_loan_amount + the_transaction_amount

                            if loan_transaction_record_slug != '':
                                logged_user_instance = SystemUser.objects.get(slug=user_slug)
                                LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_granted=True, granted_on_date_time=today, granted_by=logged_user_instance, loan_due_date=loan_due_date)

                            SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount, loan_amount_given_to_client=loan_amount_given_to_client, loan_interest=loan_interest, loan_next_refund_due_date=loan_next_refund_due_date, loan_due_date=loan_due_date)

                            # text user

                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                         
                            # text loanApp

                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.')


                            to_user_email = [user_email]
                            send_mail('My-Fedha loan confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                            to_company_email = ['myfedha2019@gmail.com']
                            send_mail('My-Fedha loan confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        elif the_transaction_type == 'refund':

                            new_loan_amount = current_loan_amount - the_transaction_amount

                            if new_loan_amount < 0:
                                new_amount_in_account = current_amount_in_account - new_loan_amount
                                SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                                new_loan_amount = 0

                            SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount)

                            if loan_transaction_record_slug != '':                                
                                get_loan_details = LoansRecord.objects.all().filter(slug=loan_transaction_record_slug)
                                for loan_data in get_loan_details:
                                    loan_amount_taken = loan_data.amount_taken
                                    loan_cumulative_interest = loan_data.cumulative_interest

                                total_to_pay = loan_amount_taken+loan_cumulative_interest
                                current_amount_refunded = total_to_pay-new_loan_amount
                                
                                LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(amount_remained_to_refund=new_loan_amount, current_amount_refunded=current_amount_refunded)

                                logged_user_instance = SystemUser.objects.get(slug=user_slug)
                                if new_loan_amount < 0 or new_loan_amount == 0:
                                    LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_refunded=True, refund_completed_on_date_time=today, refund_verified_by=logged_user_instance)


                            # text user

                            # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' being payment of your loanApp loan has been confirmed.\nThank you for trusting loanApp .')
                         
                            # text loanApp

                            # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.')
                            
                            to_user_email = [user_email]
                            send_mail('My-Fedha loan refund confirmation', 'Your deposit with the transaction code '+transaction_code+' being payment of your My-Fedha loan has been confirmed.\nThank you for trusting My-Fedha.',
                                          settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                            to_company_email = ['myfedha2019@gmail.com']
                            send_mail('My-Fedha loan refund confirmation', 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.',
                                          settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                        else:
                            UserTransactions.objects.filter(slug=transaction_slug, rejected=False, verified=False).update(verified=False, notify_user=True, notify_loan_admin=True)

                        
                        return Response([{"result": "1", "success": "Transaction verified!", "error": ""}])


# Rest MPesa Transaction Confirmation Class

class RestMPesaTransactionConfirmationClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        transaction_slug = self.request.GET.get('transaction_slug', None)

        if transaction_slug != None:
            transaction_slug = transaction_slug.strip()

        response = request.data

        try:
            data = response.get('Body', {}).get('stkCallback', {})
            result_code = data.get('ResultCode', '')
            ResultDesc = data.get('ResultDesc', '')

            if result_code == 0 or result_code == '0':
                data_item = data.get('CallbackMetadata', {})

                for mpesa_item_data in data_item['Item']:
                    if 'Value' in mpesa_item_data:
                        if mpesa_item_data['Name'] == 'Amount':
                            transacted_amount = mpesa_item_data['Value']
                        elif mpesa_item_data['Name'] == 'MpesaReceiptNumber':
                            mpesa_transaction_code = mpesa_item_data['Value']
                        elif mpesa_item_data['Name'] == 'TransactionDate':
                            mpesa_transaction_timestamp = mpesa_item_data['Value']
                        elif mpesa_item_data['Name'] == 'PhoneNumber':
                            mpesa_used_number = mpesa_item_data['Value']
                        else:
                            pass

                check_transaction = UserTransactions.objects.filter(slug=transaction_slug).count()
                if check_transaction == 0:
                    return Response([{"result": "0", "success": "", "error": "Sorry, we couldn't find the transaction"}])
                else:
                    get_company_data = CompanyDetails.objects.all()
                    for company_data in get_company_data:
                        loanApp__tel = company_data.tel1
                        company_email = company_data.email
                        number_of_days_to_refund_loan = company_data.number_of_days_to_refund_loan
                        number_of_loan_payment_installments = company_data.number_of_loan_payment_installments

                    get_the_transaction_details = UserTransactions.objects.all().filter(slug=transaction_slug)
                    for transaction_data in get_the_transaction_details:
                        account_product_name = transaction_data.transaction_from_account.transaction_from_account
                        the_transaction_type = transaction_data.transaction_type
                        transaction_code = transaction_data.transaction_code
                        the_transaction_amount = transaction_data.transacted_amount
                        client_slug = transaction_data.user.slug
                        user_email = transaction_data.user.email
                        user_tel = transaction_data.user.tel1
                        current_loan_amount = transaction_data.user.current_loan_amount
                        current_amount_in_account = transaction_data.user.current_amount_in_account
                        loan_amount_given_to_client = transaction_data.user.loan_amount_given_to_client
                        loan_interest = transaction_data.user.loan_interest

                        if transaction_data.loan_record != None:
                            loan_transaction_record_slug = transaction_data.loan_record.slug
                        else:
                            loan_transaction_record_slug = ''


                    UserTransactions.objects.filter(slug=transaction_slug).update(verified=True, transaction_verified_on=today, transaction_confirmed_by_mpesa_api=True, amount_transacted_in_mpesa=int(transacted_amount), mpesa_transaction_code=mpesa_transaction_code, mpesa_transaction_timestamp=int(mpesa_transaction_timestamp), number_used_for_mpesa_transaction=mpesa_used_number, notify_user=True, notify_loan_admin=False)

                    if the_transaction_type == 'deposit':
                        new_amount_in_account = current_amount_in_account + the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit to the account '+account_product_name+' through Mpesa has been successful.\n Transaction code '+transaction_code+'\nM.Pesa code: '+mpesa_transaction_code+'\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'A transaction of KES '+str(transacted_amount)+' has been made. Transaction code '+transaction_code+'\nM.Pesa code: '+mpesa_transaction_code+'')

                        to_user_email = [user_email]
                        send_mail('My-Fedha deposit confirmation', 'Your deposit to the account '+account_product_name+' through Mpesa has been successful.\n Transaction code '+transaction_code+'\nM.Pesa code: '+mpesa_transaction_code+'\nThank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('A transaction of KES '+str(transacted_amount)+' has been made. Transaction code '+transaction_code+'\nM.Pesa code: '+mpesa_transaction_code+'',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'withdrawal':
                        new_amount_in_account = current_amount_in_account - the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.')

                        to_user_email = [user_email]
                        send_mail('My-Fedha withdrawal confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your request of withdrawal with the code '+transaction_code+'.\nThank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha withdrawal confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the withdrawal request with the code '+transaction_code+'.',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'borrow':

                        loan_due_date = today + timedelta(days=number_of_days_to_refund_loan)

                        next_payment_timedelta = number_of_days_to_refund_loan/number_of_loan_payment_installments

                        loan_next_refund_due_date = today + timedelta(days=int(number_of_loan_payment_installments))

                        if loan_transaction_record_slug != '':
                            logged_user_instance = SystemUser.objects.get(slug=user_slug)
                            LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_granted=True, granted_on_date_time=today, granted_by=logged_user_instance, loan_due_date=loan_due_date)

                        new_loan_amount = current_loan_amount + the_transaction_amount
                        SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount, loan_amount_given_to_client=loan_amount_given_to_client, loan_interest=loan_interest, loan_next_refund_due_date=loan_next_refund_due_date, loan_due_date=loan_due_date)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'loanApp  has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.')


                        to_user_email = [user_email]
                        send_mail('My-Fedha loan confirmation', 'My-Fedha has confirmed the transfer of KES '+str(the_transaction_amount)+' to your account following your loan request of with the code '+transaction_code+'.\nThank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha loan confirmation', 'You have confirmed the transfer of KES '+str(the_transaction_amount)+' to satisfy the loan request with the code '+transaction_code+'.',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    elif the_transaction_type == 'refund':

                        new_loan_amount = current_loan_amount - the_transaction_amount

                        if new_loan_amount < 0:
                            new_amount_in_account = current_amount_in_account - new_loan_amount
                            SystemUser.objects.filter(slug=client_slug).update(current_amount_in_account=new_amount_in_account)

                            new_loan_amount = 0

                        if loan_transaction_record_slug != '':
                            get_loan_details = LoansRecord.objects.all().filter(slug=loan_transaction_record_slug)
                            for loan_data in get_loan_details:
                                loan_amount_taken = loan_data.amount_taken
                                loan_cumulative_interest = loan_data.cumulative_interest

                            total_to_pay = loan_amount_taken+loan_cumulative_interest
                            current_amount_refunded = total_to_pay-new_loan_amount
                            
                            LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(amount_remained_to_refund=new_loan_amount, current_amount_refunded=current_amount_refunded)

                            logged_user_instance = SystemUser.objects.get(slug=user_slug)
                            if new_loan_amount < 0 or new_loan_amount == 0:
                                LoansRecord.objects.filter(slug=loan_transaction_record_slug).update(loan_refunded=True, refund_completed_on_date_time=today, refund_verified_by=logged_user_instance)

                        SystemUser.objects.filter(slug=client_slug).update(current_loan_amount=new_loan_amount)

                        # text user

                        # sms_sent, message_sid = send_twilio_sms(user_tel, 'Your deposit with the transaction code '+transaction_code+' being payment of your loanApp loan has been confirmed.\nThank you for trusting loanApp .')
                     
                        # text loanApp

                        # sms_sent, message_sid = send_twilio_sms(loanApp__tel, 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.')
                        
                        to_user_email = [user_email]
                        send_mail('My-Fedha loan refund confirmation', 'Your deposit with the transaction code '+transaction_code+' being payment of your My-Fedha loan has been confirmed.\nThank you for trusting My-Fedha.',
                                      settings.EMAIL_HOST_USER, to_user_email, fail_silently=True)

                        to_company_email = ['myfedha2019@gmail.com']
                        send_mail('My-Fedha loan refund confirmation', 'You have confirmed the deposit with the code '+transaction_code+' being payment of a loan.',
                                      settings.EMAIL_HOST_USER, to_company_email, fail_silently=True)

                    else:
                        UserTransactions.objects.filter(slug=transaction_slug, rejected=False, verified=False).update(verified=False, notify_user=True, notify_loan_admin=True)

                    return Response([{"result": "1", "success": "Transaction verified!", "error": ""}])

        except Exception as ex:            
            raise ValueError(str(ex))
            return Response([{"result": "0", "success": "", "error": "M.Pesa error"}])

# Rest User Details Class

class RestUserDetailsClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        firebase_id = self.request.GET.get('firebase_id', None)
        current_token = self.request.GET.get('current_token', None)
        user_slug = self.request.GET.get('user_slug', None)
        currently_suggested_token = self.request.GET.get('suggested_token', None)
        user_to_view_slug = self.request.GET.get('user_to_view_slug', None)

        if firebase_id != None:
            firebase_id = firebase_id.strip()

        if current_token != None:
            current_token = current_token.strip()

        if user_slug != None:
            user_slug = user_slug.strip()

        if currently_suggested_token != None:
            currently_suggested_token = currently_suggested_token.strip()

        if user_to_view_slug != None:
            user_to_view_slug = user_to_view_slug.strip()

        login_test, message = test_login(user_slug, firebase_id, current_token, currently_suggested_token)

        if login_test == '0':
            return Response([{"result": "0", "success": "", "error": message}])
        else:
            test_loan_admin = SystemUser.objects.filter(slug=user_slug, is_admin=True).count()
            if test_loan_admin == 0:
                get_user_to_view_data = SystemUser.objects.all().filter(slug=user_slug, deleted=False)
            else:
                check_user_to_view = SystemUser.objects.filter(slug=user_to_view_slug, deleted=False).count()
                if check_user_to_view == 0:
                    return Response([{"result": "0", "success": "", "error": "Sorry, we couldn't find the user you are requesting."}])
                else:
                    get_user_to_view_data = SystemUser.objects.all().filter(slug=user_to_view_slug)

            for user_to_view_data in get_user_to_view_data:
                firebase_id = user_to_view_data.firebase_id
                first_name = user_to_view_data.first_name
                middle_name = user_to_view_data.middle_name
                last_name = user_to_view_data.last_name
                sex = user_to_view_data.sex.gender
                dob = user_to_view_data.dob
                profession = user_to_view_data.profession
                town = user_to_view_data.town.town_name
                profile_image_url = user_to_view_data.profile_image_url
                id_copy_url = user_to_view_data.id_copy_url
                id_number = user_to_view_data.id_number
                email = user_to_view_data.email
                tel1 = user_to_view_data.tel1
                tel2 = user_to_view_data.tel2
                address = user_to_view_data.address
                is_admin = user_to_view_data.is_admin
                is_employee = user_to_view_data.is_employee
                rating = user_to_view_data.rating
                facebook_profile_link = user_to_view_data.facebook_profile_link
                linkedin_profile_link = user_to_view_data.linkedin_profile_link
                twitter_profile_link = user_to_view_data.twitter_profile_link
                active = user_to_view_data.active
                cleared_for_loan = user_to_view_data.cleared_for_loan
                cleared_for_loan_on_date_time = user_to_view_data.cleared_for_loan_on_date_time
                started_deposit_on_datetime = user_to_view_data.started_deposit_on_datetime
                account_verified = user_to_view_data.account_verified
                account_verified_on_date_time = user_to_view_data.account_verified_on_date_time
                loan_limit = user_to_view_data.loan_limit
                current_loan_amount = user_to_view_data.current_loan_amount
                loan_next_refund_due_date = user_to_view_data.loan_next_refund_due_date                
                loan_due_date = user_to_view_data.loan_due_date
                current_amount_in_account = user_to_view_data.current_amount_in_account
                added_on_date = user_to_view_data.added_on_date
                slug = user_to_view_data.slug

            return Response([{"result": "1", "success": "Transaction verified!", "error": "", "firebase_id": firebase_id, "first_name": first_name, 
                "middle_name": middle_name, "last_name": last_name, "sex": sex, "dob": dob, "profession": profession, "town": town, "email": email,
                "profile_image_url": profile_image_url, "id_copy_url": id_copy_url, "id_number": id_number, "tel1": tel1, "tel2": tel2, "address": address,
                "is_admin": is_admin, "is_employee": is_employee, "rating": rating, "facebook_profile_link": facebook_profile_link, "linkedin_profile_link": linkedin_profile_link, 
                "twitter_profile_link": twitter_profile_link, "active": active, "cleared_for_loan": cleared_for_loan, "cleared_for_loan_on_date_time": cleared_for_loan_on_date_time, 
                "started_deposit_on_datetime": started_deposit_on_datetime, "account_verified": account_verified, "account_verified_on_date_time": account_verified_on_date_time, 
                "loan_limit": loan_limit, "current_loan_amount": current_loan_amount, "loan_next_refund_due_date": loan_next_refund_due_date, "loan_due_date": loan_due_date, 
                "current_amount_in_account": current_amount_in_account, "added_on_date": added_on_date, "slug": slug }])




# Rest Check Loan Data Class

class RestCheckLoanDataClass(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):

        today = datetime.now().date()

        amount = self.request.GET.get('amount', None)

        if amount != None:
            amount = amount.strip()

        amount_is_int = test_int(amount)
        if amount_is_int == '0':
            return Response([{"result": "0", "success": "", "error": "Please input the amount as an integer!", "loan_to_give_out": "0", "loan_interest": "0"}])
        else:
            get_company_data = CompanyDetails.objects.all()
            for company_data in get_company_data:
                loan_interest_percentage = company_data.loan_interest_percentage

            loan_interest, amount_to_give = compute_loan_interest(int(amount), loan_interest_percentage)

            return Response([{"result": "1", "success": "Success", "error": "", "loan_to_give_out": str(amount_to_give), "loan_interest": str(loan_interest)}])