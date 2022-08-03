# Generated by Django 2.0 on 2018-09-19 15:03

from django.db import migrations, models
import django.db.models.deletion
import main_app.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccessLevel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('tag', models.CharField(max_length=40)),
                ('active', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deletedDate', models.DateField(blank=True, null=True)),
                ('deleteTime', models.TimeField(blank=True, null=True)),
                ('addedDate', models.DateField(auto_now_add=True)),
                ('addedTime', models.TimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='AccessLevelRight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deletedDate', models.DateField(blank=True, null=True)),
                ('deleteTime', models.TimeField(blank=True, null=True)),
                ('addedDate', models.DateField(auto_now_add=True)),
                ('addedTime', models.TimeField(auto_now_add=True)),
                ('access_level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.AccessLevel')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=50)),
                ('company_logo', models.FileField(blank=True, null=True, upload_to='', validators=[main_app.validators.validate_file_extension])),
                ('firebase_url', models.CharField(max_length=2000, unique=True)),
                ('email', models.EmailField(max_length=50)),
                ('tel1', models.CharField(max_length=20)),
                ('tel2', models.CharField(blank=True, max_length=20, null=True)),
                ('address', models.CharField(blank=True, max_length=150, null=True)),
                ('facebook_profile_link', models.URLField(blank=True, null=True)),
                ('linkedin_profile_link', models.URLField(blank=True, null=True)),
                ('twitter_profile_link', models.URLField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('added_on_date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='LoginTokens',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=50)),
                ('active', models.BooleanField(default=True)),
                ('is_next', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('generated_on_date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temporary_password', models.CharField(max_length=200)),
                ('used', models.BooleanField(default=True)),
                ('active', models.BooleanField(default=True)),
                ('recovery_requested_on_date', models.DateField(auto_now_add=True)),
                ('recovery_requested_at_time', models.TimeField(auto_now_add=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Right',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('tag', models.CharField(max_length=40)),
                ('active', models.BooleanField(default=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deletedDate', models.DateField(blank=True, null=True)),
                ('deleteTime', models.TimeField(blank=True, null=True)),
                ('addedDate', models.DateField(auto_now_add=True)),
                ('addedTime', models.TimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='SystemUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firebase_id', models.CharField(blank=True, max_length=1000, null=True, unique=True)),
                ('first_name', models.CharField(max_length=50)),
                ('middle_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50)),
                ('sex', models.CharField(blank=True, max_length=20, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('profession', models.CharField(blank=True, max_length=50, null=True)),
                ('town', models.CharField(max_length=50)),
                ('profile_image_url', models.CharField(blank=True, max_length=2000, null=True)),
                ('id_copy_url', models.CharField(blank=True, max_length=2000, null=True)),
                ('id_number', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(max_length=50)),
                ('password', models.CharField(max_length=500)),
                ('tel1', models.CharField(max_length=20)),
                ('tel2', models.CharField(blank=True, max_length=20, null=True)),
                ('address', models.CharField(blank=True, max_length=150, null=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_employee', models.BooleanField(default=False)),
                ('rating', models.IntegerField(default=0)),
                ('number_of_ratings', models.IntegerField(default=0)),
                ('number_of_raters', models.IntegerField(default=0)),
                ('facebook_profile_link', models.URLField(blank=True, null=True)),
                ('linkedin_profile_link', models.URLField(blank=True, null=True)),
                ('twitter_profile_link', models.URLField(blank=True, null=True)),
                ('active', models.BooleanField(default=True)),
                ('account_verified', models.BooleanField(default=False)),
                ('account_verified_on_date_time', models.DateTimeField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('deleted', models.BooleanField(default=False)),
                ('deleted_on_date_time', models.DateTimeField(blank=True, null=True)),
                ('added_on_date', models.DateTimeField(auto_now_add=True)),
                ('access_level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main_app.AccessLevel')),
            ],
        ),
        migrations.AddField(
            model_name='passwordreset',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.SystemUser'),
        ),
        migrations.AddField(
            model_name='logintokens',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.SystemUser'),
        ),
        migrations.AddField(
            model_name='accesslevelright',
            name='right',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.Right'),
        ),
    ]
