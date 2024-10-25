# Normalization Explanation
The database tables are designed to be in Third Normal Form (3NF) to ensure data is normalized efficiently. For a table to be in 3NF, it must first meet the criteria for the First Normal Form (1NF) and the Second Normal Form (2NF).

## Movies Table
- **1NF**: This table has `movie_id` as a primary key ensuring each record is unique, and each field holds only a single value (atomic).
- **2NF**: All information in the table—`title`, `release_year`, `genre`, `director_name`—is fully dependent on the primary key (`movie_id`).
- **3NF**: There's no dependence of any non-key attribute on another non-key attribute. Every attribute is directly related to the primary key, eliminating any transitive dependencies.

## Customers Table
- **1NF**: The `customers` table includes a primary key (`customer_id`) and each column stores only one value.
- **2NF**: Every attribute like `first_name`, `last_name`, `email`, and `phone_number` relies entirely on the primary key for its identity.
- **3NF**: Similar to the Movies table, each non-key attribute depends only on `customer_id`, and not on each other, adhering to 3NF by avoiding transitive dependencies.

## Rentals Table
- **1NF**: Features a primary key (`rental_id`) with atomic columns. It also includes foreign keys that reference the primary keys in the `Customers` and `Movies` tables, respectively.
- **2NF**: Attributes such as `rental_date` and `return_date` are associated directly with the primary key, without partial dependency.
- **3NF**: Like other tables, there are no transitive dependencies between non-key attributes. Both `customer_id` and `movie_id` are used only to establish connections to other tables and do not influence any other non-key attributes.

These measures ensure that our database avoids redundancy and enhances the integrity and efficiency of data management.
