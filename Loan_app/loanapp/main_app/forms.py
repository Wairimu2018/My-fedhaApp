#-*- coding: utf-8 -*-
import hashlib
from django import forms
from .models import (SystemUser, MemberOrganizations)
from django.template.defaultfilters import mark_safe
from django.contrib.auth.hashers import make_password
from django.contrib.auth import (authenticate, get_user_model, login, logout, )
from django.http import Http404
from datetime import datetime, timedelta, time, date

# organizations pre membership registration form

class MemberOrganizationsForm(forms.ModelForm):
	name_of_organization = forms.CharField(label = mark_safe('<label for="name_of_organization">Name of organization</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'name_of_organization'}))
	organization_physical_address = forms.CharField(label = mark_safe('<label for="organization_physical_address">Organization physical address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_physical_address'}))
	organization_postal_address = forms.CharField(label = mark_safe('<label for="organization_postal_address">Organization postal address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_postal_address'}))
	organization_telephone = forms.CharField(label = mark_safe('<label for="organization_telephone">Organization telephone</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_telephone'}))
	organization_fax = forms.CharField(label = mark_safe('<label for="organization_fax">Organization fax</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'organization_fax'}))
	organization_email = forms.EmailField(label = mark_safe('<label for="organization_email">Organization email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_email'}))
	organization_specified_category = forms.CharField(label = mark_safe('<label for="organization_specified_category">Organization specified category</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_specified_category'}))
	
	organization_date_of_registration = forms.CharField(label = mark_safe('<label for="organization_date_of_registration">Organization date of registration</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'datepicker'}))
	organization_total_number_of_staff = forms.IntegerField(label = mark_safe('<label for="organization_total_number_of_staff">Organization total number of staff</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_total_number_of_staff'}))
	how_did_you_know_about_loanApp = forms.CharField(label = mark_safe('<label for="how_did_you_know_about_loanApp">how did you know about My-Fedha?</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'how_did_you_know_about_loanApp'}))
	
	class Meta:
		model = MemberOrganizations
		fields = [
			"name_of_organization",
			"organization_physical_address",
			"organization_postal_address",
			"organization_telephone",
			"organization_fax",
			"organization_email",
			"organization_category",
			"organization_specified_category",
			"organization_date_of_registration",
			"organization_total_number_of_staff",
			"how_did_you_know_about_loanApp",
			"organization_copy_of_registration_certificate",
			"organization_brochure",
			"organization_logo",

		]


	def clean(self, *args, **kwargs):
		name_of_organization = self.cleaned_data.get("name_of_organization")
		check_name_of_organization = MemberOrganizations.objects.filter(name_of_organization=name_of_organization)
		if check_name_of_organization.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(MemberOrganizationsForm, self).clean(*args, **kwargs)

	def clean_name_of_organization(self):
		name_of_organization = self.cleaned_data.get("name_of_organization")
		check_name_of_organization = MemberOrganizations.objects.filter(name_of_organization=name_of_organization)
		if check_name_of_organization.exists():
			raise forms.ValidationError("This organization name is already registered.")
		return name_of_organization

	def clean(self, *args, **kwargs):
		organization_email = self.cleaned_data.get("organization_email")
		check_organization_organization_email = MemberOrganizations.objects.filter(organization_email=organization_email)
		if check_organization_organization_email.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(MemberOrganizationsForm, self).clean(*args, **kwargs)

	def clean_organization_email(self):
		organization_email = self.cleaned_data.get("organization_email")
		check_organization_organization_email = MemberOrganizations.objects.filter(organization_email=organization_email)
		if check_organization_organization_email.exists():
			raise forms.ValidationError("This organization email is already registered.")
		return organization_email

	def clean(self, *args, **kwargs):
		organization_category = self.cleaned_data.get("organization_category")
		organization_specified_category = self.cleaned_data.get("organization_specified_category")
		if organization_category == 'Others':
			if organization_specified_category == '':
				raise forms.ValidationError("Please specify your organization category")				
		return super(MemberOrganizationsForm, self).clean(*args, **kwargs)

	def clean_organization_specified_category(self):
		organization_category = self.cleaned_data.get("organization_category")
		organization_specified_category = self.cleaned_data.get("organization_specified_category")
		if organization_category == 'Others':
			if organization_specified_category == '':
				raise forms.ValidationError("Please specify your organization category")

		return organization_specified_category

	def clean_organization_copy_of_registration_certificate(self):
		organization_copy_of_registration_certificate = self.cleaned_data.get('organization_copy_of_registration_certificate',False)
		if organization_copy_of_registration_certificate:
			if organization_copy_of_registration_certificate._size > 4*1024*1024:
				raise forms.ValidationError("File too large. Please select a 4mb or less file.")
			return organization_copy_of_registration_certificate
		else:
			raise forms.ValidationError("Couldn't read uploaded file. Please upload again.")

	def clean_organization_brochure(self):
		organization_brochure = self.cleaned_data.get('organization_brochure',False)
		if organization_brochure:
			if organization_brochure._size > 4*1024*1024:
				raise forms.ValidationError("File too large. Please select a 4mb or less file.")
			return organization_brochure
		else:
			raise forms.ValidationError("Couldn't read uploaded file. Please upload again.")

	def clean_organization_logo(self):
		organization_logo = self.cleaned_data.get('organization_logo',False)
		if organization_logo:
			if organization_logo._size > 4*1024*1024:
				raise forms.ValidationError("File too large. Please select a 4mb or less file.")
			return organization_logo
		else:
			raise forms.ValidationError("Couldn't read uploaded file. Please upload again.")
			

# edit organizations pre membership registration form

class EditMemberOrganizationsForm(forms.ModelForm):
	name_of_organization = forms.CharField(label = mark_safe('<label for="name_of_organization">Name of organization</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'name_of_organization'}))
	organization_physical_address = forms.CharField(label = mark_safe('<label for="organization_physical_address">Organization physical address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_physical_address'}))
	organization_postal_address = forms.CharField(label = mark_safe('<label for="organization_postal_address">Organization postal address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_postal_address'}))
	organization_telephone = forms.CharField(label = mark_safe('<label for="organization_telephone">Organization telephone</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_telephone'}))
	organization_fax = forms.CharField(label = mark_safe('<label for="organization_fax">Organization fax</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'organization_fax'}))
	organization_email = forms.EmailField(label = mark_safe('<label for="organization_email">Organization email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_email'}))
	organization_specified_category = forms.CharField(label = mark_safe('<label for="organization_specified_category">Organization specified category</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_specified_category'}))
	
	organization_date_of_registration = forms.CharField(label = mark_safe('<label for="organization_date_of_registration">Organization date of registration</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'datepicker'}))
	organization_total_number_of_staff = forms.IntegerField(label = mark_safe('<label for="organization_total_number_of_staff">Organization total number of staff</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'organization_total_number_of_staff'}))
	how_did_you_know_about_loanApp = forms.CharField(label = mark_safe('<label for="how_did_you_know_about_loanApp">how did you know about My-Fedha?</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'how_did_you_know_about_loanApp'}))
	
	class Meta:
		model = MemberOrganizations
		fields = [
			"name_of_organization",
			"organization_physical_address",
			"organization_postal_address",
			"organization_telephone",
			"organization_fax",
			"organization_email",
			"organization_category",
			"organization_specified_category",
			"organization_date_of_registration",
			"organization_total_number_of_staff",
			"how_did_you_know_about_loanApp",
			"organization_copy_of_registration_certificate",
			"organization_brochure",
			"organization_logo",
			"facebook_profile_link",
			"linkedin_profile_link",
			"twitter_profile_link",

		]


# organization membership approval form

class ApproveOrganizationMembershipForm(forms.ModelForm):

	class Meta:
		model = MemberOrganizations
		fields = [
			"physical_pre_membership_registration_form",
		]


# user registration form

class UserRegistrationForm(forms.ModelForm):
	first_name = forms.CharField(label = mark_safe('<label for="first_name">First name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'first_name'}))
	last_name = forms.CharField(label = mark_safe('<label for="last_name">Last name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'last_name'}))
	profession = forms.CharField(label = mark_safe('<label for="profession">Profession</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'profession'}))
	employer = forms.CharField(label = mark_safe('<label for="employer">Employer name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'employer'}))
	employer_address = forms.CharField(label = mark_safe('<label for="employer_address">Employer address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'employer_address'}))
	terms_of_service = forms.CharField(label = mark_safe('<label for="terms_of_service">Terms of service</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'terms_of_service'}))
	contract_ending_date = forms.CharField(label = mark_safe('<label for="contract_ending_date">Contract ending date (If on Contract indicate) </label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'datepicker'}))
	dob = forms.CharField(label = mark_safe('<label for="dob">Date of birth </label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'dob'}))
	tel1 = forms.CharField(label = mark_safe('<label for="tel1">Telephone</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'tel1'}))
	id_number = forms.CharField(label = mark_safe('<label for="id_number">Id number</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'id_number'}))
	kra_pin = forms.CharField(label = mark_safe('<label for="kra_pin">Kra pin</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'kra_pin'}))
	bank_name = forms.CharField(label = mark_safe('<label for="bank_name">Your bank name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_name'}))
	bank_branch_name = forms.CharField(label = mark_safe('<label for="bank_branch_name">Your bank branch name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_branch_name'}))
	bank_account_number = forms.IntegerField(label = mark_safe('<label for="bank_account_number">Your bank account number</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_account_number'}))
	address = forms.CharField(label = mark_safe('<label for="address">Your address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'address'}))
	email = forms.EmailField(label = mark_safe('<label for="email">Your email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'email'}))
	next_of_kin_full_name = forms.CharField(label = mark_safe('<label for="next_of_kin_full_name">Next of Kin full name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_full_name'}))
	next_of_kin_date_of_birth = forms.CharField(label = mark_safe('<label for="next_of_kin_date_of_birth">Next of Kin date of birth</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_date_of_birth'}))
	next_of_kin_relationship = forms.CharField(label = mark_safe('<label for="next_of_kin_relationship">Relationship with next of Kin</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_relationship'}))
	next_of_kin_tel = forms.CharField(label = mark_safe('<label for="next_of_kin_tel">Next of Kin tel</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_tel'}))
	next_of_kin_id_number = forms.CharField(label = mark_safe('<label for="next_of_kin_id_number">Next of Kin id number</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_id_number'}))
	next_of_kin_address = forms.CharField(label = mark_safe('<label for="next_of_kin_address">Next of Kin address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_address'}))
	next_of_kin_email = forms.EmailField(label = mark_safe('<label for="next_of_kin_email">Next of Kin email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_email'}))
	
	class Meta:
		model = SystemUser
		fields = [
			"official_designation",
			"first_name",
			"last_name",
			"profession",
			"employer",
			"employer_address",
			"terms_of_service",
			"contract_ending_date",
			"dob",
			"marital_status",
			"sex",
			"tel1",
			"id_number",
			"kra_pin",
			"bank_name",
			"bank_branch_name",
			"bank_account_number",			
			"address",
			"town",
			"email",
			"next_of_kin_full_name",
			"next_of_kin_date_of_birth",
			"next_of_kin_relationship",
			"next_of_kin_tel",
			"next_of_kin_id_number",
			"next_of_kin_address",
			"next_of_kin_town",
			"next_of_kin_email",
		]


	def clean(self, *args, **kwargs):
		tel1 = self.cleaned_data.get("tel1")
		check_new_user_tel = SystemUser.objects.filter(tel1=tel1)
		if check_new_user_tel.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(UserRegistrationForm, self).clean(*args, **kwargs)

	def clean_tel1(self):
		tel1 = self.cleaned_data.get("tel1")
		check_new_user_tel = SystemUser.objects.filter(tel1=tel1)
		if check_new_user_tel.exists():
			raise forms.ValidationError("You seem already registered. Please get in touch with our agents for more informations.")
		return tel1

	def clean(self, *args, **kwargs):
		id_number = self.cleaned_data.get("id_number")
		check_new_user_id_number = SystemUser.objects.filter(id_number=id_number)
		if check_new_user_id_number.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(UserRegistrationForm, self).clean(*args, **kwargs)

	# def clean_id_number(self):
	# 	id_number = self.cleaned_data.get("id_number")
	# 	check_new_user_id_number = SystemUser.objects.filter(id_number=id_number)
	# 	if check_new_user_id_number.exists():
	# 		raise forms.ValidationError("You seem already registered. Please get in touch with our agents for more informations.")
	# 	return id_number

	def clean(self, *args, **kwargs):
		kra_pin = self.cleaned_data.get("kra_pin")
		check_new_user_kra_pin = SystemUser.objects.filter(kra_pin=kra_pin)
		if check_new_user_kra_pin.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(UserRegistrationForm, self).clean(*args, **kwargs)

	def clean_kra_pin(self):
		kra_pin = self.cleaned_data.get("kra_pin")
		check_new_user_kra_pin = SystemUser.objects.filter(kra_pin=kra_pin)
		if check_new_user_kra_pin.exists():
			raise forms.ValidationError("You seem already registered. Please get in touch with our agents for more informations.")
		return kra_pin

	def clean(self, *args, **kwargs):
		email = self.cleaned_data.get("email")
		check_new_user_email = SystemUser.objects.filter(email=email)
		if check_new_user_email.exists():
			raise forms.ValidationError("Please correct the errors to proceed")
		return super(UserRegistrationForm, self).clean(*args, **kwargs)

	def clean_email(self):
		email = self.cleaned_data.get("email")
		check_new_user_email = SystemUser.objects.filter(email=email)
		if check_new_user_email.exists():
			raise forms.ValidationError("You seem already registered. Please get in touch with our agents for more informations.")
		return email

# Edit user form

class EditUserForm(forms.ModelForm):
	
	# town = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Town', 'required':'required'}))
	first_name = forms.CharField(label = mark_safe('<label for="first_name">First name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'first_name'}))
	
	middle_name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Middle Name'}))
	last_name = forms.CharField(label = mark_safe('<label for="last_name">Last name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'last_name'}))
	profession = forms.CharField(label = mark_safe('<label for="profession">Profession</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'profession'}))
	employer = forms.CharField(label = mark_safe('<label for="employer">Employer name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'employer'}))
	employer_address = forms.CharField(label = mark_safe('<label for="employer_address">Employer address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'employer_address'}))
	terms_of_service = forms.CharField(label = mark_safe('<label for="terms_of_service">Terms of service</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'id': 'terms_of_service'}))
	contract_ending_date = forms.CharField(label = mark_safe('<label for="contract_ending_date">Contract ending date (If on Contract indicate) </label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'datepicker'}))
	dob = forms.CharField(label = mark_safe('<label for="dob">Date of birth </label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'datepicker1'}))
	tel1 = forms.CharField(label = mark_safe('<label for="tel1">Telephone</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'tel1'}))
	tel2 = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Telephone Line 2'}))
	id_number = forms.CharField(label = mark_safe('<label for="id_number">Id number</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'id_number'}))
	kra_pin = forms.CharField(label = mark_safe('<label for="kra_pin">Kra pin</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'kra_pin'}))
	
	# bank_name = forms.CharField(label = mark_safe('<label for="bank_name">Your bank name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_name'}))
	# bank_branch_name = forms.CharField(label = mark_safe('<label for="bank_branch_name">Your bank branch name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_branch_name'}))
	# bank_account_number = forms.IntegerField(label = mark_safe('<label for="bank_account_number">Your bank account number</label>'), widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'bank_account_number'}))
	
	address = forms.CharField(label = mark_safe('<label for="address">Your address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'address'}))
	email = forms.EmailField(label = mark_safe('<label for="email">Your email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'email'}))
	next_of_kin_full_name = forms.CharField(label = mark_safe('<label for="next_of_kin_full_name">Next of Kin full name</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_full_name'}))
	# next_of_kin_date_of_birth = forms.CharField(label = mark_safe('<label for="next_of_kin_date_of_birth">Next of Kin date of birth</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_date_of_birth'}))
	next_of_kin_relationship = forms.CharField(label = mark_safe('<label for="next_of_kin_relationship">Relationship with next of Kin</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_relationship'}))
	next_of_kin_tel = forms.CharField(label = mark_safe('<label for="next_of_kin_tel">Next of Kin tel</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_tel'}))
	next_of_kin_id_number = forms.CharField(label = mark_safe('<label for="next_of_kin_id_number">Next of Kin id number</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_id_number'}))
	next_of_kin_address = forms.CharField(label = mark_safe('<label for="next_of_kin_address">Next of Kin address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_address'}))
	next_of_kin_email = forms.EmailField(label = mark_safe('<label for="next_of_kin_email">Next of Kin email address</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'next_of_kin_email'}))
	facebook_profile_link = forms.URLField(max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Facebook profile link'})) 
	twitter_profile_link = forms.URLField(max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Twitter profile link'})) 
	linkedin_profile_link = forms.URLField(max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'placeholder': 'Linkedin profile link'})) 
			
	class Meta:
		model = SystemUser
		fields = [
			"official_designation",
			"id_number",
			"first_name",
			"middle_name",
			"last_name",
			"sex",
			"dob",
			"marital_status",
			"profession",
			"employer",
			"employer_address",
			"terms_of_service",
			"contract_ending_date",
			"email",			
			"tel1",
			"tel2",
			"address",
			"town",
			"kra_pin",
			"next_of_kin_full_name",
			# "next_of_kin_date_of_birth",
			"next_of_kin_relationship",
			"next_of_kin_tel",
			"next_of_kin_id_number",
			"next_of_kin_address",
			"next_of_kin_town",
			"next_of_kin_email",			
			# "bank_name",
			# "bank_branch_name",
			# "bank_account_number",
			# "physical_membership_registration_form",
			"facebook_profile_link",
			"linkedin_profile_link",
			"twitter_profile_link",

			]

		def clean_dob(self):
			dob = self.cleaned_data.get("dob")

			if '/' in dob[:4]:

				month = dob[:2]
				day = dob[3:5]
				year = dob[6:10]

				dob = year+'-'+month+'-'+day

			return dob


		def clean_contract_ending_date(self):
			contract_ending_date = self.cleaned_data.get("contract_ending_date")

			if '/' in contract_ending_date[:4]:

				month = contract_ending_date[:2]
				day = contract_ending_date[3:5]
				year = contract_ending_date[6:10]

				contract_ending_date = year+'-'+month+'-'+day

			return contract_ending_date



# Confirm User Registration Form

class ConfirmUserRegistrationForm(forms.ModelForm):
		
	class Meta:
		model = SystemUser
		fields = [
			# "physical_membership_registration_form",

			]
			

# Add employee form

class AddEmployeeForm(forms.ModelForm):
	# position_at_loanApp = forms.CharField(label = mark_safe('<label for="position_at_loanApp">Employee position</label>'), max_length=100, widget=forms.TextInput(attrs={'class':'form-control', 'required':'required', 'id': 'position_at_loanApp'}))
		
	class Meta:
		model = SystemUser
		fields = [
			"position_at_loanApp",
			]

