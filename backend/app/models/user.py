from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    name: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    name: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
