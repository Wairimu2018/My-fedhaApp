# Generated by Django 2.0 on 2018-09-23 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0007_auto_20180922_2037'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydetails',
            name='mpesa_paybill_number',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
