import os
import copy
import aiohttp
import aiomysql
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

db_config = {
    "host": os.environ.get("DB_HOST", "127.0.0.1"),
    "user": os.environ.get("DB_USER", "root"),
    "password": os.environ.get("DB_PASS", "kkfkffspassss"),
    "db": os.environ.get("DB_NAME", "sql_db"),
    "port": 3306,
    "autocommit": True
}

async def get_db():
    config = copy.deepcopy(db_config)
    config["cursorclass"] = aiomysql.cursors.DictCursor
    conn = await aiomysql.connect(**config)
    try:
        yield conn
    finally:
        conn.close()

# route handlers
@app.get("/")
def root():
    return "Hello Challenges"

import datetime
class CreateChallengeRequest(BaseModel):
    start_date: int
    end_date: int
    description: str
@app.post("/challenges/create")
async def create_challenge(request_body:CreateChallengeRequest, session_id:str=Cookie(None), sql_client=Depends(get_db)):
    """
    Create a new challenge by specifying a challenge name, objective/description, a start date, and challenge end date.

    Only available to admin users.
    """
    async with aiohttp.ClientSession() as session:
        async with session.get('http://users_microservice:8080/users/whoami', headers={'Cookie': f'session_id={session_id}'}) as response:
            whoami_response_code = response.status
            if whoami_response_code == 200:
                whoami_response_json = await response.json()
            else:
                whoami_response_json = {}
    if whoami_response_code != 200 or whoami_response_json.get('is_admin') != 1:
        raise HTTPException(status_code=401)
    async with sql_client.cursor() as cur:
        await cur.execute("INSERT INTO challenges (start_date, end_date, description) VALUES (%s,%s,%s)", 
                          (datetime.datetime.fromtimestamp(request_body.start_date).replace(tzinfo=datetime.timezone.utc), 
                            datetime.datetime.fromtimestamp(request_body.end_date).replace(tzinfo=datetime.timezone.utc), request_body.description))
    return 200

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