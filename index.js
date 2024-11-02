// Main file for the CLI application to manage a movie rental database

import readline from 'readline';
import pkg from "pg";
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
  user: 'myuser', //This should be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'midtermsprint-sem3-db-test', //This should be changed to reflect your actual database
  password: '', //This should be changed to reflect your database password
  port: 5432,
});

/**
 * Checks if a table exists in the database.
 * @param {string} tableName - The name of the table to check.
 * @returns {Promise<boolean>} - Returns true if the table exists, false otherwise.
 */
async function tableExists(tableName) {
  const query = `
    SELECT EXISTS (
      SELECT 1 
      FROM information_schema.tables 
      WHERE table_name = $1
    );
  `;
  try {
    const res = await pool.query(query, [tableName]);
    return res.rows[0].exists;
  } catch (err) {
    console.error(`Error checking if table ${tableName} exists:`, err);
    throw err;
  }
}

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  try {
    const moviesTableExists = await tableExists('movies');
    const customersTableExists = await tableExists('customers');
    const rentalsTableExists = await tableExists('rentals');

    if (!moviesTableExists) {
      await pool.query(`
        CREATE TABLE movies (
          movie_id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          release_year INT,
          genre VARCHAR(50) NOT NULL,
          director_name VARCHAR(50) NOT NULL
        );
      `);
    }

    if (!customersTableExists) {
      await pool.query(`
        CREATE TABLE customers (
          customer_id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          phone_number TEXT NOT NULL
        );
      `);
    }

    if (!rentalsTableExists) {
      await pool.query(`
        CREATE TABLE rentals (
          rental_id SERIAL PRIMARY KEY,
          customer_id INT REFERENCES customers(customer_id),
          movie_id INT REFERENCES movies(movie_id),
          rental_date DATE NOT NULL,
          return_date DATE NOT NULL
        );
      `);
    }

    if (!moviesTableExists || !customersTableExists || !rentalsTableExists) {
      console.log("Tables created successfully");
    }
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

/**
 * Inserts a new movie into the Movies table.
 *
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  // Validate input for year
  if (isNaN(year) || year < 1800 || year > new Date().getFullYear()) {
    console.error("Error: Invalid release year.");
    return;
  }

  // SQL query to insert a movie; if title already exists, does nothing due to UNIQUE constraint
  const query = `
    INSERT INTO movies (title, release_year, genre, director_name)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (title) DO NOTHING 
    RETURNING *;
  `;
  try {
    const res = await pool.query(query, [title, year, genre, director]);

    // Validate movie insertion
    if (res.rows.length > 0) {
      console.log("Movie inserted:", res.rows[0]);
    } else {
      console.log("Movie already exists in the database.");
    }
  } catch (err) {
    console.error("Error inserting movie:", err);
  }
}


/**
 * Updates a customer's email address.
 *
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  // Validate email format before querying database
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    console.error("Error: Invalid email address.");
    return;
  }

  const query = `
    UPDATE customers
    SET email = $1
    WHERE customer_id = $2
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [newEmail, customerId]);

    // Check if any row was updated, meaning customer ID exists
    if (res.rowCount > 0) {
      console.log("Customer updated:", res.rows[0]);
    } else {
      console.log("Customer not found.");
    }
  } catch (err) {
    console.error("Error updating customer:", err);
  }
}

/**
 * Removes a customer from the database along with their rental history.
 *
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  const deleteRentalsQuery = "DELETE FROM rentals WHERE customer_id = $1";
  const deleteCustomerQuery = "DELETE FROM customers WHERE customer_id = $1";

  try {
    await pool.query(deleteRentalsQuery, [customerId]); // Cascades are added in table constraints
    const res = await pool.query(deleteCustomerQuery, [customerId]);

    // Confirm if customer deletion was successful
    if (res.rowCount > 0) {
      console.log("Customer removed. ID:", customerId);
    } else {
      console.log("Customer not found.");
    }
  } catch (err) {
    console.error("Error removing customer:", err);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  const query = "SELECT * FROM movies";

  // Check if movies exist in the database
  try {
    const res = await pool.query(query);
    if (res.rows.length === 0) {
      console.log("No movies in the database.");
    } else {
      res.rows.forEach((movie) => console.log(movie));
    }
  } catch (err) {
    console.error("Error displaying movies:", err);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayCustomers() {
  const query = "SELECT * FROM customers";

  // Check if movies exist in the database
  try {
    const res = await pool.query(query);
    if (res.rows.length === 0) {
      console.log("No customers in the database.");
    } else {
      res.rows.forEach((customer) => console.log(customer));
    }
  } catch (err) {
    console.error("Error displaying customers:", err);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayRentals() {
  const query = "SELECT * FROM rentals";

  // Check if movies exist in the database
  try {
    const res = await pool.query(query);
    if (res.rows.length === 0) {
      console.log("No rentals in the database.");
    } else {
      res.rows.forEach((rental) => console.log(rental));
    }
  } catch (err) {
    console.error("Error displaying rentals:", err);
  }
}

/**
 * Inserts mock data into the database.
 */
async function insertMockData() {
  try {
    const query = `
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
          (1, 9, '2021-03-28', '2021-04-04'),
          (5, 9, '2021-04-12', '2021-04-19'),
          (1, 4, '2024-04-12', '2025-04-12'),
          (2, 1, '2024-04-12', '2025-04-12');
    `;
    await pool.query(query);
    console.log("Mock data inserted successfully");
  } catch (err) {
    console.error("Error inserting mock data:", err);
  }
}

/**
 * Deletes all data by dropping the tables in the database after user confirmation.
 */
async function deleteAllData() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const firstConfirmation = await new Promise((resolve) => {
      rl.question("Are you sure you want to delete all data in the movie rental system database? (yes/no): ", resolve);
    });

    if (firstConfirmation.toLowerCase() !== 'yes') {
      console.log("Operation cancelled.");
      rl.close();
      return;
    }

    const secondConfirmation = await new Promise((resolve) => {
      rl.question("Type 'delete mrs db' to confirm: ", resolve);
    });

    if (secondConfirmation !== 'delete mrs db') {
      console.log("Operation cancelled.");
      rl.close();
      return;
    }

    await pool.query("DROP TABLE IF EXISTS rentals, customers, movies CASCADE;");
    console.log("All tables dropped successfully. Database cleared.");
  } catch (err) {
    console.error("Error deleting all data:", err);
  } finally {
    rl.close();
  }
}



/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log("Usage:");
  // Project required
  console.log("  insert <title> <year> <genre> <director> - Insert a movie");
  console.log("  update <customer_id> <new_email> - Update a customer's email");
  console.log("  remove <customer_id> - Remove a customer from the database");
  console.log("  showMovies - Show all movies"); // Changed from show to showMovies
  // Additional
  console.log("  showCustomers - Show all customers");
  console.log("  showRentals - Show all rentals");
  console.log("  insertMock - Insert mock data into the database");
  console.log("  deleteAll - Delete all data from the database");
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable(); // Automatically creates tables if they don't exist

  const args = process.argv.slice(2);
  switch (args[0]) {
    case "insert":
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case "update":
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case "remove":
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
      case "showMovies":
        await displayMovies();
        break;
    case "showCustomers":
      await displayCustomers();
      break;
    case "showRentals":
      await displayRentals();
      break;
    case "insertMock":
      await insertMockData();
      break;
    case "deleteAll":
      await deleteAllData();
      break;

    default:
      printHelp();
      break;
  }
}

runCLI();
