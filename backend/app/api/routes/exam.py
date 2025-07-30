from fastapi import APIRouter, HTTPException, status, Depends
from asyncpg import PostgresError
from app.db.connection import db
from pydantic import BaseModel
from app.dependency.auth_dependency import get_current_user
from app.api.routes.questions import questions_router

exam_router = APIRouter(prefix="/exam")
exam_router.include_router(questions_router)

class ExamData(BaseModel):
    title:str
    subject:str
    duration:int
    access_token:str


@exam_router.post("/create")
async def create_exam(payload:ExamData, user = Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only proctors can create exams"
        )
    
    try:
        await db.execute(
            """
            INSERT INTO exams (title, subject, duration, date, proctor_id)
            VALUES ($1, $2, $3, $4, $5)
            """,
            payload.title,
            payload.subject,
            payload.duration,
            payload.date,
            user["user_id"]
        )
        return {"message": "Exam created successfully"}
    except PostgresError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during exam creation"
        )

