import hashlib
import random
import time
import requests
import base64
from datetime import datetime, time, timedelta
from twilio.rest import Client, TwilioRestClient
# get server timezone
from requests.auth import HTTPBasicAuth
from .models import (AccessLevel, Right, AccessLevelRight, SystemUser, LoginTokens, PasswordReset, CompanyDetails, 
    UserTransactions, Gender, PersonOfficialDesignation, MaritalStatus, Department, Position, UserAccounts, LoansRecord)

def get_local_timezone():
    if time.daylight:
        offset_hour = time.altzone / 3600
    else:
        offset_hour = time.timezone / 3600

    return offset_hour


# get server timezone

def add_remove_days_to_date(start_date, days_to_add):
    needed_date = start_date + timedelta(days=int(days_to_add))

    return needed_date


# get server timezone

def test_int(integer):
    try:
        int(integer)
        result = '1'
    except Exception as e:
        result = '0'

    return result


# configure system

def configure_system():
    
    check_none_sex = Gender.objects.filter(slug='none')
    if check_none_sex == 0:
        Gender.objects.create(gender='none', slug='none')

    check_none_official_designation = PersonOfficialDesignation.objects.filter(slug='none')
    if check_none_official_designation == 0:
        PersonOfficialDesignation.objects.create(designation='none', slug='none')

    check_none_marital_status = MaritalStatus.objects.filter(slug='none')
    if check_none_marital_status == 0:
        MaritalStatus.objects.create(status='none', slug='none')

    check_none_department = Department.objects.filter(slug='none')
    if check_none_department == 0:
        Department.objects.create(title='none', description='none', slug='none')

    check_none_position = Position.objects.filter(slug='none')
    if check_none_position == 0:
        none_position_instance = Position.objects.filter(slug='none')
        Position.objects.create(title='none', description='none', department=none_position_instance, location='none', slug='none')

    check_none_access_level = AccessLevel.objects.filter(slug='none')
    if check_none_access_level == 0:
        AccessLevel.objects.create(name='none', tag='none', slug='none')

    check_none_user = SystemUser.objects.filter(slug='none')
    if check_none_user == 0:
        none_official_designation_instance = PersonOfficialDesignation.objects.get(slug='none')
        none_marital_status_instance = MaritalStatus.objects.get(slug='none')
        none_sex_instance = Gender.objects.get(slug='none')
        none_position_instance = Position.objects.get(slug='none')
        none_access_level_instance = AccessLevel.objects.get(slug='none')

        get_lattest_town_data = Town.objects.all().order_by('-id')[:1]
        for lattest_town_data in get_lattest_town_data:
            lattest_town_slug = lattest_town_data.slug

        lattest_town_instance = Town.objects.get(slug=lattest_town_slug)

        SystemUser.objects.create(sex=none_sex_instance, town=lattest_town_instance, next_of_kin_town=lattest_town_instance, access_level=none_access_level_instance, position_at_loanApp=none_position_instance, official_designation=none_official_designation_instance, marital_status=none_marital_status_instance, slug='none')

    return True

# check loan defaulters

def track_loan_defaulters():

    today = datetime.now().date()

    get_current_loans = LoansRecord.objects.all().filter(loan_granted=True, loan_refunded=False, loan_request_rejected=False)
    for current_loans_data in get_current_loans:        
        current_loan_slug = current_loans_data.slug
        current_loan_due_date = current_loans_data.loan_due_date

        if current_loan_due_date != None:
            if current_loan_due_date < today:

                today_date_ready_for_difference = datetime.strptime(str(today), "%Y-%m-%d")
                current_loan_due_date_ready_for_difference = datetime.strptime(str(started_deposit_on_datetime), "%Y-%m-%d")

                number_of_defaulted_days = (today_date_ready_for_difference - current_loan_due_date_ready_for_difference).days

                LoansRecord.objects.filter(slug=current_loan_slug).update(defaulted=True, defaulted_for_number_of_days=number_of_defaulted_days)

    return True



# check safaricom number

