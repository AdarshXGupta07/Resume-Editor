
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List
import json
import os

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for resumes
resumes_db: Dict[str, Any] = {}

# Pydantic models for request/response validation
class AIEnhanceRequest(BaseModel):
    section: str
    content: Any

class AIEnhanceResponse(BaseModel):
    enhanced_content: Any

class SaveResumeRequest(BaseModel):
    resume: Dict[str, Any]

class SaveResumeResponse(BaseModel):
    status: str
    message: str

# Mock AI Enhancement endpoint
@app.post("/ai-enhance", response_model=AIEnhanceResponse)
async def enhance_section(request: AIEnhanceRequest):
    """
    Mock AI enhancement endpoint that improves resume section content
    """
    try:
        section = request.section
        content = request.content
        
        # Mock enhancement logic based on section type
        if section == "summary":
            enhanced_content = f"Enhanced: {content} - With proven expertise in delivering high-impact solutions and driving business growth through innovative technology implementations."
        
        elif section == "experience":
            if isinstance(content, list):
                enhanced_content = []
                for exp in content:
                    enhanced_exp = exp.copy()
                    enhanced_exp["description"] = f"Enhanced: {exp.get('description', '')} - Demonstrated exceptional leadership and technical skills while consistently exceeding performance targets."
                    enhanced_content.append(enhanced_exp)
            else:
                enhanced_content = f"Enhanced: {content}"
        
        elif section == "education":
            if isinstance(content, list):
                enhanced_content = []
                for edu in content:
                    enhanced_edu = edu.copy()
                    enhanced_edu["description"] = f"Enhanced: {edu.get('description', '')} - Achieved academic excellence with strong foundation in core principles and practical applications."
                    enhanced_content.append(enhanced_edu)
            else:
                enhanced_content = f"Enhanced: {content}"
        
        elif section == "skills":
            if isinstance(content, list):
                enhanced_content = content + ["Leadership", "Problem Solving", "Communication", "Strategic Planning"]
            else:
                enhanced_content = f"Enhanced: {content}"
        
        elif section == "personalInfo":
            if isinstance(content, dict):
                enhanced_content = content.copy()
                enhanced_content["name"] = content.get("name", "") + " (Professional)"
            else:
                enhanced_content = f"Enhanced: {content}"
        
        else:
            enhanced_content = f"AI-enhanced: {content}"
        
        return AIEnhanceResponse(enhanced_content=enhanced_content)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error enhancing content: {str(e)}")

# Save Resume endpoint
@app.post("/save-resume", response_model=SaveResumeResponse)
async def save_resume(request: SaveResumeRequest):
    """
    Save resume data to in-memory storage or file
    """
    try:
        resume_data = request.resume
        
        # Generate a simple ID based on personal info
        resume_id = "latest"
        if "personalInfo" in resume_data and "name" in resume_data["personalInfo"]:
            resume_id = resume_data["personalInfo"]["name"].replace(" ", "_").lower()
        
        # Store in memory
        resumes_db[resume_id] = resume_data
        
        # Optionally save to file
        storage_dir = "storage"
        if not os.path.exists(storage_dir):
            os.makedirs(storage_dir)
        
        with open(f"{storage_dir}/resumes.json", "w") as f:
            json.dump(resumes_db, f, indent=2)
        
        return SaveResumeResponse(
            status="success",
            message=f"Resume saved successfully with ID: {resume_id}"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving resume: {str(e)}")

# Get saved resumes (bonus endpoint)
@app.get("/resumes")
async def get_resumes():
    """
    Get all saved resumes
    """
    return {"resumes": resumes_db}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Resume Editor API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
