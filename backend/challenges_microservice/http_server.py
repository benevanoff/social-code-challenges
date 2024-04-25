import os
import copy
import aiohttp
import datetime
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

async def whoami(session_id:str):
    async with aiohttp.ClientSession() as session:
        async with session.get('http://users_microservice:8080/users/whoami', headers={'Cookie': f'session_id={session_id}'}) as response:
            whoami_response_code = response.status
            if whoami_response_code == 200:
                whoami_response_json = await response.json()
            else:
                whoami_response_json = {}
    return whoami_response_json


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
    whoami_response = await whoami(session_id)
    if whoami_response.get('is_admin') != 1:
        raise HTTPException(status_code=401)
    async with sql_client.cursor() as cur:
        await cur.execute("INSERT INTO challenges (start_date, end_date, description) VALUES (%s,%s,%s)", 
                          (datetime.datetime.fromtimestamp(request_body.start_date).replace(tzinfo=datetime.timezone.utc), 
                            datetime.datetime.fromtimestamp(request_body.end_date).replace(tzinfo=datetime.timezone.utc), request_body.description))
    return 200

@app.post("/challenges/register/{challenge_id}")
async def register_for_challenge(challenge_id:int, session_id:str=Cookie(None), sql_client=Depends(get_db)):
    """
    A user may POST to this route before the challenge's start_date to register (aka signal intent to participate in) for an up coming challenge.

    The user must be logged in to use this route.
    """
    whoami_response = await whoami(session_id)
    if not whoami_response:
        raise HTTPException(status_code=401)
    async with sql_client.cursor() as cur:
        await cur.execute("INSERT INTO submissions (username, challenge_id) VALUES (%s,%s)", (whoami_response.get('username'), challenge_id))
    return 200

@app.get("/challenges/registrations/{challenge_id}")
async def get_challenge_registrations(challenge_id:int, sql_client=Depends(get_db)):
    """
    List all of the users who have registered for a challenge by username.

    Returns code 404 if the challenge_id is invalid.
    """
    async with sql_client.cursor() as cur:
        await cur.execute("SELECT username FROM submissions WHERE challenge_id=%s",(challenge_id))
        query_result = await cur.fetchall()
    if not query_result:
        return []
    return [x['username'] for x in query_result]

@app.post("/challenges/submission/link_project/{submission_id}")
async def link_project(submission_id:int):
    """
    TODO
    """
    pass

@app.post("/challenges/submission/news/create/{submission_id}")
async def post_news(submission_id:int):
    """
    TODO
    """
    pass

@app.post("/challenges/submission/vote/{submission_id}")
async def vote(submission_id:int, session_id:str=Cookie(None), sql_client=Depends(get_db)):
    """
    Vote for a submission. Each user may place three votes per challenge, each with a different weight. 
    
    The weights act as multipliers. A vote with weight 3 gives 3 points while a vote with weight 1 only gives 1 point. 
    
    A user may use each weight only once per challenge.

    TODO: implement vote weights
    """
    whoami_response = await whoami(session_id)
    voter_username = whoami_response.get("username")
    async with sql_client.cursor() as cur:
        # check if the user already voted for this submission
        await cur.execute("SELECT vote_id FROM votes WHERE voter_username=%s", (voter_username))
        if (await cur.fetchone()):
            raise HTTPException(status_code=400, detail='You already voted for this submission')
        await cur.execute("INSERT IGNORE INTO votes (submission_id, voter_username) VALUES (%s,%s)", (submission_id, voter_username))
    return 200

@app.get("/challenges/submissions/{challenge_id}")
async def get_challenge_submissions(challenge_id:int, sql_client=Depends(get_db)):
    """
    List the top 10 submissions for a challenge
    """
    async with sql_client.cursor() as cur:
        await cur.execute("SELECT submission_id, username FROM submissions WHERE challenge_id=%s LIMIT 10",(challenge_id))
        query_result = await cur.fetchall()
    if not query_result:
        raise HTTPException(status_code=404)
    return query_result