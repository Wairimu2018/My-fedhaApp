# Generated by Django 2.0 on 2018-11-02 13:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0042_auto_20181102_1335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memberorganizations',
            name='pre_membership_approved_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pre_membership_approved_by', to='main_app.SystemUser'),
        ),
        migrations.AlterField(
            model_name='memberorganizations',
            name='request_viewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pre_membership_request_viewed_by', to='main_app.SystemUser'),
        ),
    ]