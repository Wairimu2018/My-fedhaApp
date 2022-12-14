# Generated by Django 2.0 on 2018-12-05 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0060_auto_20181204_2030'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertransactions',
            name='amount_transacted_in_mpesa',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='mpesa_transaction_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='mpesa_transaction_timestamp',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='number_used_for_mpesa_transaction',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='transaction_confirmed_by_mpesa_api',
            field=models.BooleanField(default=False),
        ),
    ]
