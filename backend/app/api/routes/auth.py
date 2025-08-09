from fastapi import APIRouter,Depends, HTTPException, status
from asyncpg import PostgresError
from app.db.connection import db
from app.utils.hash import hash_password, verify_password
from app.utils.jwt import create_access_token
from pydantic import BaseModel,EmailStr
from app.dependency.auth_dependency import get_current_user

auth_router = APIRouter(prefix="/auth", tags=["auth"])

class SignupData(BaseModel):
    name:str
    email:EmailStr
    password:str
    role:str

class SigninData(BaseModel):
    email: EmailStr
    password:str
    role:str

@auth_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(payload:SignupData):
    user_type = payload.role.lower()
    if user_type not in ['attendee', 'proctor']:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role"
        )
    # checking if email already exists
    user = await db.fetchrow(f"SELECT {user_type}_id FROM {user_type} WHERE email = $1",payload.email)

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registred"
        )

    #hashing the password
    try:
        hashed_psss = hash_password(payload.password)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="password hashing failed"
        )

    #Insert into database
    try:
        await db.execute(
            f"""
    INSERT INTO {user_type}(name, email, password)
    VALUES ($1,$2,$3)
""",
payload.name, payload.email, hashed_psss
        )
        return {"message":"User Registred Successfully"}
    except PostgresError as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database Error"
        )

@auth_router.post("/signin", status_code=status.HTTP_202_ACCEPTED)
async def signin(payload:SigninData):
    user_type = payload.role.lower()
    if user_type not in ['attendee', 'proctor']:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role"
        )
    # checking is user exists
    user = await db.fetchrow(f"SELECT * FROM {user_type} WHERE email = $1",payload.email)
    print(dict(user))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid username"
        )

    #matching the password
    hashed_password = user["password"]
    if not verify_password(hashed_password, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Pssword"
        )

    token = create_access_token({"user_id":user[f"{user_type}_id"], "email":user["email"], "role":user_type })
    return {
        "access_token":token,
        "token_type":"bearer"
    }

@auth_router.get("/me")
async def get_user_info(user=Depends(get_current_user)):
    # user dict should contain at least user_id and role
    user_id = user.get("user_id")
    role = user.get("role")

    if not user_id or not role:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    # Fetch user info based on role
    if role == "proctor":
        query = "SELECT proctor_id as id, name, email FROM proctor WHERE proctor_id = $1"
    else:  # attendee
        query = "SELECT attendee_id as id, name, email FROM attendee WHERE attendee_id = $1"

    user_info = await db.fetchrow(query, user_id)

    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "id": user_info["id"],
        "name": user_info["name"],
        "email": user_info["email"],
        "role": role,
    }
