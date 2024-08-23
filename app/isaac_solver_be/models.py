from django.db import models

# Create your models here.
class Material(models.Model):
    name = models.CharField(max_length=20)
    linear_coefficient = models.DecimalField(decimal_places=10, max_digits=10)
    volumetric_coefficient = models.DecimalField(decimal_places=10, max_digits=10)
    remove = models.BooleanField(False)