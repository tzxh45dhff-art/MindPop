from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class ProfileUpdate(BaseModel):
    username: str
    grade: str
    subjects: List[str]
    learning_style: str

class ProfileOptionsResponse(BaseModel):
    grades: List[str]
    learning_styles: List[str]
    grade_subjects_map: Dict[str, List[str]]
    grade_subjects_details: Optional[Dict[str, List[Any]]] = None
    learning_style_details: Optional[List[Any]] = None
