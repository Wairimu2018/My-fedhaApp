# Generated by Django 2.0 on 2018-10-06 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0019_testimonial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testimonial',
            name='work_position',
            field=models.CharField(max_length=25),
        ),
    ]