def check_safaricom_phone_number(number):
    safaricom_prefixes = []

    safaricom_prefixes.append('0701')
    safaricom_prefixes.append('0702')
    safaricom_prefixes.append('0703')
    safaricom_prefixes.append('0704')
    safaricom_prefixes.append('0705')
    safaricom_prefixes.append('0706')
    safaricom_prefixes.append('0707')
    safaricom_prefixes.append('0708')
    safaricom_prefixes.append('0709')
    safaricom_prefixes.append('0710')
    safaricom_prefixes.append('0711')
    safaricom_prefixes.append('0712')
    safaricom_prefixes.append('0713')
    safaricom_prefixes.append('0714')
    safaricom_prefixes.append('0715')
    safaricom_prefixes.append('0716')
    safaricom_prefixes.append('0717')
    safaricom_prefixes.append('0718')
    safaricom_prefixes.append('0719')
    safaricom_prefixes.append('0720')
    safaricom_prefixes.append('0721')
    safaricom_prefixes.append('0722')
    safaricom_prefixes.append('0723')
    safaricom_prefixes.append('0724')
    safaricom_prefixes.append('0725')
    safaricom_prefixes.append('0726')
    safaricom_prefixes.append('0727')
    safaricom_prefixes.append('0728')
    safaricom_prefixes.append('0729')



    safaricom_prefixes.append('701')
    safaricom_prefixes.append('702')
    safaricom_prefixes.append('703')
    safaricom_prefixes.append('704')
    safaricom_prefixes.append('705')
    safaricom_prefixes.append('706')
    safaricom_prefixes.append('707')
    safaricom_prefixes.append('708')
    safaricom_prefixes.append('709')
    safaricom_prefixes.append('710')
    safaricom_prefixes.append('711')
    safaricom_prefixes.append('712')
    safaricom_prefixes.append('713')
    safaricom_prefixes.append('714')
    safaricom_prefixes.append('715')
    safaricom_prefixes.append('716')
    safaricom_prefixes.append('717')
    safaricom_prefixes.append('718')
    safaricom_prefixes.append('719')
    safaricom_prefixes.append('720')
    safaricom_prefixes.append('721')
    safaricom_prefixes.append('722')
    safaricom_prefixes.append('723')
    safaricom_prefixes.append('724')
    safaricom_prefixes.append('725')
    safaricom_prefixes.append('726')
    safaricom_prefixes.append('727')
    safaricom_prefixes.append('728')
    safaricom_prefixes.append('729')


    safaricom_prefixes.append('+254701')
    safaricom_prefixes.append('+254702')
    safaricom_prefixes.append('+254703')
    safaricom_prefixes.append('+254704')
    safaricom_prefixes.append('+254705')
    safaricom_prefixes.append('+254706')
    safaricom_prefixes.append('+254707')
    safaricom_prefixes.append('+254708')
    safaricom_prefixes.append('+254709')
    safaricom_prefixes.append('+254710')
    safaricom_prefixes.append('+254711')
    safaricom_prefixes.append('+254712')
    safaricom_prefixes.append('+254713')
    safaricom_prefixes.append('+254714')
    safaricom_prefixes.append('+254715')
    safaricom_prefixes.append('+254716')
    safaricom_prefixes.append('+254717')
    safaricom_prefixes.append('+254718')
    safaricom_prefixes.append('+254719')
    safaricom_prefixes.append('+254720')
    safaricom_prefixes.append('+254721')
    safaricom_prefixes.append('+254722')
    safaricom_prefixes.append('+254723')
    safaricom_prefixes.append('+254724')
    safaricom_prefixes.append('+254725')
    safaricom_prefixes.append('+254726')
    safaricom_prefixes.append('+254727')
    safaricom_prefixes.append('+254728')
    safaricom_prefixes.append('+254729')

    safaricom_prefixes.append('254701')
    safaricom_prefixes.append('254702')
    safaricom_prefixes.append('254703')
    safaricom_prefixes.append('254704')
    safaricom_prefixes.append('254705')
    safaricom_prefixes.append('254706')
    safaricom_prefixes.append('254707')
    safaricom_prefixes.append('254708')
    safaricom_prefixes.append('254709')
    safaricom_prefixes.append('254710')
    safaricom_prefixes.append('254711')
    safaricom_prefixes.append('254712')
    safaricom_prefixes.append('254713')
    safaricom_prefixes.append('254714')
    safaricom_prefixes.append('254715')
    safaricom_prefixes.append('254716')
    safaricom_prefixes.append('254717')
    safaricom_prefixes.append('254718')
    safaricom_prefixes.append('254719')
    safaricom_prefixes.append('254720')
    safaricom_prefixes.append('254721')
    safaricom_prefixes.append('254722')
    safaricom_prefixes.append('254723')
    safaricom_prefixes.append('254724')
    safaricom_prefixes.append('254725')
    safaricom_prefixes.append('254726')
    safaricom_prefixes.append('254727')
    safaricom_prefixes.append('254728')
    safaricom_prefixes.append('254729')

    supplied_number_prefix = str(number)[:4]

    if supplied_number_prefix in safaricom_prefixes:
        if len(number) == 10:
            is_safaricom_number = '1'
        else:
            is_safaricom_number = '0'
    else:
        is_safaricom_number = '0'

    return is_safaricom_number

