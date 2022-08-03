# Generated by Django 2.0 on 2018-10-06 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0021_news'),
    ]

    operations = [
        migrations.RenameField(
            model_name='news',
            old_name='posted_by',
            new_name='author',
        ),
        migrations.RenameField(
            model_name='news',
            old_name='added_on_date_time',
            new_name='posted_on_date_time',
        ),
        migrations.AddField(
            model_name='news',
            name='image',
            field=models.FileField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]