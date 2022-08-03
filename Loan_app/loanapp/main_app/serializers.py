# from drf_extra_fields.fields import Base64ImageField
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import (UserTransactions, SystemUser, UserAccounts, ServiceCategories, 
    OurServices)

# System users

class SystemUserSerializer(ModelSerializer):
    official_designation = serializers.CharField(source='official_designation.designation')
    marital_status = serializers.CharField(source='marital_status.status')
    sex = serializers.CharField(source='sex.gender')
    user_position_at_loanApp = serializers.CharField(source='position_at_loanApp.title')
    user_position_at_loanApp_description = serializers.CharField(source='position_at_loanApp.description')
    user_position_at_loanApp_location = serializers.CharField(source='position_at_loanApp.location')
    user_position_at_loanApp_advertised = serializers.CharField(source='position_at_loanApp.advertised')
    user_position_at_loanApp_position_to_be_filled_on_date = serializers.CharField(source='position_at_loanApp.position_to_be_filled_on_date')
    user_position_at_loanApp_ddepartment = serializers.CharField(source='position_at_loanApp.department.title')
    user_position_at_loanApp_ddepartment_description = serializers.CharField(source='position_at_loanApp.department.description')
    user_position_at_loanApp_slug = serializers.CharField(source='position_at_loanApp.slug')
    user_access_level = serializers.CharField(source='access_level.name')
    user_access_level_tag = serializers.CharField(source='access_level.tag')
    user_town_name = serializers.CharField(source='town.town_name')
    user_town_code = serializers.CharField(source='town.town_code')
    user_next_of_kin_town_name = serializers.CharField(source='next_of_kin_town.town_name')
    user_next_of_kin_town_code = serializers.CharField(source='next_of_kin_town.town_code')

    class Meta:
        model = SystemUser
        fields = [
            "official_designation",
            "firebase_id",
            "first_name",
            "middle_name",
            "last_name",
            "sex",
            "dob",
            "profession",
            "user_town_name",
            "user_town_code",
            "profile_image_url",
            "id_copy_url",
            "id_number",
            "kra_pin",
            "email",
            "tel1",
            "tel2",
            "address",
            "employer",
            "employer_address",
            "terms_of_service",
            "contract_ending_date",
            "marital_status",
            "user_position_at_loanApp",
            "user_position_at_loanApp_description",
            "user_position_at_loanApp_location",
            "user_position_at_loanApp_advertised",
            "user_position_at_loanApp_position_to_be_filled_on_date",
            "user_position_at_loanApp_ddepartment",
            "user_position_at_loanApp_ddepartment_description",
            "user_position_at_loanApp_slug",
            "user_access_level",
            "user_access_level_tag",
            "next_of_kin_full_name",
            "next_of_kin_date_of_birth",
            "next_of_kin_relationship",
            "next_of_kin_tel",
            "next_of_kin_id_number",
            "next_of_kin_address",
            "next_of_kin_email",
            "user_next_of_kin_town_name",
            "user_next_of_kin_town_code",
            "bank_name",
            "bank_branch_name",
            "bank_account_number",
            "physical_membership_registration_form",
            "is_admin",
            "is_employee",
            "rating",
            "facebook_profile_link",
            "linkedin_profile_link",
            "twitter_profile_link",
            "active",
            "membership_account_approved",
            "cleared_for_loan",
            "cleared_for_loan_on_date_time",
            "started_deposit_on_datetime",
            "account_verified",
            "account_verified_on_date_time",
            "loan_limit",
            "current_loan_amount",
            "loan_interest",
            "registered_for_newsletter",
            "loan_next_refund_due_date",
            "loan_due_date",
            "current_amount_in_account",
            "loan_amount_given_to_client",
            "added_on_date",
            "slug",
        ]


# transactions

