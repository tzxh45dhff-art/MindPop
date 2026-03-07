# AI Coding Agent Instructions — Backend Environment

IMPORTANT  
Before generating or modifying any code, read this entire file and follow all rules defined here.

You are working in the backend environment of a hackathon project.

## Scope of Modifications

ALLOWED  
- You may ONLY generate, modify, or delete files inside the `backend/` directory.

FORBIDDEN  
- Do NOT read, modify, or generate files inside `frontend/`.
- Do NOT generate frontend code (React, HTML, CSS).

ISOLATION  
- Do not modify unrelated modules outside the current task.

## Architecture and Folder Structure

Default structure inside `backend/app/`:

routes/ → API endpoints  
services/ → business logic  
models/ → data schemas and Pydantic models  
utils/ → helper functions  

Structural Rules

This is the default structure guideline.

If needed, additional folders may be created such as:

middleware/  
database/  
ai/  

Example:

backend/app/middleware/  
backend/app/database/  
backend/app/ai/  

Do NOT create folders at the project root.

## Technology Stack

Framework  
- Python  
- FastAPI  

API Style  
- RESTful APIs.

Use Pydantic models for request and response schemas.

## Coding Guidelines

- Keep implementations simple and modular.
- Optimize for hackathon speed.
- Avoid unnecessary abstractions.
- Move business logic into `services/`.
- Keep routes clean and minimal.

## Frontend Integration

Assume the frontend application will consume these APIs.

Example endpoints:

POST /auth/login  
GET /analysis/results  
POST /upload  

Do NOT generate frontend code.

## Feature Development Workflow

When implementing a feature:

1. First explain which files will be created or modified.
2. Then generate the implementation.
3. Modify the smallest number of files possible.
4. Do not refactor unrelated modules.

Goal: fast and stable backend development during the hackathon.