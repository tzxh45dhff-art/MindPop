# AI Coding Agent Instructions — Frontend Environment

IMPORTANT  
Before generating or modifying any code, read this entire file and follow all rules defined here.

You are working in the frontend environment of a hackathon project.

## Scope of Modifications

ALLOWED  
- You may ONLY generate, modify, or delete files inside the `frontend/` directory.

FORBIDDEN  
- Do NOT read, modify, or generate any files inside `backend/`.

ISOLATION  
- Do not modify unrelated files outside the current feature or task.

## Architecture and Folder Structure

Default structure inside `frontend/src/`:

components/ → reusable UI components  
pages/ → page-level views  
services/ → API calls and data fetching  
styles/ → global styling  

Structural Rules

This is the default structure guideline.

If a feature requires additional folders (for example `hooks/`, `context/`, `types/`, `utils/`), you may create them inside `frontend/src/`.

Example:

frontend/src/hooks/  
frontend/src/context/  

Do NOT create folders at the project root.

## Technology Stack

Framework  
- React  
- Functional components only  
- Modern React hooks  

Do NOT use React class components.

Styling  
- Use Tailwind CSS.

Dependencies  
- Avoid unnecessary external libraries.

## Coding Guidelines

- Write modular and reusable components.
- Follow DRY principles.
- Keep code simple and readable.
- Optimize for hackathon speed.

## API Integration

Assume backend APIs already exist or are being developed in parallel.

Use placeholder endpoints when necessary:

/api/v1/resource

If backend APIs are unavailable, mock responses inside `services/`.

## Feature Development Workflow

When implementing a feature:

1. First explain which files will be created or modified.
2. Then generate the implementation.
3. Modify the smallest number of files possible.
4. Do not refactor unrelated code.

Goal: stable and fast development during the hackathon.