# get twilio account details

def get_twilio_account_details():
    
    # Account SID from twilio.com/console
    account_sid = "AC6d64f4138d40052e23cd17f2a0bebeac"

    # Auth Token from twilio.com/console
    auth_token  = "609c69d53d3b536785c8e6f02115909b"

    # Twilio phone number
    twilio_number = '+14348851286'

    return account_sid, auth_token, twilio_number

# verify and format kenyan number

def verify_kenyan_phone_number(phone_number):

    if len(phone_number) == 10:
        if phone_number[:2] == '07':
            number_corrected = True
            number_to_use = '+254'+phone_number[1:]
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    elif len(phone_number) == 9:
        if phone_number[:1] == '7':
            number_corrected = True
            number_to_use = '+254'+phone_number
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    elif len(phone_number) == 12:
        if phone_number[:3] == '254':
            number_corrected = True
            number_to_use = '+'+phone_number
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    elif len(phone_number) == 13:
        if phone_number[:4] == '+254':
            number_corrected = True
            number_to_use = phone_number
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    elif len(phone_number) == 14:
        if phone_number[:5] == '00254':
            number_corrected = True
            number_to_use = '+'+phone_number[2:]
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    elif len(phone_number) == 15:
        if phone_number[:6] == '000254':
            number_corrected = True
            number_to_use = '+'+phone_number[3:]
        else:
            number_corrected = False
            number_to_use = 'Number is not a mobile number'
    else:
        number_corrected = False
        number_to_use = 'Number is not a mobile number'

    return number_corrected, number_to_use

# send sms twilio

def send_twilio_sms(tel_number, sms):

    # test phone number

    phone_number_correct, number_to_use = verify_kenyan_phone_number(tel_number)
    if phone_number_correct == True:
        account_sid, auth_token, twilio_number = get_twilio_account_details()

        client = Client(account_sid, auth_token)
        message = client.messages.create(to=number_to_use, from_=twilio_number, body=sms)

        sms_sent = True
        message_sid = message.sid
    else:
        sms_sent = False
        message_sid = 'None'

    return sms_sent, message_sid

# get duration

def get_duration_in_hours(starting_date, end_date):
    starting_date_formatted = datetime.strptime(starting_date[:19], '%Y-%m-%d %H:%M:%S')
    end_date_formatted = datetime.strptime(end_date[:19], '%Y-%m-%d %H:%M:%S')

    if end_date_formatted < starting_date_formatted:
        result_code = "0"
        duration_in_hours = 0
        message = "starting date must be greater than end date"
    else:
        dates_substraction = end_date_formatted - starting_date_formatted

        dates_substraction_string = str(dates_substraction)

        if "-" in dates_substraction_string:
            result_code = "0"
            duration_in_hours = 0
            message = "starting date must be greater than end date"
        else:
            if "days," in dates_substraction_string:
                the_number_of_days = int(dates_substraction_string.split("days")[0])
                the_hours_part = dates_substraction_string[-8:]
            else:
                if "day," in dates_substraction_string:
                    the_number_of_days = int(dates_substraction_string.split("day")[0])
                    the_hours_part = dates_substraction_string[-8:]
                else:
                    the_number_of_days = 0
                    if ':' in dates_substraction_string[:2]:
                        the_hours_part = '0' + dates_substraction_string
                    else:
                        the_hours_part = dates_substraction_string

            the_number_of_hours = int(the_hours_part[:2])
            the_number_of_minutes = int(the_hours_part[3:5])

            if the_number_of_minutes > 0:
                minute_converted_to_hour = 1
            else:
                minute_converted_to_hour = 0

            duration_in_hours = the_number_of_days * 24 + the_number_of_hours + minute_converted_to_hour
            result_code = "1"
            message = "Success"

    return result_code, str(duration_in_hours), message


