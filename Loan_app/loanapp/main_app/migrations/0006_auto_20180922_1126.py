# Generated by Django 2.0 on 2018-09-22 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0005_auto_20180922_0856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertransactions',
            name='transaction_type',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='usertransactions',
            name='used_payment_method',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]