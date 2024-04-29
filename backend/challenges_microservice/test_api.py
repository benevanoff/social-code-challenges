import pymysql
import requests
import unittest
from sql_client import db_config
from http_server import app
from fastapi.testclient import TestClient


class TestUserApis(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.test_client = TestClient(app)
        # clear the database before the test
        with pymysql.connect(**db_config) as sql_client:
            with sql_client.cursor() as cur:
                cur.execute("DELETE FROM challenges")

    def test_challenges_apis(self):
        response = self.test_client.get('/challenges')
        assert response.status_code == 200
        assert response.json() == []