def convert_hours_to_second(hour):
    return hour * 60


# hash password

def hash_password_function(raw_password):
    encoded_password = raw_password.encode('utf-8')
    h = hashlib.md5()
    h.update(encoded_password)
    hashed_password = h.hexdigest()

    return hashed_password


# generate login token

def generate_login_token_function():
    generate_login_token_loop = True

    while generate_login_token_loop:

        generate_login_token_from = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        login_token_length = 12
        new_login_token = ""

        for i in range(login_token_length):
            next_index = random.randrange(len(generate_login_token_from))
            new_login_token = new_login_token + generate_login_token_from[next_index]

        check_new_token = LoginTokens.objects.filter(token=new_login_token).count()
        if check_new_token == 0:
            generate_login_token_loop = False
            break
        else:
            generate_login_token_loop = True

    return new_login_token


# generate login token request

def request_login_token_generation_function(user_slug, firebase_id, current_token, suggested_token, state_code):
    
    check_user = SystemUser.objects.filter(slug=user_slug, firebase_id=firebase_id).count()
    if check_user == 0:
        result = '0'
        active_token = ""
        token_to_suggest = ""
        message = 'Sorry, we couldn\'t authenticate you. Please try to login! thanks.'
    else:
        the_user_instance = SystemUser.objects.get(slug=user_slug)

        if state_code == 'xcGTj8*90_Y_yy' and current_token == '' and suggested_token == '':
            result = '1'
            active_token = generate_login_token_function()
            token_to_suggest = ""
            message = 'Token generated'

        else:
            test_current_token = LoginTokens.objects.filter(user=the_user_instance, token=current_token,
                                                            active=True, is_next=False)
            if test_current_token == 0:
                result = '0'
                active_token = ""
                token_to_suggest = ""
                message = 'Sorry, we couldn\'t authenticate you. Please try to login! thanks.'
            else:
                test_next_token = LoginTokens.objects.filter(user=the_user_instance, token=suggested_token,
                                                             active=True, is_next=True)
                if test_next_token == 0:
                    result = '10'
                    message = 'New token generated! But old token should still be kept!'
                    active_token = current_token
                    token_to_suggest = generate_login_token_function()
                else:
                    result = '11'
                    message = 'New token generated! Switch current token with suggested token and store new token'
                    active_token = suggested_token
                    token_to_suggest = generate_login_token_function()

    return result, active_token, token_to_suggest, message


# test user authentication

def test_login(user_slug, firebase_id, current_token, currently_suggested_token):

    check_user = SystemUser.objects.filter(slug=user_slug, firebase_id=firebase_id).count()

    if check_user == 0:
        result = '0'
        message = 'Sorry, we couldn\'t authenticate you. Please login and try again! thanks.'
    else:
        the_user_instance = SystemUser.objects.get(slug=user_slug)

        test_current_token = LoginTokens.objects.filter(user=the_user_instance, token=current_token,
                                                        active=True, is_next=False)
        test_next_token = LoginTokens.objects.filter(user=the_user_instance,
                                                     token=currently_suggested_token, active=True, is_next=True)
        test_next_token_as_current_token = LoginTokens.objects.filter(user=the_user_instance,
                                                                      token=currently_suggested_token, active=True,
                                                                      is_next=False)
        if test_current_token == 0 and test_next_token == 0 and test_next_token_as_current_token == 0:
            result = '0'
            message = 'Sorry, we couldn\'t authenticate you. Please login and try again! thanks.'
        else:
            result = '1'
            message = 'You are authenticated!'

    return result, message


# generate transaction code

def generate_transaction_code(user_instance, user_tel):

    generate_transaction_code_loop = True

    while generate_transaction_code_loop:

        generate_transaction_code_from = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        transaction_code_length = 4
        transaction_code = ""

        for i in range(transaction_code_length):
            next_index = random.randrange(len(generate_transaction_code_from))
            transaction_code = transaction_code + generate_transaction_code_from[next_index]

        transaction_code = user_tel+"-"+transaction_code

        check_transaction_code = UserTransactions.objects.filter(transaction_code=transaction_code).count()
        if check_transaction_code == 0:
            generate_transaction_code_loop = False
            break
        else:
            generate_transaction_code_loop = True

    return transaction_code

# generate account code

