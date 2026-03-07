from pydantic import BaseModel
from typing import List, Dict

class ProfileUpdate(BaseModel):
    username: str
    grade: str
    subjects: List[str]
    learning_style: str

class ProfileOptionsResponse(BaseModel):
    grades: List[str]
    learning_styles: List[str]
    grade_subjects_map: Dict[str, List[str]]
