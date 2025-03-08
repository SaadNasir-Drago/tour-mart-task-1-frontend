## Setup Instructions


### Frontend Setup

1. In a new terminal, clone the frontend directory:


```shellscript
git clone <URL>
```

2. Install required dependencies:


```shellscript
npm install
```

3. Copy the frontend files from the code project above into your frontend directory.
4. Create a `.env` file in the frontend directory based on the `.env.example` file:


```plaintext
REACT_APP_API_URL=http://localhost:3001
```

5. Start the frontend development server:


```shellscript
npm start
```

## Accessing the Application

- Backend API: [http://localhost:3001](http://localhost:3001)
- Swagger Documentation: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- Frontend: [http://localhost:3000](http://localhost:3000)


## Features

### Backend

- User authentication with JWT
- CRUD operations for blog posts
- Authorization checks for post editing/deletion
- API documentation with Swagger


### Frontend

- User registration and login
- Blog post listing and search
- Rich text editing with React Quill
- Form validation with react-hook-form and yup
- Responsive design with Tailwind CSS
- User profile page


## Project Structure

```plaintext
blog-platform/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── posts/          # Posts module
│   │   ├── users/          # Users module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── contexts/       # Context providers
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── App.tsx
    │   └── index.tsx
    ├── .env
    └── package.json
```
