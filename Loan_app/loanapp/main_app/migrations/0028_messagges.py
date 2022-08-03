# Generated by Django 2.0 on 2018-10-07 21:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0027_auto_20181007_1429'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messagges',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50)),
                ('subject', models.CharField(max_length=50)),
                ('message', models.CharField(max_length=1000)),
                ('attended', models.BooleanField(default=True)),
                ('attended_on_datetime', models.DateTimeField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('added_on_date_time', models.DateTimeField(auto_now_add=True)),
                ('attended_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.SystemUser')),
            ],
        ),
    ]