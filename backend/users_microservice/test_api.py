import pymysql
import requests
import unittest
from sql import db_config
from http_server import hash_password

def create_test_user():
        username = "test"
        password = "password"
        with pymysql.connect(**db_config) as sql_client:
            with sql_client.cursor() as cur:
                cur.execute("DELETE FROM users WHERE username=%s",(username))
                cur.execute("""
                    INSERT IGNORE INTO users (username, email, password)
                        VALUES (%s, 'test@test.test', %s)
                """, (username, hash_password(password)))
        return username, password

class TestUserApis(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.host = 'http://127.0.0.1:8080'
        cls.username, cls.password = create_test_user()

    def test_user_apis(self):
        with requests.Session() as session:
            # Non existant user id -> unauthorized
            response = session.post(f'{self.host}/users/login', json={"username": "njo238hrn23i4br", "password": "password"})
            assert response.status_code == 401
            # Wrong password -> unauthorized
            response = session.post(f'{self.host}/users/login', json={"username": self.username, "password": "badpassword"})
            assert response.status_code == 401
            # Correct username/password pair -> authorized and set cookie
            response = session.post(f'{self.host}/users/login', json={"username": self.username, "password": self.password})
            assert response.status_code == 200
            assert response.cookies.get("session_id") is not None
            # Whoami endpoint should say this session belongs to the test user
            response = session.get(f'{self.host}/users/whoami')
            assert response.status_code == 200
            response_json = response.json()
            assert response_json["username"] == "test"
            # Now logout
            response = session.post(f'{self.host}/users/logout')
            assert response.status_code == 200
            # Now whoami should return None
            response = session.get(f'{self.host}/users/whoami') 
            assert response.status_code == 403