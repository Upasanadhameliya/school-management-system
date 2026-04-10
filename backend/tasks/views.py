from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Task CRUD operations.
    Supports:
    - GET /api/tasks/ (list all)
    - POST /api/tasks/ (create)
    - GET /api/tasks/{id}/ (retrieve)
    - PUT /api/tasks/{id}/ (update - includes marking as completed)
    - DELETE /api/tasks/{id}/ (delete)
    """
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['patch'])
    def mark_completed(self, request, pk=None):
        """Mark a task as completed."""
        task = self.get_object()
        task.status = 'completed'
        task.save()
        serializer = self.get_serializer(task)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_student(self, request):
        """Get tasks filtered by student ID."""
        student_id = request.query_params.get('student_id')
        if student_id:
            tasks = Task.objects.filter(student_id=student_id)
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)
        return Response({"error": "student_id query parameter required"}, status=400)
