from django.db import models


class Student(models.Model):
    """
    Student model for school management system.
    Stores student information and tracks creation/update timestamps.
    """
    name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=50)
    age = models.IntegerField()
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - Class {self.class_name}"

    class Meta:
        ordering = ['-created_at']
