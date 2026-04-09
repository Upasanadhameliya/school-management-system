from rest_framework import serializers
from .models import Task
from students.models import Student


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task model."""
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'student', 'student_name', 'status', 'due_date', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_student(self, value):
        """Validate that student exists."""
        if not Student.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Student does not exist.")
        return value
