import hashlib
import uuid

def hash_password(password: str) -> str:
    # Simple SHA-256 hashing for demonstration
    return hashlib.sha256(password.encode()).hexdigest()

# In-memory database for rapid hackathon development. 
fake_users_db = {
    # Default user pre-populated
    "default-user-id": {
        "id": "default-user-id",
        "username": "jais",
        "name": "Jais",
        "hashed_password": hash_password("0000")
    }
}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def create_user(user_data):
    # Check if username already exists
    if user_data.username in [u['username'] for u in fake_users_db.values()]:
        return None
    
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)
    
    user_record = {
        "id": user_id,
        "username": user_data.username,
        "name": user_data.name,
        "hashed_password": hashed_password
    }
    
    fake_users_db[user_id] = user_record
    return user_record

def authenticate_user(login_data):
    # Find user by username
    user_record = next((u for u in fake_users_db.values() if u['username'] == login_data.username), None)
    if not user_record:
        return None
        
    # Verify password
    if not verify_password(login_data.password, user_record['hashed_password']):
        return None
        
    return user_record
