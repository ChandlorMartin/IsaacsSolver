# Generated by Django 5.0.7 on 2024-08-21 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Material",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
                (
                    "linear_coefficient",
                    models.DecimalField(decimal_places=10, max_digits=10),
                ),
                (
                    "volumetric_coefficient",
                    models.DecimalField(decimal_places=10, max_digits=10),
                ),
                ("remove", models.BooleanField(verbose_name=False)),
            ],
        ),
    ]
