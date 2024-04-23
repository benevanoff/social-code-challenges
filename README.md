# Code Challenge Social Leaderboard

## Overview

The objective is to create a social platform centered around coding challenges.

People who want to participate on the platform should be able to register a new account with a (username, password) pair to become a `user` on the platform.

Priveledged users should be configurable. That's to say, there should be some mechanism for securely designating certain `user`s as an `admin`.

An `admin` may create `challenge`s. A `challenge` has a description or objective, a start_date, an end_date, and an optional news_frequency. The news_frequency is the frequency at which participants in the challenge should post status updates in the form of a mini blog post in order to be considered active in the challenge.

A `user` should be able to register for a `challenge`. This should be as simple as clicking a button before the `challenge` start_date. The `user` should then be able to link a github or gitlab repository to their `challenge_submission`. A `user` should also be able to post `update_news` to their `challenge_submission`.

A `user` should be able to vote for their favorite `challenge_submission`s. You should not be able to vote for your own submission. A [ranked choice voting system](https://en.wikipedia.org/wiki/Ranked_voting) will be employed where a `user` gets 3 `votes`, one of weight x3, one of weight x2, and one of weight x1.

For each challenge, there should be a page /leaderboards/{challenge_id} which displays a leaderboard where `challenge_submission`s are sorted by the weighted sum of their votes. The leaderboard page should also display a countdown to the `challenge`'s end_date.

## Architecture

The app will be composed of 2 REST microservices on the backend. One microservice for user management and authentication and one microservice for managing challenges and voting. The JavaScript client application will make calls to both of these services to render the frontend.

## User Microservice

The user microservice will provide a set of REST endpoints for registering new users, authenticating users, creating user sessions and destroying user sessions.

The user microservice will manage a `users` MySQL table on the backend that tracks each user's username, password, and email.

A Redis NoSQL database will be used to store the user sessions details where the keys in the database are session IDs and the values are datum associated with the user session.

### Interface

#### Registration

To register a new user, a new row is inserted to the `users` MySQL table including the user's email, username, and a salted [SHA-256 hash](https://en.wikipedia.org/wiki/SHA-2) of the user's password.

Example Request:
```
POST /users/register
HEADERS
    Content-Type: application/json
BODY
    {
        "username": "ben",
        "password": "s3cRetPazzwurd223"
        "email": "ben@mail.net"
    }
```

#### Login

To login a user, the username+password pair is authenticated by looking up the username in the MySQL database, hashing the input with the salt, and then comparing it to the stored password. If the authentication is successful, then a session will be created for the user.

Example Request:
```
POST /user/login
HEADERS
    Content-Type: application/json
BODY
    {
        "username": "ben",
        "password": "s3cRetPazzwurd223"
    }
```

#### Whoami

This route looks up the session cookie in the Redis database and should return details about the associated user.

```
GET /users/whoami
HEADERS
    Cookie: session_id=abc123
```

#### Logout

The logout command destroy's the user's current session on the backend by deleting the session key from Redis.

```
POST /users/logout
```
