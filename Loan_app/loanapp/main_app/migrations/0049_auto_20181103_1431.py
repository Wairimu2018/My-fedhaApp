# Generated by Django 2.0 on 2018-11-03 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0048_auto_20181102_1737'),
    ]

    operations = [
        migrations.AddField(
            model_name='systemuser',
            name='account_verified_by',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='systemuser',
            name='membership_account_approved_on_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
