# Generated by Django 2.0 on 2019-02-21 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0062_auto_20181205_2135'),
    ]

    operations = [
        migrations.RenameField(
            model_name='memberorganizations',
            old_name='how_did_you_know_about_meziz',
            new_name='how_did_you_know_about_loanApp',
        ),
        migrations.RenameField(
            model_name='systemuser',
            old_name='position_at_meziz',
            new_name='position_at_loanApp',
        ),
    ]
