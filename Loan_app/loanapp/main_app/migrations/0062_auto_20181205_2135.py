# Generated by Django 2.0 on 2018-12-05 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0061_auto_20181205_2112'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydetails',
            name='current_mpesa_access_token',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='companydetails',
            name='current_mpesa_access_token_generated_on_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
