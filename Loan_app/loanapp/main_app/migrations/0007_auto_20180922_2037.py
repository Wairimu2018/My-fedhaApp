# Generated by Django 2.0 on 2018-09-22 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0006_auto_20180922_1126'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydetails',
            name='minimum_loan_limit',
            field=models.IntegerField(default=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
