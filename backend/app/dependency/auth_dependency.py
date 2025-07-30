from fastapi import Header,HTTPException, status
from app.utils.jwt import verify_access_token

async def get_current_user(authorization:str = Header(...)):
    scheme,_,token = authorization.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid auth scheme")
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid or expried token")
    return payload