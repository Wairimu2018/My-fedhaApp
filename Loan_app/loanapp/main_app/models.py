import random
from ckeditor.fields import RichTextField
from django.db import models
from django.db.models.signals import pre_save
from django.utils.text import slugify
from .validators import validate_file_extension


# Mobile App Version

class MobileAppVersion(models.Model):
    version = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.version


def create_mobile_app_version_slug(instance, new_slug=None):
    slug = slugify(instance.version)
    if new_slug is not None:
        slug = new_slug
    qs = MobileAppVersion.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_mobile_app_version_slug(instance, new_slug=new_slug)
    return slug


def presave_mobile_app_version(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_mobile_app_version_slug(instance)


pre_save.connect(presave_mobile_app_version, sender=MobileAppVersion)


# Country

class Country(models.Model):
    country_name = models.CharField(max_length=50)
    country_code = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.country_name


def create_country_slug(instance, new_slug=None):
    slug = slugify(instance.country_name)
    if new_slug is not None:
        slug = new_slug
    qs = Country.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_country_slug(instance, new_slug=new_slug)
    return slug


def presave_country(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_country_slug(instance)


pre_save.connect(presave_country, sender=Country)



# Town

class Town(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    town_name = models.CharField(max_length=50)
    town_code = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.town_name

def create_town_slug(instance, new_slug=None):
    slug = slugify(instance.town_name)
    if new_slug is not None:
        slug = new_slug
    qs = Town.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_town_slug(instance, new_slug=new_slug)
    return slug

def presave_town(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_town_slug(instance)


pre_save.connect(presave_town, sender=Town)


# rights

class AccessLevel(models.Model):
    name = models.CharField(max_length=50)
    tag = models.CharField(max_length=40)
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    deleted = models.BooleanField(default=False)
    deletedDate = models.DateField(blank=True, null=True)
    deleteTime = models.TimeField(blank=True, null=True)
    addedDate = models.DateField(auto_now=False, auto_now_add=True)
    addedTime = models.TimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name


def create_access_level_slug(instance, new_slug=None):
    slug = slugify(instance.name)
    if new_slug is not None:
        slug = new_slug
    qs = AccessLevel.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_access_level_slug(instance, new_slug=new_slug)
    return slug


def presave_access_level(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_access_level_slug(instance)


pre_save.connect(presave_access_level, sender=AccessLevel)


# rights

class Right(models.Model):
    name = models.CharField(max_length=50)
    tag = models.CharField(max_length=40)
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    deleted = models.BooleanField(default=False)
    deletedDate = models.DateField(blank=True, null=True)
    deleteTime = models.TimeField(blank=True, null=True)
    addedDate = models.DateField(auto_now=False, auto_now_add=True)
    addedTime = models.TimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name


def create_right_slug(instance, new_slug=None):
    slug = slugify(instance.name)
    if new_slug is not None:
        slug = new_slug
    qs = Right.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_right_slug(instance, new_slug=new_slug)
    return slug


def presave_right(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_right_slug(instance)


pre_save.connect(presave_right, sender=Right)


# access level rights

class AccessLevelRight(models.Model):
    access_level = models.ForeignKey(AccessLevel, on_delete=models.CASCADE)
    right = models.ForeignKey(Right, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    deleted = models.BooleanField(default=False)
    deletedDate = models.DateField(blank=True, null=True)
    deleteTime = models.TimeField(blank=True, null=True)
    addedDate = models.DateField(auto_now=False, auto_now_add=True)
    addedTime = models.TimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.slug

    generated_slug_from = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    slug_length = 10
    generated_slug = ""

    for i in range(slug_length):
        next_index = random.randrange(len(generated_slug_from))
        generated_slug = generated_slug + generated_slug_from[next_index]


def create_access_level_right_slug(instance, new_slug=None):
    slug = slugify(instance.generated_slug)
    if new_slug is not None:
        slug = new_slug
    qs = AccessLevelRight.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_access_level_right_slug(instance, new_slug=new_slug)
    return slug


def presave_access_level_right(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_access_level_right_slug(instance)


pre_save.connect(presave_access_level_right, sender=AccessLevelRight)

# department

class Department(models.Model):
    title = models.CharField(max_length=50)
    description = RichTextField(max_length=50)
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_department_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Department.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_department_slug(instance, new_slug=new_slug)
    return slug


def presave_department(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_department_slug(instance)


pre_save.connect(presave_department, sender=Department)


# positions

class Position(models.Model):
    title = models.CharField(max_length=100)
    description = RichTextField(max_length=250)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)    
    location = models.CharField(max_length=50)
    advertised = models.BooleanField(default=False)
    position_to_be_filled_on_date = models.DateField(null=True, blank=True)
    position_file = models.FileField()
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_position_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Position.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_position_slug(instance, new_slug=new_slug)
    return slug


def presave_position(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_position_slug(instance)


pre_save.connect(presave_position, sender=Position)


# Person Official Designation

class PersonOfficialDesignation(models.Model):
    designation = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.designation

def create_person_official_designation_slug(instance, new_slug=None):
    slug = slugify(instance.designation)
    if new_slug is not None:
        slug = new_slug
    qs = PersonOfficialDesignation.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_person_official_designation_slug(instance, new_slug=new_slug)
    return slug


def presave_person_official_designation(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_person_official_designation_slug(instance)

pre_save.connect(presave_person_official_designation, sender=PersonOfficialDesignation)


# Marital status

class MaritalStatus(models.Model):
    status = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.status

def create_marital_status_slug(instance, new_slug=None):
    slug = slugify(instance.status)
    if new_slug is not None:
        slug = new_slug
    qs = MaritalStatus.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_marital_status_slug(instance, new_slug=new_slug)
    return slug


def presave_marital_status(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_marital_status_slug(instance)

pre_save.connect(presave_marital_status, sender=MaritalStatus)

# Gender

class Gender(models.Model):
    gender = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.gender

def create_gender_slug(instance, new_slug=None):
    slug = slugify(instance.gender)
    if new_slug is not None:
        slug = new_slug
    qs = Gender.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_gender_slug(instance, new_slug=new_slug)
    return slug


def presave_gender(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_gender_slug(instance)

pre_save.connect(presave_gender, sender=Gender)

# users

class SystemUser(models.Model):
    official_designation = models.ForeignKey(PersonOfficialDesignation, on_delete=models.CASCADE, blank=True, null=True)
    firebase_id = models.CharField(max_length=1000, unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    sex = models.ForeignKey(Gender, on_delete=models.CASCADE, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    employer = models.CharField(max_length=50, null=True, blank=True)
    employer_address = models.CharField(max_length=100, null=True, blank=True)
    terms_of_service = models.CharField(max_length=50, null=True, blank=True)
    contract_ending_date = models.DateTimeField(blank=True, null=True)
    marital_status = models.ForeignKey(MaritalStatus, on_delete=models.CASCADE, blank=True, null=True)
    profession = models.CharField(max_length=50, null=True, blank=True)
    town = models.ForeignKey(Town, on_delete=models.CASCADE, related_name='user_town')
    profile_image_url = models.CharField(max_length=2000, null=True, blank=True)
    profile_image_local_file = models.FileField(null=True, blank=True)
    id_copy_url = models.CharField(max_length=2000, null=True, blank=True)
    id_number = models.CharField(max_length=100, blank=True, null=True)
    kra_pin = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=500, null=True, blank=True)
    tel1 = models.CharField(max_length=20, null=True, blank=True)
    tel2 = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    next_of_kin_full_name = models.CharField(max_length=150, null=True, blank=True)
    next_of_kin_date_of_birth = models.DateTimeField(blank=True, null=True)
    next_of_kin_relationship = models.CharField(max_length=50, null=True, blank=True)
    next_of_kin_tel = models.CharField(max_length=50, null=True, blank=True)
    next_of_kin_id_number = models.CharField(max_length=50, null=True, blank=True)
    next_of_kin_address = models.CharField(max_length=50, null=True, blank=True)
    next_of_kin_town = models.ForeignKey(Town, on_delete=models.CASCADE,null=True, blank=True , related_name='user_next_of_kin_town')
    next_of_kin_email = models.EmailField(max_length=50, null=True, blank=True)
    physical_membership_registration_form = models.FileField(validators=[validate_file_extension], blank=True, null=True)
    bank_name = models.CharField(max_length=50, null=True, blank=True)
    bank_branch_name = models.CharField(max_length=50, null=True, blank=True)
    bank_account_number = models.CharField(max_length=50, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    position_at_loanApp = models.ForeignKey(Position, on_delete=models.CASCADE, blank=True, null=True)
    access_level = models.ForeignKey(AccessLevel, on_delete=models.CASCADE, blank=True, null=True)
    rating = models.IntegerField(default=0)
    number_of_ratings = models.IntegerField(default=0)
    number_of_raters = models.IntegerField(default=0)
    facebook_profile_link = models.URLField(null=True, blank=True)
    linkedin_profile_link = models.URLField(null=True, blank=True)
    twitter_profile_link = models.URLField(null=True, blank=True)
    active = models.BooleanField(default=True)
    membership_account_approved = models.BooleanField(default=False)
    membership_account_approved_by_user = models.CharField(max_length=100, null=True, blank=True)
    membership_account_approved_on_datetime = models.DateTimeField(blank=True, null=True)
    cleared_for_loan = models.BooleanField(default=False)
    cleared_for_loan_on_date_time = models.DateTimeField(blank=True, null=True)
    started_deposit_on_datetime = models.DateTimeField(blank=True, null=True)
    account_verified = models.BooleanField(default=False)
    account_verified_on_date_time = models.DateTimeField(blank=True, null=True)
    account_verified_by = models.CharField(max_length=500, blank=True, null=True)
    loan_limit = models.IntegerField(default=0)
    current_loan_amount = models.IntegerField(default=0)
    loan_next_refund_due_date = models.DateTimeField(blank=True, null=True)
    loan_due_date = models.DateTimeField(blank=True, null=True)
    current_amount_in_account = models.IntegerField(default=0)
    loan_amount_given_to_client = models.IntegerField(null=True, blank=True)
    loan_interest = models.IntegerField(null=True, blank=True)
    registered_for_newsletter = models.BooleanField(default=False)
    registered_for_newsletters_only = models.BooleanField(default=False)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    deleted = models.BooleanField(default=False)
    deleted_on_date_time = models.DateTimeField(blank=True, null=True)
    added_on_date = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.first_name

def create_system_user_slug(instance, new_slug=None):
    slug = slugify(instance.first_name)
    if new_slug is not None:
        slug = new_slug
    qs = SystemUser.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_system_user_slug(instance, new_slug=new_slug)
    return slug


def presave_system_user(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_system_user_slug(instance)


pre_save.connect(presave_system_user, sender=SystemUser)

# login tokens

class LoginTokens(models.Model):
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    token = models.CharField(max_length=50)
    active = models.BooleanField(default=True)
    is_next = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    generated_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    # generatedAtTime = models.TimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.token


def create_login_tokens_slug(instance, new_slug=None):
    slug = slugify(instance.token)
    if new_slug is not None:
        slug = new_slug
    qs = LoginTokens.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_login_tokens_slug(instance, new_slug=new_slug)
    return slug


def presave_login_tokens(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_login_tokens_slug(instance)


pre_save.connect(presave_login_tokens, sender=LoginTokens)


# Users' Login Activities

class PasswordReset(models.Model):
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    temporary_password = models.CharField(max_length=200)
    used = models.BooleanField(default=True)
    active = models.BooleanField(default=True)
    recovery_requested_on_date = models.DateField(auto_now=False, auto_now_add=True)
    recovery_requested_at_time = models.TimeField(auto_now=False, auto_now_add=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)

    def __str__(self):
        return self.slug

    generated_slug_from = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    slug_length = 10
    generated_slug = ""

    for i in range(slug_length):
        next_index = random.randrange(len(generated_slug_from))
        generated_slug = generated_slug + generated_slug_from[next_index]


def create_password_reset_slug(instance, new_slug=None):
    slug = slugify(instance.generated_slug)
    if new_slug is not None:
        slug = new_slug
    qs = PasswordReset.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_password_reset_slug(instance, new_slug=new_slug)
    return slug


def presave_password_reset(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_password_reset_slug(instance)


pre_save.connect(presave_password_reset, sender=PasswordReset)

# company details

class CompanyDetails(models.Model):
    company_name = models.CharField(max_length=50)
    company_logo = models.FileField(validators=[validate_file_extension], blank=True, null=True)
    firebase_url = models.CharField(max_length=2000, unique=True)
    email = models.EmailField(max_length=50)
    tel1 = models.CharField(max_length=20)
    tel2 = models.CharField(max_length=20, null=True, blank=True)
    about_company = RichTextField()
    about_company_image = models.FileField()
    mpesa_paybill_number = models.CharField(max_length=150)
    current_mpesa_access_token = models.CharField(max_length=500, null=True, blank=True)
    current_mpesa_access_token_generated_on_datetime = models.DateTimeField(null=True, blank=True)
    country = models.CharField(max_length=50)
    town = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    facebook_profile_link = models.URLField(null=True, blank=True)
    linkedin_profile_link = models.URLField(null=True, blank=True)
    twitter_profile_link = models.URLField(null=True, blank=True)
    minimum_days_of_deposit_to_take_loan = models.IntegerField()
    minimum_loan_limit = models.IntegerField()
    number_of_days_to_refund_loan = models.IntegerField()
    number_of_loan_payment_installments = models.IntegerField()
    loan_interest_percentage = models.IntegerField()
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.company_name

def create_company_details_slug(instance, new_slug=None):
    slug = slugify(instance.company_name)
    if new_slug is not None:
        slug = new_slug
    qs = CompanyDetails.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_company_details_slug(instance, new_slug=new_slug)
    return slug


def presave_company_details(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_company_details_slug(instance)


pre_save.connect(presave_company_details, sender=CompanyDetails)


# Organizations Categories

class OrganizationsCategories(models.Model):    
    category_name = models.CharField(max_length=50)  
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.category_name

def create_organizations_categories_slug(instance, new_slug=None):
    slug = slugify(instance.category_name)
    if new_slug is not None:
        slug = new_slug
    qs = OrganizationsCategories.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_organizations_categories_slug(instance, new_slug=new_slug)
    return slug


def presave_organizations_categories(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_organizations_categories_slug(instance)

pre_save.connect(presave_organizations_categories, sender=OrganizationsCategories)


# member organizations

class MemberOrganizations(models.Model):
    name_of_organization = models.CharField(max_length=100)
    organization_physical_address = models.CharField(max_length=100)
    organization_postal_address = models.CharField(max_length=100)
    organization_telephone = models.CharField(max_length=100)
    organization_fax = models.CharField(max_length=100, null=True, blank=True)
    organization_email = models.EmailField(max_length=100)
    organization_category = models.ForeignKey(OrganizationsCategories, on_delete=models.CASCADE, null=True, blank=True)
    organization_specified_category = models.CharField(max_length=100, null=True, blank=True)
    organization_date_of_registration = models.DateField()
    organization_total_number_of_staff = models.IntegerField()
    how_did_you_know_about_loanApp = models.CharField(max_length=100)
    organization_logo = models.FileField(validators=[validate_file_extension], null=True, blank=True)
    organization_copy_of_registration_certificate = models.FileField(validators=[validate_file_extension])
    organization_brochure = models.FileField(validators=[validate_file_extension])
    request_viewed = models.BooleanField(default=False)
    request_viewed_on_date_time = models.DateTimeField(null=True, blank=True)
    request_viewed_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="pre_membership_request_viewed_by")
    pre_membership_approved = models.BooleanField(default=False)
    pre_membership_approved_on_date_time = models.DateTimeField(null=True, blank=True)
    pre_membership_approved_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="pre_membership_approved_by")
    mpesa_paybill_number = models.CharField(max_length=150, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    town = models.CharField(max_length=50, null=True, blank=True)
    facebook_profile_link = models.URLField(null=True, blank=True)
    linkedin_profile_link = models.URLField(null=True, blank=True)
    twitter_profile_link = models.URLField(null=True, blank=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    membership_requested_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    physical_pre_membership_registration_form = models.FileField(validators=[validate_file_extension], null=True, blank=True)

    def __str__(self):
        return self.name_of_organization

def create_member_organizations_slug(instance, new_slug=None):
    slug = slugify(instance.name_of_organization)
    if new_slug is not None:
        slug = new_slug
    qs = MemberOrganizations.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_member_organizations_slug(instance, new_slug=new_slug)
    return slug


def presave_member_organizations(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_member_organizations_slug(instance)


pre_save.connect(presave_member_organizations, sender=MemberOrganizations)


# Service categories

class ServiceCategories(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name

def create_service_categories_slug(instance, new_slug=None):
    slug = slugify(instance.name)
    if new_slug is not None:
        slug = new_slug
    qs = ServiceCategories.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_service_categories_slug(instance, new_slug=new_slug)
    return slug

def presave_service_categories(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_service_categories_slug(instance)


pre_save.connect(presave_service_categories, sender=ServiceCategories)


# Our Services

class OurServices(models.Model):  
    service_type = models.ForeignKey(ServiceCategories, on_delete=models.CASCADE)  
    title = models.CharField(max_length=30)
    service_fa_icon_name = models.CharField(max_length=20)
    short_details = models.CharField(max_length=110)
    description = RichTextField()
    order = models.IntegerField(default=0)
    service_image = models.FileField(blank=True, null=True)
    active = models.BooleanField(default=True)
    service_managed_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_our_services_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = OurServices.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_our_services_slug(instance, new_slug=new_slug)
    return slug


def presave_our_services(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_our_services_slug(instance)


pre_save.connect(presave_our_services, sender=OurServices)


# user Accounts

class UserAccounts(models.Model):
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='account_owner')
    product = models.ForeignKey(OurServices, on_delete=models.CASCADE)
    account_code = models.CharField(max_length=20)
    amount_in_account = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    account_approved_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='account_approved_by', null=True, blank=True)
    account_added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    
    def __str__(self):
        return self.account_code

def create_user_accounts_slug(instance, new_slug=None):
    slug = slugify(instance.account_code)
    if new_slug is not None:
        slug = new_slug
    qs = UserAccounts.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_user_accounts_slug(instance, new_slug=new_slug)
    return slug

def presave_user_accounts(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_user_accounts_slug(instance)

pre_save.connect(presave_user_accounts, sender=UserAccounts)

# Loans Record

class LoansRecord(models.Model):
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name="loan_of_user")
    loan_code = models.CharField(max_length=50)
    amount_taken = models.IntegerField()
    amount_given_to_client = models.IntegerField()
    loan_original_interest = models.IntegerField(default=0)
    cumulative_interest = models.IntegerField(default=0) # for defaulters    
    total_interest = models.IntegerField(default=0)
    amount_remained_to_refund = models.IntegerField()
    current_amount_refunded = models.IntegerField(default=0)
    requested_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    intended_date_to_repay_loan = models.DateField(null=True, blank=True)
    loan_due_date = models.DateField(null=True, blank=True)
    loan_granted = models.BooleanField(default=False)
    granted_on_date_time = models.DateTimeField(null=True, blank=True)
    granted_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="loan_granted_by")
    loan_refunded = models.BooleanField(default=False)
    refund_completed_on_date_time = models.DateTimeField(null=True, blank=True)
    refund_verified_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="loan_refund_verified_by")   
    loan_request_rejected = models.BooleanField(default=False)
    loan_request_rejected_on_date_time = models.DateTimeField(null=True, blank=True)
    loan_request_rejected_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="loan_request_rejected_by")
    defaulted = models.BooleanField(default=False)
    defaulted_for_number_of_days = models.IntegerField(default=0)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)

    def __str__(self):
        return self.loan_code

def create_loan_record_slug(instance, new_slug=None):
    slug = slugify(instance.loan_code)
    if new_slug is not None:
        slug = new_slug
    qs = LoansRecord.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_loan_record_slug(instance, new_slug=new_slug)
    return slug


def presave_loan_record(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_loan_record_slug(instance)


pre_save.connect(presave_loan_record, sender=LoansRecord)


# user transactions

class UserTransactions(models.Model):
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name="transaction_of_user")
    loan_record = models.ForeignKey(LoansRecord, on_delete=models.CASCADE, null=True, blank=True)
    transaction_from_account = models.ForeignKey(UserAccounts, on_delete=models.CASCADE, null=True, blank=True)
    transaction_code = models.CharField(max_length=50)
    transaction_type = models.CharField(max_length=20)
    used_payment_method = models.CharField(max_length=20, null=True, blank=True)
    transacted_amount = models.IntegerField()
    loan_amount_given_to_client = models.IntegerField(null=True, blank=True)
    loan_interest = models.IntegerField(null=True, blank=True)
    number_of_intended_days_to_repay_loan = models.IntegerField(null=True, blank=True)
    intended_date_to_repay_loan = models.DateField(null=True, blank=True)
    used_paybill_number = models.CharField(max_length=20, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    notify_user = models.BooleanField(default=True)
    notify_loan_admin = models.BooleanField(default=True)
    verified = models.BooleanField(default=False)
    transaction_verified_on = models.DateTimeField(null=True, blank=True)
    amount_transacted_in_mpesa = models.IntegerField(default=0)
    mpesa_transaction_code = models.CharField(max_length=50, null=True, blank=True)
    mpesa_transaction_timestamp = models.IntegerField(default=0)
    number_used_for_mpesa_transaction = models.CharField(max_length=50, null=True, blank=True)
    transaction_confirmed_by_mpesa_api = models.BooleanField(default=False)
    transaction_verified_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="transaction_verified_by")
    rejected = models.BooleanField(default=False)
    transaction_rejected_on = models.DateTimeField(null=True, blank=True)
    transaction_rejected_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True, related_name="transaction_rejected_by")
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    transaction_carried_out_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.transaction_code

def create_user_transactions_slug(instance, new_slug=None):
    slug = slugify(instance.transaction_code)
    if new_slug is not None:
        slug = new_slug
    qs = UserTransactions.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_user_transactions_slug(instance, new_slug=new_slug)
    return slug


def presave_user_transactions(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_user_transactions_slug(instance)


pre_save.connect(presave_user_transactions, sender=UserTransactions)

# Our Projects

class OurProjects(models.Model):    
    title = models.CharField(max_length=20)
    short_details = models.CharField(max_length=30)
    description = RichTextField()
    project_image = models.FileField()
    clients = models.CharField(max_length=50) 
    project_location = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    project_manager = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='project_manager')
    project_value = models.IntegerField(default=0)
    show_project_value = models.BooleanField(default=False)
    realization_date = models.DateField()
    realized = models.BooleanField(default=False)
    deleted = models.BooleanField(default=False)
    added_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='project_added_by_user')
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_our_projects_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = OurProjects.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_our_projects_slug(instance, new_slug=new_slug)
    return slug


def presave_our_projects(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_our_projects_slug(instance)


pre_save.connect(presave_our_projects, sender=OurProjects)


# downlodable resource

class DownloadableResource(models.Model):
    title = models.CharField(max_length=80)
    description = RichTextField(max_length=250)
    resource = models.FileField()
    attached_to_department = models.ForeignKey(Department, on_delete=models.CASCADE)
    attached_to_service = models.ForeignKey(OurServices, on_delete=models.CASCADE, null=True, blank=True)
    attached_for_project = models.ForeignKey(OurProjects, on_delete=models.CASCADE, null=True, blank=True) 
    attached_to_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    can_be_downloaded = models.BooleanField(default=False)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_downloadable_resource_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = DownloadableResource.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_downloadable_resource_slug(instance, new_slug=new_slug)
    return slug


def presave_downloadable_resource(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_downloadable_resource_slug(instance)


pre_save.connect(presave_downloadable_resource, sender=DownloadableResource)


# Sliding Adverts

class SlidingAdverts(models.Model):
    slider_image = models.FileField()
    title = models.CharField(max_length=50)
    short_details = models.CharField(max_length=100)
    button_name = models.CharField(max_length=15)
    button_link = models.URLField(max_length=1000)
    active = models.BooleanField(default=True)
    sliding_advert_added_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_sliding_adverts_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = SlidingAdverts.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_sliding_adverts_slug(instance, new_slug=new_slug)
    return slug


def presave_sliding_adverts(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_sliding_adverts_slug(instance)


pre_save.connect(presave_sliding_adverts, sender=SlidingAdverts)


# Testimonials

class Testimonial(models.Model):
    testimonial_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE)
    work_position = models.CharField(max_length=25)
    testimony = models.CharField(max_length=300)
    active = models.BooleanField(default=True)    
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.work_position

def create_testimonial_slug(instance, new_slug=None):
    slug = slugify(instance.work_position)
    if new_slug is not None:
        slug = new_slug
    qs = Testimonial.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_testimonial_slug(instance, new_slug=new_slug)
    return slug


def presave_testimonial(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_testimonial_slug(instance)


pre_save.connect(presave_testimonial, sender=Testimonial)


# News

class News(models.Model):    
    title = models.CharField(max_length=25)
    news = RichTextField()
    image = models.FileField()
    deleted = models.BooleanField(default=False)   
    author = models.ForeignKey(SystemUser, on_delete=models.CASCADE) 
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    posted_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_news_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = News.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_news_slug(instance, new_slug=new_slug)
    return slug


def presave_news(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_news_slug(instance)


pre_save.connect(presave_news, sender=News)


# our partners

class OurPartners(models.Model):
    company_name = models.CharField(max_length=50)
    company_logo = models.FileField(validators=[validate_file_extension])
    email = models.EmailField(max_length=50)
    tel1 = models.CharField(max_length=20)
    tel2 = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=50)
    town = models.CharField(max_length=50)
    address = models.CharField(max_length=150)
    facebook_profile_link = models.URLField(null=True, blank=True)
    linkedin_profile_link = models.URLField(null=True, blank=True)
    twitter_profile_link = models.URLField(null=True, blank=True)
    representative = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name="company_representative")
    added_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name="company_added_by")
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.company_name

def create_our_partners_slug(instance, new_slug=None):
    slug = slugify(instance.company_name)
    if new_slug is not None:
        slug = new_slug
    qs = OurPartners.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_our_partners_slug(instance, new_slug=new_slug)
    return slug


def presave_our_partners(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_our_partners_slug(instance)


pre_save.connect(presave_our_partners, sender=OurPartners)

# Messagges

class Messagges(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.CharField(max_length=1000)
    attended = models.BooleanField(default=True)
    attended_on_datetime = models.DateTimeField(null=True, blank=True)
    attended_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE, null=True, blank=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.subject

def create_messagges_slug(instance, new_slug=None):
    slug = slugify(instance.subject)
    if new_slug is not None:
        slug = new_slug
    qs = Messagges.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_messagges_slug(instance, new_slug=new_slug)
    return slug


def presave_messagges(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_messagges_slug(instance)


pre_save.connect(presave_messagges, sender=Messagges)

# Blog articles categories

class BlogArticleCategory(models.Model):    
    name = models.CharField(max_length=25)
    description = RichTextField()    
    active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    added_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.name

def create_blog_article_category_slug(instance, new_slug=None):
    slug = slugify(instance.name)
    if new_slug is not None:
        slug = new_slug
    qs = BlogArticleCategory.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_blog_article_category_slug(instance, new_slug=new_slug)
    return slug


def presave_blog_article_category(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_blog_article_category_slug(instance)


pre_save.connect(presave_blog_article_category, sender=BlogArticleCategory)


# Blog Article

class BlogArticle(models.Model): 
    title = models.CharField(max_length=150)
    article = RichTextField()
    image = models.FileField()
    category = models.ForeignKey(BlogArticleCategory, on_delete=models.CASCADE) 
    deleted = models.BooleanField(default=False)   
    posted_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE) 
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    posted_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_blog_article_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = BlogArticle.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_blog_article_slug(instance, new_slug=new_slug)
    return slug


def presave_blog_article(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_blog_article_slug(instance)


pre_save.connect(presave_blog_article, sender=BlogArticle)


# Gallery

class Gallery(models.Model): 
    title = models.CharField(max_length=150)
    thumbnail = models.FileField()
    image = models.FileField()
    active = models.BooleanField(default=True)
    posted_by = models.ForeignKey(SystemUser, on_delete=models.CASCADE) 
    slug = models.SlugField(max_length=5000, null=True, blank=True, unique=True)
    posted_on_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.title

def create_gallery_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Gallery.objects.filter(slug=slug).order_by('id')
    exists = qs.exists()
    if exists:
        new_slug = '%s-%s' % (slug, qs.first().id)
        return create_gallery_slug(instance, new_slug=new_slug)
    return slug


def presave_gallery(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_gallery_slug(instance)


pre_save.connect(presave_gallery, sender=Gallery)

