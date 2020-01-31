# Database API (FAUNADB)

We are using FaunaDB to create and maintain our DB for cloudyBadge. Below is some information about the structure of our DB

## Main DB - cloudybadge

`cloudybadge` is the child database of `cloudy`. Inside `cloudybadge` we will have `badges` which is our main collection of all the badges information.

## Indexes

Some of our indexes are as below:

1. all_badges
2. all_badges_per_event
3. badge_by_editKey
4. badge_by_viewKey