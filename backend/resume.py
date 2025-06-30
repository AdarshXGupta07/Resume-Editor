
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str

class Experience(BaseModel):
    id: str
    company: str
    position: str
    duration: str
    description: str

class Education(BaseModel):
    id: str
    institution: str
    degree: str
    year: str
    description: str

class Resume(BaseModel):
    personalInfo: PersonalInfo
    summary: str
    experience: List[Experience]
    education: List[Education]
    skills: List[str]

class AIEnhanceRequest(BaseModel):
    section: str
    content: Any

class SaveResumeRequest(BaseModel):
    resume: Dict[str, Any]
