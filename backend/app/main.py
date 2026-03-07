from fastapi import FastAPI
from app.routes import auth, profile

app = FastAPI(title="Hackathon Backend API")

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(profile.router, prefix="/profile", tags=["profile"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backend API is running"}
