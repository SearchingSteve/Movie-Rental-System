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
- Automatically creates database tables for movies, customers, and rentals if they don't already exist
- Insert new movies into the database.
- Update a customer's email address.
- Remove a customer and their rental history.
- Display all movies in the database.

## Prerequisites
Before running this application, ensure the following are in place:
- **Node.js** (version 22 recommended)
- **PostgreSQL** server running and accessible
- **Database Initialization**: To test with a fresh set of data, run `deleteAll` followed by `insertMock` to repopulate the database.


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

### Show All Movies
To display all movies currently in the database:
```bash
node index.js showMovies
```

### Show All Customers
To display all customers currently in the database:
```bash
node index.js showCustomers
```

### Show All Rentals
To display all rental records in the database:
```bash
node index.js showRentals
```

### Insert Mock Data
To insert sample data into the database:
```bash
node index.js insertMock
```

### Delete All Data
To delete all data from the database:
```bash
node index.js deleteAll
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

This project is provided for **personal use only**. Redistribution, modification, or commercial use in any form is strictly prohibited without prior written permission from the author.

For detailed license terms, refer to the [LICENSE](./LICENSE.md) file.

## Author
- **[Stephen Crocker](https://github.com/SearchingSteve)** 
