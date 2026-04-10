from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Student CRUD operations.
    Supports:
    - GET /api/students/ (list all)
    - POST /api/students/ (create)
    - GET /api/students/{id}/ (retrieve)
    - PUT /api/students/{id}/ (update)
    - DELETE /api/students/{id}/ (delete)
    """
    queryset = Student.objects.all().order_by('id')
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        """Get all tasks for a specific student."""
        student = self.get_object()
        tasks = student.tasks.all().order_by('id')
        from tasks.serializers import TaskSerializer
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
