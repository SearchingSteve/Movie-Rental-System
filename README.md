# Movie Rental System

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [SQL Files](#sql-files)
- [Usage](#usage)
- [Notes](#notes)
- [License](#license)
- [Author](#author)

## Overview
This CLI application serves as a management tool for a movie rental system. It allows users to interact with a PostgreSQL database to manage information about movies, customers, and movie rentals. This project represents the Database Programming portion of the midterm sprint evaluation for my 3rd semester at Keyin College.


## Features
- Create database tables for movies, customers, and rentals if they don't already exist
- Insert new movies into the database.
- Update a customer's email address.
- Remove a customer and their rental history.
- Display all movies in the database.

## Prerequisites
Before running this application, ensure you have the following installed:
- **Node.js** (v22 recommended)
- **PostgreSQL** server running

## Installation

1. **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd <your-repo-directory>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Database Connection**:
   - Open `index.js` and update the PostgreSQL connection settings at the top to match your database setup:
     ```javascript
     const pool = new Pool({
       user: 'your_username',
       host: 'localhost',
       database: 'your_database_name',
       password: 'your_password',
       port: 5432,
     });
     ```

4. **Run the Application**:
   ```bash
   node index.js
   ```

## SQL Files

The `sql` directory contains SQL files to help set up and interact with the movie rental database:

- **`create_tables.sql`**: Contains SQL commands to create the tables necessary for the application, including tables for `movies`, `customers`, and `rentals`.
- **`insert_data.sql`**: Includes SQL commands to insert sample data into the database tables, allowing you to test the application with predefined records.
- **`queries.sql`**: Contains SQL queries for specific use cases, such as:
  - Finding all movies rented by a specific customer, given their email.
  - Listing all customers who have rented a specific movie.
  - Getting the rental history for a specific movie title.
  - Listing movies by a specific director with rental details.
  - Listing all movies that are currently rented out (not returned yet).

## Usage

The application supports the following commands:

### Insert a Movie
To insert a new movie into the database:
```bash
node index.js insert "<title>" <year> "<genre>" "<director>"
```
Example:
```bash
node index.js insert "Beetlejuice" 1988 "Comedy" "Tim Burton"
```

### Show All Movies
To display all movies currently in the database:
```bash
node index.js show
```

### Update Customer Email
To update a customer's email address:
```bash
node index.js update <customer_id> "<new_email>"
```
Example:
```bash
node index.js update 1 "newemail@example.com"
```

### Remove a Customer
To remove a customer and their rental history:
```bash
node index.js remove <customer_id>
```
Example:
```bash
node index.js remove 1
```

### Help
To view all available commands:
```bash
node index.js
```

## Notes
- Ensure your PostgreSQL server is running before using the application.
- Use the `sql` files to set up the database and insert sample data if needed.
- Adjust the database connection details in `index.js` to match your PostgreSQL setup.

## License

This project and all associated files are licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License. - see the LICENSE file for details.

## Author
Stephen Crocker
