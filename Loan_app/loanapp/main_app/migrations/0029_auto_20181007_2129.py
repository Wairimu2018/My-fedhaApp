# Generated by Django 2.0 on 2018-10-07 21:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0028_messagges'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messagges',
            name='attended_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main_app.SystemUser'),
        ),
    ]
