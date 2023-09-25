from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'My custom Django command'

    def handle(self, *args, **options):
        # 명령 실행 로직을 여기에 작성합니다.
        self.stdout.write(self.style.SUCCESS('Custom command executed successfully'))