import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'your_database_name', //This should be changed to reflect your actual database
  password: 'your_database_password', //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  // TODO: Add code to create Movies, Customers, and Rentals tables
  `CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    genre VARCHAR(50) NOT NULL,
    director_name VARCHAR(50) NOT NULL
)

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number TEXT NOT NULL
)

CREATE TABLE rentals (
    rental_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    movie_id INT REFERENCES movies(movie_id),
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL,
)
`}
try{
  await pool.query(createTable)
  console.log('Tables created successfully');
} catch(err){
  console.error('Error creating tables');
}
;

/**
 * Inserts a new movie into the Movies table.
 * 
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  // TODO: Add code to insert a new movie into the Movies table
  const query = `
    INSERT INTO movies (title, release_year, genre, director_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  try {
    const res = await pool.query(query, [title, year, genre, director]);
    console.log("Movie inserted:", res.rows[0]);
  } catch (err) {
    console.error("Error inserting movie:", err);
  }
}


/**
 * Prints all movies in the database to the console
 */
  async function displayMovies() {
    const query = "SELECT * FROM movies";
  
    try {
      const res = await pool.query(query);
      res.rows.forEach(movie => console.log(movie));
    } catch (err) {
      console.error("Error displaying movies:", err);
    }
  }
  

/**
 * Updates a customer's email address.
 * 
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  const query = `
    UPDATE customers
    SET email = $1
    WHERE customer_id = $2
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [newEmail, customerId]);
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
    await pool.query(deleteRentalsQuery, [customerId]);
    const res = await pool.query(deleteCustomerQuery, [customerId]);
    if (res.rowCount > 0) {
      console.log("Customer removed. ID:", customerId);
    } else {
      console.log("Customer not found.");
    }
  } catch(err){
    console.error("Error removing customer:", err);
  }
}


/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <title> <year> <genre> <director> - Insert a movie');
  console.log('  show - Show all movies');
  console.log('  update <customer_id> <new_email> - Update a customer\'s email');
  console.log('  remove <customer_id> - Remove a customer from the database');
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case 'show':
      await displayMovies();
      break;
    case 'update':
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case 'remove':
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
};

runCLI();
