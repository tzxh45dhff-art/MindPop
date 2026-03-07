from app.services.auth_service import fake_users_db

# Static data for options
LEARNING_STYLES = [
    "Visual",
    "Auditory",
    "Reading/Writing",
    "Kinesthetic",
    "Multimodal" # A mix of styles
]

# A predefined map of grades to their respective subjects. This avoids needing an API call to Gemini.
GRADE_SUBJECTS = {
    "Middle School (6-8)": [
        "Math", "Science", "English", "Social Studies", "Art", "Physical Education"
    ],
    "High School (9-12)": [
        "Algebra", "Geometry", "Calculus", "Biology", "Chemistry", 
        "Physics", "English Literature", "World History", "Computer Science"
    ],
    "College/University": [
        "Computer Science", "Engineering", "Business", "Psychology", 
        "Biology", "Arts & Humanities", "Mathematics"
    ]
}

def get_profile_options():
    return {
        "grades": list(GRADE_SUBJECTS.keys()),
        "learning_styles": LEARNING_STYLES,
        "grade_subjects_map": GRADE_SUBJECTS
    }

def update_user_profile(profile_data):
    # Find user by username
    user_record = next((u for u in fake_users_db.values() if u['username'] == profile_data.username), None)
    
    if not user_record:
        return None
    
    # Optional constraint: validate that subjects belong to the grade
    # (Leaving it flexible for the hackathon unless strict validation is requested)
    
    # Update the user record
    user_record['grade'] = profile_data.grade
    user_record['subjects'] = profile_data.subjects
    user_record['learning_style'] = profile_data.learning_style
    
    return user_record
