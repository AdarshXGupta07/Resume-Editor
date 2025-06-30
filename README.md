
# Web-Based Resume Editor

A modern, professional web-based resume editor built with React and TypeScript frontend and FastAPI backend that allows users to upload, edit, enhance, and download their resumes with AI-powered content improvement.

## Features

- **Resume Upload**: Upload PDF or DOCX files with mock parsing functionality
- **Interactive Editing**: Edit all resume sections including personal info, summary, experience, education, and skills
- **AI Enhancement**: Real AI-powered content improvement for each section via FastAPI backend
- **Save & Download**: Save resumes to backend and download as JSON files
- **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **Real-time Updates**: Instant preview of changes as you edit

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** for icons

### Backend
- **FastAPI** with Python 3.8+
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- **CORS** middleware for frontend communication

## Project Structure

```
resume-editor/
├── frontend/                  # React.js frontend application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ResumeUpload.tsx
│   │   │   ├── EditableSection.tsx
│   │   │   ├── AIEnhanceButton.tsx
│   │   │   └── DownloadButton.tsx
│   │   ├── pages/             # Main views
│   │   │   └── EditorPage.tsx # Main resume editor interface
│   │   ├── utils/             # Helper functions
│   │   │   ├── api.ts         # API calls to backend
│   │   │   └── mockParser.ts  # Mock resume parsing logic
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx
│   └── package.json
│
├── backend/                   # FastAPI backend
│   ├── main.py                # FastAPI app and routes
│   ├── models/                # Data models
│   │   └── resume.py          # Resume schema/structure
│   ├── storage/               # File-based storage
│   │   └── resumes.json       # Saved resumes
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend setup instructions
│
└── README.md                  # Overall project setup
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn package manager
- pip package manager

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Verify backend is running**
   - API: http://localhost:8000
   - Interactive Docs: http://localhost:8000/docs

### Frontend Setup

1. **Navigate to the project root (where frontend code is)**
   ```bash
   # If you're in backend/, go back to root
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
# Use a production ASGI server like Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## API Endpoints

The FastAPI backend provides the following endpoints:

### POST /ai-enhance
Enhance resume section content with AI.

**Request:**
```json
{
  "section": "summary",
  "content": "Experienced software developer..."
}
```

**Response:**
```json
{
  "enhanced_content": "Enhanced: Experienced software developer... - With proven expertise in delivering high-impact solutions..."
}
```

### POST /save-resume
Save complete resume data to backend storage.

**Request:**
```json
{
  "resume": {
    "personalInfo": {"name": "John Doe", "email": "john@example.com"},
    "summary": "...",
    "experience": [...],
    "education": [...],
    "skills": [...]
  }
}
```

### GET /health
Health check endpoint to verify backend connectivity.

## Usage

### 1. Upload Resume
- Click on the upload area or drag and drop a PDF/DOCX file
- The system will mock parse the file and populate with sample data

### 2. Edit Resume Sections
- **Personal Information**: Edit name, email, and phone number
- **Professional Summary**: Write or edit your career summary
- **Work Experience**: Add, edit, or remove work experience entries
- **Education**: Manage your educational background
- **Skills**: Add or remove skills using tags

### 3. AI Enhancement
- Click the "Enhance with AI" button next to any section
- The system will send content to the FastAPI backend for enhancement
- Review and keep or modify the enhanced content

### 4. Save and Download
- **Save Resume**: Saves the current resume data to the FastAPI backend
- **Download JSON**: Downloads your resume as a JSON file

## Development

### Adding New Features

**Frontend:**
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update API calls in `src/utils/api.ts`

**Backend:**
1. Add new routes in `backend/main.py`
2. Define data models in `backend/models/`
3. Update the API documentation

### Error Handling

The application includes comprehensive error handling:
- Backend connectivity checks
- Fallback to mock data if backend is unavailable
- User-friendly error messages
- Console logging for debugging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (both frontend and backend)
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Real PDF/DOCX parsing using libraries like pdf-parse or mammoth
- User authentication and session management
- Multiple resume templates
- Real AI integration (OpenAI, Anthropic, etc.)
- Database integration (PostgreSQL, MongoDB)
- Resume analytics and optimization tips
- Export to PDF/DOCX formats
- Collaborative editing features

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and FastAPI
