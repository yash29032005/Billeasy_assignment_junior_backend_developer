## Setup Instructions:

1. **Clone the repo:**
   ```bash
   git clone <your-repo-link>
   cd book-review-api

3. Install dependencies
   ```bash
   npm i

4. Add mongoDB URL in the .env file
   MONGO_URL=here

5. Start the server
   ```bash
   npm run dev

6. Send request
   http://localhost:5000 (Postman)

Features:

POST /api/auth/register
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
"name":"yash",
"email":"yash@gmail.com",
"password":"yash1234"
}'

POST api/auth/login
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
"email":"yash@gmail.com",
"password":"yash1234"
}'

save the token in the header like this:
authorization:place_the_token_here

POST api/books
curl --location 'http://localhost:5000/api/books' \
--header 'authorization: place_the_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"title": "book1",
"author": "author1",
"genre": "genre1",
"price":200,
"description": "a fictional book"
}'

GET /api/books
curl --location 'http://localhost:5000/api/books' \
--header 'Cookie: Cookie_1=value'

GET /api/books/:id
curl --location 'http://localhost:5000/api/books/68d15e6946b70d5c148af257' \
--header 'Cookie: Cookie_1=value'

POST api/books/:id/reviews
curl --location 'http://localhost:5000/api/books/68d15e6946b70d5c148af257/review' \
--header 'authorization: place_the_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"rating":4,
"comment":"This is a good book"
}'

PUT api/reviews/:id
curl --location --request PUT 'http://localhost:5000/api/reviews/68d15fc546b70d5c148af260' \
--header 'authorization: place_tour_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"rating": "5",
"comment": "this is a very good book"
}'

DELETE api/reviews/:id
curl --location --request DELETE 'http://localhost:5000/api/reviews/68d15fc546b70d5c148af260' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDE1ZGJjNDZiNzBkNWMxNDhhZjI1MiIsImVtYWlsIjoieWFzaEBnbWFpbC5jb20iLCJpYXQiOjE3NTg1NTE1MjYsImV4cCI6MTc1ODYzNzkyNn0.yR3LONpZbNjk5mlskWTGu_2zBtJXBV15ZIJR-hY5_Yk' \
--header 'Cookie: Cookie_1=value' \
--data ''

GET api/search/query=?
curl --location 'http://localhost:5000/api/search?query=book1' \
--header 'Cookie: Cookie_1=value' \
--data ''
