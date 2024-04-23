# Code Challenge Social Leaderboard

## Overview

The objective is to create a social platform centered around coding challenges.

People who want to participate on the platform should be able to register a new account with a (username, password) pair to become a `user` on the platform.

Priveledged users should be configurable. That's to say, there should be some mechanism for securely designating certain `user`s as an `admin`.

An `admin` may create `challenge`s. A `challenge` has a description or objective, a start date, an end date, and an optional news_frequency. The news_frequency is the frequency at which participants in the challenge should post status updates in the form of a mini blog post in order to be considered active in the challenge.

A `user` should be able to register for a `challenge`. This should be as simple as clicking a button before the `challenge` start date. The `user` should then be able to link a github or gitlab repository to their `challenge_submission`. A `user` should also be able to post `update_news` to their `challenge_submission`.

A `user` should be able to vote for their favorite `challenge_submission`s. You should not be able to vote for your own submission. A [ranked choice voting system](https://en.wikipedia.org/wiki/Ranked_voting) will be employed where a `user` gets 3 `votes`, one of weight x3, one of weight x2, and one of weight x1.

For each challenge, there should be a page /leaderboards/{challenge_id} which displays a leaderboard where `challenge_submission`s are sorted by the weighted sum of their votes. The leaderboard page should also display a countdown
