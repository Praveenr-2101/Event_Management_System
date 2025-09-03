
##  Backend Setup (Django + DRF)

### 1. Clone the repo

git clone https://github.com/Praveenr-2101/Event_Management_System.git
cd Event_Management_System/backend

2. Setup environment

Create a .env file in /backend/config/:
env
Copy code
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://username:password@localhost:5432/event_db
ALLOWED_HOSTS=*


3. Install dependencies with Poetry
   
poetry install


5. Run migrations

poetry run python manage.py migrate

5. Create superuser (if needed)

poetry run python manage.py createsuperuser

6. Start the server
poetry run python manage.py runserver
Backend runs at → http://127.0.0.1:8000/

**Admin Credentials**

You can log in using:
Email: praveen@gmail.com
Password: 123456

Admin panel: http://127.0.0.1:8000/admin/
