# Generated by Django 2.0 on 2018-10-06 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0024_auto_20181006_1916'),
    ]

    operations = [
        migrations.AddField(
            model_name='systemuser',
            name='membership_account_approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='systemuser',
            name='membership_account_approved_by_user',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]