class UserTransactionsSerializer(ModelSerializer):
    client_firebase_id = serializers.CharField(source='user.firebase_id')
    client_first_name = serializers.CharField(source='user.first_name')
    client_middle_name = serializers.CharField(source='user.middle_name')
    client_last_name = serializers.CharField(source='user.last_name')
    client_profile_image_url = serializers.CharField(source='user.profile_image_url')
    client_email = serializers.CharField(source='user.email')
    client_tel1 = serializers.CharField(source='user.tel1')
    client_tel2 = serializers.CharField(source='user.tel2')
    client_slug = serializers.CharField(source='user.slug')
    # account_code = serializers.CharField(source='transaction_from_account.account_code')
    # current_amount_in_account = serializers.CharField(source='transaction_from_account.amount_in_account')
    # account_is_active = serializers.CharField(source='transaction_from_account.active')
    # account_slug = serializers.CharField(source='transaction_from_account.slug')
    # account_product_type_name = serializers.CharField(source='transaction_from_account.product.service_type.name')
    # account_product_type_slug = serializers.CharField(source='transaction_from_account.product.service_type.slug')
    # account_product_name = serializers.CharField(source='transaction_from_account.product.title')
    # account_product_short_details = serializers.CharField(source='transaction_from_account.product.short_details')
    # account_product_description = serializers.CharField(source='transaction_from_account.product.description')
    # account_product_image = serializers.CharField(source='transaction_from_account.product.service_image')
    # account_product_is_active = serializers.CharField(source='transaction_from_account.product.active')
    # account_product_slug = serializers.CharField(source='transaction_from_account.product.slug')

    class Meta:
        model = UserTransactions
        fields = [
            "client_firebase_id",
            "client_first_name",
            "client_middle_name",
            "client_last_name",
            "client_profile_image_url",
            "client_email",
            "client_tel1",
            "client_tel2",
            "client_slug",            
            # "account_code",
            # "current_amount_in_account",
            # "account_is_active",
            # "account_slug",
            # "account_product_type_name",
            # "account_product_type_slug",
            # "account_product_name",
            # "account_product_short_details",
            # "account_product_description",
            # "account_product_image",
            # "account_product_is_active",
            # "account_product_slug",
            "transaction_code",
            "transaction_type",
            "used_payment_method",
            "transacted_amount",
            "used_paybill_number",
            "description",
            "notify_user",
            "notify_loan_admin",
            "verified",
            "transaction_verified_on",
            "rejected",
            "transaction_rejected_on",
            "slug",
            "transaction_carried_out_on_date_time",
        ]


# User Accounts

class UserAccountsSerializer(ModelSerializer):
    client_firebase_id = serializers.CharField(source='user.firebase_id')
    client_first_name = serializers.CharField(source='user.first_name')
    client_middle_name = serializers.CharField(source='user.middle_name')
    client_last_name = serializers.CharField(source='user.last_name')
    client_profile_image_url = serializers.CharField(source='user.profile_image_url')
    client_email = serializers.CharField(source='user.email')
    client_tel1 = serializers.CharField(source='user.tel1')
    client_tel2 = serializers.CharField(source='user.tel2')
    client_slug = serializers.CharField(source='user.slug')
    account_is_active = serializers.CharField(source='product.active')
    account_slug = serializers.CharField(source='product.slug')
    account_product_type_name = serializers.CharField(source='product.service_type.name')
    account_product_type_slug = serializers.CharField(source='product.service_type.slug')
    account_product_name = serializers.CharField(source='product.title')
    account_product_short_details = serializers.CharField(source='product.short_details')
    account_product_description = serializers.CharField(source='product.description')
    account_product_image = serializers.CharField(source='product.service_image')
    account_product_is_active = serializers.CharField(source='product.active')
    account_product_slug = serializers.CharField(source='product.slug')

    class Meta:
        model = UserAccounts
        fields = [
            "client_firebase_id",
            "client_first_name",
            "client_middle_name",
            "client_last_name",
            "client_profile_image_url",
            "client_email",
            "client_tel1",
            "client_tel2",
            "client_slug",
            "account_is_active",
            "account_slug",
            "account_product_type_name",
            "account_product_type_slug",
            "account_product_name",
            "account_product_short_details",
            "account_product_description",
            "account_product_image",
            "account_product_is_active",
            "account_product_slug",
            "account_code",
            "amount_in_account",
            "active",
            "account_added_on_date_time",
            "slug",
        ]


# Products

class ProductsSerializer(ModelSerializer):
    product_type_name = serializers.CharField(source='service_type.name')
    product_type_slug = serializers.CharField(source='service_type.slug')
    
    class Meta:
        model = OurServices
        fields = [
            "product_type_name",
            "product_type_slug",
            "title",
            "service_fa_icon_name",
            "short_details",
            "description",
            "order",
            "service_image",
            "added_on_date_time",
            "slug",
        ]

