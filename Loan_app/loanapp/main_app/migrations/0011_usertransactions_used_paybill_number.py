# Generated by Django 2.0 on 2018-09-23 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0010_auto_20180923_1031'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertransactions',
            name='used_paybill_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