def generate_account_code():

    generate_account_code_loop = True

    while generate_account_code_loop:

        generate_account_code_from = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        account_code_length = 7
        account_code = ""

        for i in range(account_code_length):
            next_index = random.randrange(len(generate_account_code_from))
            account_code = account_code + generate_account_code_from[next_index]

        check_account_code = UserAccounts.objects.filter(account_code=account_code).count()
        if check_account_code == 0:
            generate_account_code_loop = False
            break
        else:
            generate_account_code_loop = True

    return account_code

# compute loan interest

def compute_loan_interest(amount, loan_interest_percentage):

    loan_interest = int(amount)*loan_interest_percentage/100
    amount_to_give = int(amount)-loan_interest

    return loan_interest, amount_to_give


# function to return current datetime in safaricom mpesa timestamp

def get_safaricom_timestamp():
    current_datetime = datetime.now()
    datetime_without_dash = str(current_datetime).replace("-", "")
    datetime_without_space = datetime_without_dash.replace(" ", "")
    datetime_without_colon = datetime_without_space.replace(":", "")

    mpesa_date_stamp = datetime_without_colon[:14]

    return (mpesa_date_stamp)

# function to encode data in base64

def encode_in_base64(data_to_encode):
    bytes_encoded_data = base64.b64encode(data_to_encode.encode())

    from_b_data = str(bytes_encoded_data).split('b\'', 1)[1:]
    encoded_data = from_b_data[0].split('\'', 1)[:1]

    return (encoded_data[0])

# mpesa access token

def get_mpesa_access_token():

    current_datetime = datetime.now()

    get_current_mpesa_token = CompanyDetails.objects.all()
    for current_mpesa_token_data in get_current_mpesa_token:
        current_mpesa_access_token = current_mpesa_token_data.current_mpesa_access_token
        current_mpesa_access_token_generated_on_datetime = current_mpesa_token_data.current_mpesa_access_token_generated_on_datetime

    if current_mpesa_access_token == '' or current_mpesa_access_token == None:
        generate_another_mpesa_access_token = True
    else:
        period_of_last_generated_mpesa_access_token = current_datetime.replace(tzinfo=None)-current_mpesa_access_token_generated_on_datetime.replace(tzinfo=None)
        period_of_last_generated_mpesa_access_token_string = str(period_of_last_generated_mpesa_access_token)

        if 'days' in period_of_last_generated_mpesa_access_token_string or 'day' in period_of_last_generated_mpesa_access_token_string:
            generate_another_mpesa_access_token = True
        else:
            extracted_hour = string.split(':', 1)[:1]
            if int(extracted_hour) > 0:
                generate_another_mpesa_access_token = True
            else:
                generate_another_mpesa_access_token = False


    if generate_another_mpesa_access_token == True:
        consumer_key = "8Prpi90AjJ2ZfvbTE5AnQeFMvKFlm1u8"
        consumer_secret = "yvKXeriJiOYqDA22"
        api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

        r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))

        from_token_data = r.text.split('"access_token": "', 1)[1:]
        access_token_data = from_token_data[0].split('",', 1)[:1]

        access_token_data = access_token_data[0]
    else:
        access_token_data = current_mpesa_access_token

    return (access_token_data)

# perform user mpesa transfer

def perform_client_mpesa_transfer(mpesa_access_token, transaction_code, amount, user_mpesa_tel, account_name, transaction_slug):

    paybill_number = "174379"
    access_token = mpesa_access_token
    lipa_na_mpesa_online_pass_key = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"    

    timestamp = get_safaricom_timestamp()

    string_to_encode = paybill_number+""+lipa_na_mpesa_online_pass_key+""+timestamp

    mpesa_password = encode_in_base64(string_to_encode)

    api_url="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers={"Authorization":"Bearer %s"%access_token}
    request={
        "BusinessShortCode": paybill_number,
        "Password": mpesa_password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(amount),
        "PartyA": user_mpesa_tel,
        "PartyB": paybill_number,
        "PhoneNumber": user_mpesa_tel,
        "CallBackURL": "https://loanAppsacco.co.ke/rest_mpesa_transaction_confirmation/?transaction_slug="+transaction_slug,
        "AccountReference": transaction_code,
        "TransactionDesc": account_name
    }

    response = requests.post(api_url,json=request,headers=headers)

    return (response.text)
    