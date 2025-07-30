from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.connection import db
from app.api.router import api_router
from fastapi.middleware.cors import CORSMiddleware



@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create DB pool
    await db.connect()
    print("Connected to DB")
    app.state.db = db
    yield
    # Shutdown: Close DB pool
    await db.disconnect()
    print("Closed DB connection")

# Attach the lifespan context manager to the app
app = FastAPI(lifespan=lifespan)

#setting up cors
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],           
)

# from app.api.routes import auth
app.include_router(api_router)

@app.get("/")
async def home():
    return {"message": "Server running"}
