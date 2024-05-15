import pymysql
import requests
import unittest
from sql_client import db_config
from http_server import app
from fastapi.testclient import TestClient


# create test challenge for project submission
def create_test_challenge_submission():
    with pymysql.connect(**db_config) as sql_client:
        with sql_client.cursor() as cur:
            cur.execute(
                """INSERT IGNORE INTO submissions (challenge_id, username)
                VALUES (1, 'TestUser')
                """
            )
            cur.execute("SELECT * FROM submissions WHERE submission_id = 1")
            test_challenge_submission = cur.fetchone()

    return test_challenge_submission


class TestUserApis(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.test_client = TestClient(app)
        # clear the database before the test
        with pymysql.connect(**db_config) as sql_client:
            with sql_client.cursor() as cur:
                cur.execute("DELETE FROM challenges")

    def test_challenges_apis(self):
        # create test challenge
        response = self.test_client.get("/challenges")
        assert response.status_code == 200
        assert response.json() == []

        # link project repo to submission
        test_challenge_submission = create_test_challenge_submission()
        response = self.test_client.post(
            f"/challenges/submission/link_project/{test_challenge_submission[0]}",
            json={"link": "http://sample-submission-repository.com"},
        )
        assert response.status_code == 200

        # Get details of project submission
        response = self.test_client.get(f'/challenges/submission/{test_challenge_submission[0]}')
        assert response.status_code == 200
        assert response.json() == [{'submission_id': 1, 'challenge_id': '1', 'username': 'TestUser', 'code_repository': 'http://sample-submission-repository.com'}]

        # Get details of nonexistent submission
        response = self.test_client.get(f'/challenges/submission/999')
        assert response.status_code == 404

    

