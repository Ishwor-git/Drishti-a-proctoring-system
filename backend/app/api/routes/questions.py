from fastapi import APIRouter, HTTPException, status, Depends
from asyncpg import PostgresError
from app.db.connection import db
from pydantic import BaseModel
from app.dependency.auth_dependency import get_current_user

questions_router = APIRouter(prefix="questions")

class QuestionData(BaseModel):
    exam_id:int
    question:str
    options1:str
    options2:str
    options3:str
    options4:str
    correct_option:str

@questions_router.post("/update")
async def create_exam_questions(payload:QuestionData, user=Depends(get_current_user)):
    if user["role"] != 'proctor':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only proctors can create exams"
        )
    all_exams = await db.fetchrow(f"SELECT exam_id FROM exams WHERE proctor_id = {user["user_id"]}")
    all_exam_ids = [record["exam_id"] for record in all_exams]
    if payload.exam_id not in all_exam_ids:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid exam id"
            
        )
    if payload.correct_option not in [payload.options1, payload.options2, payload.options3, payload.options4]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Correct option is not among provided options"
        )
    try:
        await db.execute(
        """
        INSERT INTO questions(exam_id, question, optionA, optionB, optionC, optionD, correct_ans)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        """,
        payload.exam_id,
        payload.question,
        payload.option1,
        payload.options2,
        payload.options3,
        payload.options4,
        payload.correct_option

        )
        return {"message":"Question added successfully"}
    except PostgresError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error during question creation"
        )
