from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    """Serializer for Student model."""
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'name', 'class_name', 'age', 'email', 'phone', 'tasks', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def get_tasks(self, obj):
        """Get all tasks for this student."""
        from tasks.serializers import TaskSerializer
        tasks = obj.tasks.all()
        return TaskSerializer(tasks, many=True).data
