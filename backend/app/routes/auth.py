from fastapi import APIRouter, HTTPException, status
from app.models.user import UserCreate, UserLogin, UserResponse, TokenResponse
from app.services import auth_service

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate):
    new_user = auth_service.create_user(user)
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Username already registered"
        )
    return new_user

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin):
    authenticated_user = auth_service.authenticate_user(user)
    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid username or password"
        )
    
    # Generate a simple mock JWT token for the hackathon
    access_token = f"mock-jwt-token-{authenticated_user['id']}"
    return {"access_token": access_token, "token_type": "bearer"}
