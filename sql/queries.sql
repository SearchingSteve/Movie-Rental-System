-- Additional queries to find specific data.

-- 1.	Find all movies rented by a specific customer, given their email.
SELECT m.title FROM rentals r
JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE c.email = 'alice.appleseed@example.com';


-- 2.	List all customers who have rented a specific movie, provided the movie title.
SELECT DISTINCT c.first_name, c.last_name FROM rentals r
JOIN customers c ON r.customer_id = c.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE m.title = 'The Lord of the Rings: The Fellowship of the Ring';

-- 3.	Get the rental history for a specific movie title.
SELECT  c.first_name, c.last_name, r.rental_date, r.return_date FROM rentals r
JOIN customers c ON c.customer_id = r.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE m.title = 'The Lord of the Rings: The Fellowship of the Ring';

-- 4.	For a specific movie director:
-- Find the name of the customer, the date of the rental 
-- and title of the movie for each time a movie by that director was rented
SELECT c.first_name, c.last_name, r.rental_date, m.title FROM rentals r
JOIN customers c ON c.customer_id = r.customer_id
JOIN movies m ON r.movie_id = m.movie_id
WHERE m.director_name = 'Peter Jackson';

-- 5.	List all movies that are currently rented out (i.e., who’s return dates have not yet been met).
SELECT * FROM rentals
WHERE return_date > CURRENT_DATE;