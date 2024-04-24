import os
import json
import uuid
import copy
import aiomysql
import logging
import nacl.hash
import redis
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
    return "Hello Users"

class UserSession:
    def __init__(self):
        self.session_storage_client = redis.StrictRedis(host=os.environ.get("CACHE_HOST", "localhost"), port=6379, db=0, password="yourpasswordkkfkfa")

    def makeNewUserSession(self, username):
        session_id = str(uuid.uuid4())
        self.session_storage_client.set(session_id, json.dumps({"username": username}))
        return session_id

    def getUserFromSession(self, session_id):
        return json.loads(self.session_storage_client.get(session_id).decode())["username"]

def get_sessions():
    session_storage = UserSession()
    yield session_storage

def hash_password(password):
    SALT = "NaCl_challenges"
    password + SALT
    return nacl.hash.sha256(password.encode()).decode()

class RegistrationRequest(BaseModel):
    username: str
    password: str
    email: str
@app.post("/users/register")
async def user_registration(request:RegistrationRequest, response:Response, sql_client=Depends(get_db)):
    """
    To register a new user, a new row is inserted to the users MySQL table including the user's email, username, and a salted [SHA-256 hash](https://en.wikipedia.org/wiki/SHA-2) of the user's password.
    """
    hashed_password = hash_password(request.password)
    async with sql_client.cursor() as cur:
        await cur.execute("INSERT IGNORE INTO users (username, password, email) VALUES (%s, %s, %s)", (request.username, hashed_password, request.email))
    return 200

# User Login Route
class LoginRequest(BaseModel):
    username: str
    password: str
@app.post("/users/login")
async def user_login(request:LoginRequest, response:Response, sql_client=Depends(get_db), session_storage=Depends(get_sessions)):
    """
    To login a user, the username+password pair is authenticated by looking up the username in the MySQL database, hashing the input with the salt, and then comparing it to the stored password.

    If the authentication is successful, then a session will be created for the user.
    """
    # verify password is correct
    # hash the input - the data is hashed in the database
    hashed_password = hash_password(request.password)
    # compare the hashes
    async with sql_client.cursor() as cur:
        await cur.execute("""
            SELECT * FROM users
            WHERE (username, password) = (%s, %s)
            """, (request.username, hashed_password))
        user_result_row = await cur.fetchone()
    if not user_result_row:
        raise HTTPException(status_code=401)
    # add Redis entry {session_id:username} with 2 hour timeout
    session_id = session_storage.makeNewUserSession(request.username)
    # return session id in response body and cookie
    response.set_cookie(key="session_id", value=session_id)

@app.post("/users/logout")
async def users_logout(response:Response, session_id:str=Cookie(None), session_storage=Depends(get_sessions)):
    """
    The logout command destroy's the user's current session on the backend by deleting the session key from Redis.
    """
    # destroy sessioroutern by deleting session entry from Redis
    if not session_id:
        return
    session_storage.session_storage_client.delete(session_id)
    # and deleting the session cookie from the client
    response.delete_cookie(key="session_id")

@app.get("/users/whoami")
async def users_whoami(session_id:str=Cookie(None), sql_client=Depends(get_db), session_storage=Depends(get_sessions)):
    """
    This route looks up the session cookie in the Redis database and should return details about the associated user.
    """
    if not session_id:
        raise HTTPException(status_code=403)
    try:
        username = session_storage.getUserFromSession(session_id)
    except:
        raise HTTPException(status_code=403)
    async with sql_client.cursor() as cur:
        await cur.execute("""
            SELECT username, email, is_admin
            FROM users
            WHERE username = %s
            """, (username))
    return await cur.fetchone()