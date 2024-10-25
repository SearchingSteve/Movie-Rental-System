-- Insert into movies table
INSERT INTO movies
    (title, release_year, genre, director_name)
VALUES
    ('The Shawshank Redemption', 1994, 'Drama', 'Frank Darabont'),
    ('The Godfather', 1972, 'Crime', 'Francis Ford Coppola'),
    ('The Dark Knight', 2008, 'Action', 'Christopher Nolan'),
    ('The Lord of the Rings: The Return of the King', 2003, 'Adventure', 'Peter Jackson'),
    ('Pulp Fiction', 1994, 'Crime', 'Quentin Tarantino'),
    ('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis'),
    ('Inception', 2010, 'Action', 'Christopher Nolan'),
    ('The Matrix', 1999, 'Action', 'Lana Wachowski, Lilly Wachowski'),
    ('The Lord of the Rings: The Fellowship of the Ring', 2001, 'Adventure', 'Peter Jackson'),
    ('The Lord of the Rings: The Two Towers', 2002, 'Adventure', 'Peter Jackson');

-- Insert into customers table
INSERT INTO customers
    (first_name, last_name, email, phone_number)
VALUES
    ('Alice', 'Appleseed', 'alice.appleseed@example.com', '555-1234'),
    ('Bob', 'Brown', 'bob.brown@example.com', '555-5678'),
    ('Charlie', 'Clark', 'charlie.clark@example.com', '555-9876'),
    ('David', 'Dunn', 'david.dunn@example.com', '555-4321'),
    ('Eve', 'Evans', 'eve.evans@example.com', '555-8765');

-- Insert into rentals table (fixed the date inconsistencies)
INSERT INTO rentals
    (customer_id, movie_id, rental_date, return_date)
VALUES
-- One user renting one or many movies
    (1, 1, '2021-01-01', '2021-01-08'),
    (1, 2, '2021-01-09', '2021-01-16'),
    (2, 3, '2021-01-17', '2021-01-24'),
    (2, 4, '2021-01-25', '2021-02-01'),
    (3, 5, '2021-02-02', '2021-02-09'),
    (3, 6, '2021-02-10', '2021-02-17'),
    (4, 7, '2021-02-18', '2021-02-25'),
    (4, 8, '2021-02-26', '2021-03-05'),
    (5, 9, '2021-03-06', '2021-03-13'),
    (5, 10, '2021-03-14', '2021-03-21'),

-- One movie rented by multiple user
    (1, 9, '2021-03-28', '2021-04-04'),
    (5, 9, '2021-04-12', '2021-04-19'), 

-- Movie still rented out  
    (1, 4, '2024-04-12', '2025-04-12'),
    (2, 1, '2024-04-12', '2025-04-12');


