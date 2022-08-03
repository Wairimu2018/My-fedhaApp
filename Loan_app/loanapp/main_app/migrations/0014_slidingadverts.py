# Generated by Django 2.0 on 2018-10-06 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0013_auto_20181006_1210'),
    ]

    operations = [
        migrations.CreateModel(
            name='SlidingAdverts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slider_image', models.FileField(upload_to='')),
                ('title', models.CharField(max_length=50)),
                ('short_details', models.CharField(max_length=100)),
                ('button_name', models.CharField(max_length=15)),
                ('button_link', models.URLField(max_length=1000)),
                ('active', models.FileField(default=True, upload_to='')),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('added_on_date_time', models.DateTimeField(auto_now_add=True)),
                ('sliding_advert_added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_app.SystemUser')),
            ],
        ),
    ]