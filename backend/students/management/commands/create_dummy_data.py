from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from students.models import Student
from tasks.models import Task


class Command(BaseCommand):
    help = 'Create dummy students and tasks for development'

    def handle(self, *args, **options):
        # Check if dummy data already exists
        if Student.objects.filter(name__startswith='Student').exists():
            self.stdout.write(self.style.WARNING('Dummy data already exists. Skipping...'))
            return

        # Create 5 dummy students
        students_data = [
            {
                'name': 'Student One',
                'class_name': '10A',
                'age': 15,
                'email': 'student1@example.com',
                'phone': '9876543210'
            },
            {
                'name': 'Student Two',
                'class_name': '10B',
                'age': 15,
                'email': 'student2@example.com',
                'phone': '9876543211'
            },
            {
                'name': 'Student Three',
                'class_name': '10A',
                'age': 16,
                'email': 'student3@example.com',
                'phone': '9876543212'
            },
            {
                'name': 'Student Four',
                'class_name': '10C',
                'age': 15,
                'email': 'student4@example.com',
                'phone': '9876543213'
            },
            {
                'name': 'Student Five',
                'class_name': '10B',
                'age': 16,
                'email': 'student5@example.com',
                'phone': '9876543214'
            },
        ]

        students = []
        for student_data in students_data:
            student = Student.objects.create(**student_data)
            students.append(student)
            self.stdout.write(self.style.SUCCESS(f'Created student: {student.name}'))

        # Create 5 dummy tasks (one per student)
        tasks_data = [
            {
                'title': 'Mathematics Assignment',
                'description': 'Complete Chapter 5 exercises 1-10',
                'student': students[0],
                'status': 'pending',
                'due_date': timezone.now().date() + timedelta(days=7)
            },
            {
                'title': 'English Essay',
                'description': 'Write a 500-word essay on Literature',
                'student': students[1],
                'status': 'pending',
                'due_date': timezone.now().date() + timedelta(days=5)
            },
            {
                'title': 'Science Project',
                'description': 'Create a project on Solar System',
                'student': students[2],
                'status': 'completed',
                'due_date': timezone.now().date() - timedelta(days=2)
            },
            {
                'title': 'History Assignment',
                'description': 'Research and write about Medieval India',
                'student': students[3],
                'status': 'pending',
                'due_date': timezone.now().date() + timedelta(days=10)
            },
            {
                'title': 'Computer Practical',
                'description': 'Complete Python programming exercises',
                'student': students[4],
                'status': 'pending',
                'due_date': timezone.now().date() + timedelta(days=3)
            },
        ]

        for task_data in tasks_data:
            task = Task.objects.create(**task_data)
            self.stdout.write(self.style.SUCCESS(f'Created task: {task.title} for {task.student.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully created all dummy data!'))
