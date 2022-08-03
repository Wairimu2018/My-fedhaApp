# Generated by Django 2.0 on 2018-11-11 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0054_ourservices_service_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceCategories',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('slug', models.SlugField(blank=True, max_length=5000, null=True, unique=True)),
                ('added_on_date_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='ourservices',
            name='service_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main_app.ServiceCategories'),
            preserve_default=False,
        ),
    ]
