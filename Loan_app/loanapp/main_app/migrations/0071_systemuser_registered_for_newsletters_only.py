# Generated by Django 2.0 on 2019-02-28 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0070_loansrecord_loan_due_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='systemuser',
            name='registered_for_newsletters_only',
            field=models.BooleanField(default=False),
        ),
    ]
