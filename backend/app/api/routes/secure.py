from fastapi import APIRouter, HTTPException, status, Depends
from app.dependency.auth_dependency import get_current_user
secure_router = APIRouter(prefix="/secure", tags=["Secure"])

@secure_router.get("/user_info")
async def secure_user_info(current_user = Depends(get_current_user)):
    return {"msg":"Access Granted", "user":current_user}