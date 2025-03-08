## Setup Instructions


### Frontend Setup

1. In a new terminal, navigate to your project root and create a React app:


```shellscript
# From the project root
npx create-react-app frontend --template typescript
cd frontend
```

2. Install required dependencies:


```shellscript
npm install react-router-dom axios react-hook-form @hookform/resolvers yup react-quill react-hot-toast date-fns
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
```

3. Initialize Tailwind CSS:


```shellscript
npx tailwindcss init -p
```

4. Copy the frontend files from the code project above into your frontend directory.
5. Create a `.env` file in the frontend directory based on the `.env.example` file:


```plaintext
REACT_APP_API_URL=http://localhost:3001
```

6. Start the frontend development server:


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