# Generated by Django 2.0 on 2019-02-25 20:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0066_systemuser_profile_image_local_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoansRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('loan_code', models.CharField(max_length=50)),
                ('amount_taken', models.IntegerField()),
                ('amount_given_to_client', models.IntegerField()),
                ('loan_original_interest', models.IntegerField(default=0)),
                ('cumulative_interest', models.IntegerField(default=0)),
                ('total_interest', models.IntegerField(default=0)),
                ('amount_remained_to_refund', models.IntegerField()),
                ('current_amount_refunded', models.IntegerField(default=0)),
                ('requested_on_date_time', models.DateTimeField(auto_now_add=True)),
                ('loan_granted', models.BooleanField(default=False)),
                ('granted_on_date_time', models.DateTimeField(blank=True, null=True)),
                ('loan_refunded', models.BooleanField(default=False)),
                ('refund_completed_on_date_time', models.DateTimeField(blank=True, null=True)),
                ('loan_request_rejected', models.BooleanField(default=False)),
                ('loan_request_rejected_on_date_time', models.DateTimeField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('granted_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='loan_granted_by', to='main_app.SystemUser')),
                ('loan_request_rejected_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='loan_request_rejected_by', to='main_app.SystemUser')),
                ('refund_verified_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='loan_refund_verified_by', to='main_app.SystemUser')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='loan_of_user', to='main_app.SystemUser')),
            ],
        ),
        migrations.AddField(
            model_name='usertransactions',
            name='loan_record',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main_app.LoansRecord'),
        ),
    ]
