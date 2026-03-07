from fastapi import APIRouter, HTTPException, status
from app.models.profile import ProfileUpdate, ProfileOptionsResponse
from app.services import profile_service

router = APIRouter()

@router.get("/options", response_model=ProfileOptionsResponse)
def get_options():
    """
    Returns the available grades, learning styles, and a map of grades to subjects.
    The frontend can use this to dynamically populate dropdowns.
    """
    return profile_service.get_profile_options()

@router.put("/complete")
def complete_profile(profile: ProfileUpdate):
    """
    Updates the user's profile with their grade, selected subjects, and learning style.
    """
    updated_user = profile_service.update_user_profile(profile)
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )
        
    return {
        "message": "Profile updated successfully",
        "profile": {
            "username": updated_user["username"],
            "grade": updated_user.get("grade"),
            "subjects": updated_user.get("subjects"),
            "learning_style": updated_user.get("learning_style")
        }
    }
