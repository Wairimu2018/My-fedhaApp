# Generated by Django 2.0 on 2018-09-21 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='systemuser',
            name='cleared_for_loan',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='systemuser',
            name='cleared_for_loan_on_date_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='systemuser',
            name='started_deposit_on_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='systemuser',
            name='town',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
