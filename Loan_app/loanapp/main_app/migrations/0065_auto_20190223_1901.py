# Generated by Django 2.0 on 2019-02-23 19:01

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0064_auto_20190222_1532'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydetails',
            name='about_company',
            field=ckeditor.fields.RichTextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='companydetails',
            name='about_company_image',
            field=models.FileField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]