# Event Management System

A full-stack **Event Management CRUD Application** built with:  
- **Backend:** Django REST Framework + PostgreSQL  
- **Frontend:** Next.js + Tailwind CSS  
- **Authentication:** JWT (JSON Web Token)  


##  Features
- User authentication with JWT (login, register, logout)  
- Secure credential storage using `.env` files  
- Event CRUD (Create, Read, Update, Delete)  
- Responsive UI with Tailwind CSS  
- Search and filter events by title  
- Protected routes (only authenticated users can access certain pages)  


##  Tech Stack
### Backend
- Django 5  
- Django REST Framework (DRF)  
- PostgreSQL  
- SimpleJWT for authentication  
- Poetry for dependency management  

### Frontend
- Next.js 14  
- Tailwind CSS  
- Axios for API calls  



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


**Frontend Setup (Next.js)**

1. Go to frontend
cd ../frontend

2. Setup environment
Create a .env.local file in /frontend:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

3. Install dependencies
npm install

4. Start development server
npm run dev
Frontend runs at → http://localhost:3000/

**Available Pages**
/auth/login → User login

/auth/register → User registration

/dashboard → Dashboard page

/events → List all events

/events/new → Create new event

/events/[id] → View event details

/events/[id]/edit → Edit event

/profile → User profile

**Authentication**

JWT tokens stored securely using .env configuration.
Access token + Refresh token flow implemented.
Protected routes redirect unauthenticated users to login page.


**Backend**

poetry run python manage.py migrate   
poetry run python manage.py runserver 


**Frontend**

npm run dev     
npm run build   
npm run start  
