from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings
from main_app.views import *

app_name='main_app'

urlpatterns = [
    url(r'^$', home_view, name='HomeName'),
    url(r'^loans_report/', loans_report_view, name='LoanReportName'),
    url(r'^users_report/', users_report_view, name='UsersReportName'),
    url(r'^authentication/', authentication_view, name='AuthenticationName'),
    url(r'^login/', login_view, name='LoginName'),
    url(r'^user_profile/(?P<user_slug>.+)/', user_profile_view, name='UserProfileName'),
    url(r'^update_user_profile/(?P<user_slug>.+)/', update_user_profile_view, name='UpdateUserProfileName'),
    url(r'^manage_employees/(?P<user_slug>.+)/(?P<action>.+)/', manage_employees_view, name='ManageEmployeesName'),


    url(r'^organization_details/(?P<organization_slug>.+)/', organization_details_view, name='OrganizationDetailsName'),
    url(r'^logout/', logout_view, name='LogoutName'),
    url(r'^company_overview/', company_overview_view, name='CompanyOverviewName'),
    url(r'^company_history/', company_history_view, name='CompanyHistoryName'),
    url(r'^careers/', careers_view, name='CareersName'),
    url(r'^msacco/', msacco_view, name='MsaccoName'),
    url(r'^resources/', resources_view, name='ResourcesName'),
    url(r'^membership/', membership_view, name='MembershipName'),
    url(r'^product_details/', product_details_view, name='ProductDetailsName'),
    url(r'^tenders_list/', tenders_list_view, name='TendersListName'),
    url(r'^tender_details/(?P<tender_slug>.+)/', tender_details_view, name='TenderDetailsName'),
    url(r'^news/', news_view, name='NewsName'),
    url(r'^news_details/(?P<news_slug>.+)/', news_details_view, name='NewsDetailsName'),
    url(r'^blog/', blog_view, name='BlogName'),
    url(r'^blog_article/(?P<article_slug>.+)/', blog_article_view, name='BlogArticleName'),
    url(r'^gallery/', gallery_view, name='GalleryName'),
    url(r'^contact/', contact_view, name='ContactName'),
    url(r'^administration/', administration_view, name='AdministrationName'),
    url(r'^sitemap/', sitemap_view, name='sitemapName'),    
    
    url(r'^rest_test_app_version/', RestTestAppVersionClass.as_view(), name='RestTestAppVersionName'),
    url(r'^rest_test_login_user/', RestTestLoginUserClass.as_view(), name='RestTestLoginUserName'),
    url(r'^rest_user_registration/', RestUserRegistrationClass.as_view(), name='RestUserRegistrationName'),
    url(r'^rest_authentication/', RestAuthenticationClass.as_view(), name='RestAuthenticationName'),
    url(r'^rest_get_products_list/', RestGetProductsListClass.as_view(), name='RestGetProductsListName'),
    url(r'^rest_get_user_urgent_action/', RestGetUserUrgentActionClass.as_view(), name='RestGetUserUrgentActionName'),
    url(r'^rest_register_user_for_products/', RestRegisterUserForProductsClass.as_view(), name='RestRegisterUserForProductsName'),
    url(r'^rest_get_user_account_details/', RestGetUserAccountDetailsClass.as_view(), name='RestGetUserAccountDetailsName'),
    url(r'^rest_get_user_accounts_list/', RestGetUserAccountsListClass.as_view(), name='RestGetUserAccountsListName'),
    url(r'^rest_make_deposit/', RestMakeDepositClass.as_view(), name='RestMakeDepositName'),
    url(r'^rest_request_withdrawal/', RestRequestWithdrawalClass.as_view(), name='RestRequestWithdrawalName'),
    url(r'^rest_loan_request/', RestLoanRequestClass.as_view(), name='RestLoanRequestName'),
    url(r'^rest_refund_loan/', RestRefundLoanClass.as_view(), name='RestRefundLoanName'),
    url(r'^rest_get_user_number_of_notifications/', RestUserNumberOfNotificationsClass.as_view(), name='RestUserNumberOfNotificationsName'),
    url(r'^rest_get_transactions_history/', RestTransactionsHistoryClass.as_view(), name='RestTransactionsHistoryName'),
    url(r'^rest_acknowledge_transaction/', RestAcknowledgeTransactionClass.as_view(), name='RestAcknowledgeTransactionName'),
    url(r'^rest_verify_transactions/', RestVerifyTransactionsClass.as_view(), name='RestVerifyTransactionsName'),
    url(r'^rest_mpesa_transaction_confirmation/', RestMPesaTransactionConfirmationClass.as_view(), name='RestMPesaTransactionConfirmationName'),
    url(r'^rest_user_details/', RestUserDetailsClass.as_view(), name='RestUserDetailsName'),
    url(r'^rest_check_loan_data/', RestCheckLoanDataClass.as_view(), name='RestCheckLoanDataName'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

