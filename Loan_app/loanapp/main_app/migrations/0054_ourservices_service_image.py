# Generated by Django 2.0 on 2018-11-05 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0053_auto_20181105_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='ourservices',
            name='service_image',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]