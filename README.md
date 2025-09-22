## Setup Instructions:

1. **Clone the repo:**
   ```bash
   git clone <your-repo-link>
   cd book-review-api

3. **Install dependencies**
   ```bash
   npm i

4. **Add mongoDB URL in the .env file**
   MONGO_URL=here

5. **Start the server**
   ```bash
   npm run dev

6. **Send request**
   http://localhost:5000 (Postman)

7. **Features:**
   
7.1 **Register a new user:**
curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
"name":"yash",
"email":"yash@gmail.com",
"password":"yash1234"
}'

7.2 **Login**
curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data-raw '{
"email":"yash@gmail.com",
"password":"yash1234"
}'


**Note:**
Save the token in the header for authenticated requests:
authorization: place_the_token_here

7.3 **Add a new book (Authenticated)**
curl --location 'http://localhost:5000/api/books' \
--header 'authorization: place_the_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"title": "book1",
"author": "author1",
"genre": "genre1",
"price": 200,
"description": "a fictional book"
}'

7.4 **Get all books**
curl --location 'http://localhost:5000/api/books' \
--header 'Cookie: Cookie_1=value'

7.5 **Get book by ID**
curl --location 'http://localhost:5000/api/books/68d15e6946b70d5c148af257' \
--header 'Cookie: Cookie_1=value'

7.6 **Add a review for a book (Authenticated)**
curl --location 'http://localhost:5000/api/books/68d15e6946b70d5c148af257/review' \
--header 'authorization: place_the_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"rating": 4,
"comment": "This is a good book"
}'

7.7 **Update your review (Authenticated)**
curl --location --request PUT 'http://localhost:5000/api/reviews/68d15fc546b70d5c148af260' \
--header 'authorization: place_your_token_here' \
--header 'Content-Type: application/json' \
--header 'Cookie: Cookie_1=value' \
--data '{
"rating": 5,
"comment": "This is a very good book"
}'

7.8 **Delete your review (Authenticated)**
curl --location --request DELETE 'http://localhost:5000/api/reviews/68d15fc546b70d5c148af260' \
--header 'authorization: place_your_token_here' \
--header 'Cookie: Cookie_1=value' \
--data ''

7.9 **Search books by title or author**
curl --location 'http://localhost:5000/api/search?query=book1' \
--header 'Cookie: Cookie_1=value' \
--data ''
