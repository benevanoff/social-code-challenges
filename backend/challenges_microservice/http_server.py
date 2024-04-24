from pydantic import BaseModel

from fastapi import FastAPI, Request, Depends, HTTPException, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
origins = [
    "http://127.0.0.1",
    "http://localhost",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Set-Cookie"]
)

# route handlers
@app.get("/")
def root():
    return "Hello Challenges"

@app.post("/challenges/create")
async def create_challenge():
    pass

@app.post("/challenges/register/{challenge_id}")
async def register_for_challenge():
    pass

@app.post("/challenges/submission/link_project/{submission_id}")
async def link_project():
    pass

@app.post("/challenges/submission/news/create/{submission_id}")
async def post_news():
    pass

@app.post("/challenges/submission/vote/{submission_id}")
async def vote():
    pass

@app.get("/challenges/submissions/{challenge_id}")
async def get_challenge_submissions():
    pass