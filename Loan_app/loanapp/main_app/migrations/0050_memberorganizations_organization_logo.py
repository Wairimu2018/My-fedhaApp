# Generated by Django 2.0 on 2018-11-03 15:37

from django.db import migrations, models
import main_app.validators


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0049_auto_20181103_1431'),
    ]

    operations = [
        migrations.AddField(
            model_name='memberorganizations',
            name='organization_logo',
            field=models.FileField(blank=True, null=True, upload_to='', validators=[main_app.validators.validate_file_extension]),
        ),
    ]
