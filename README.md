# Airport Management System

## Flightline

A simple airport management web application built with Node.js and Express. It provides functionality to manage terminals, gates, flights, passengers, aircraft, and active passengers.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Starting the Application](#starting-the-application)
  - [Configuration](#configuration)
  - [Database](#database)
- [License](#license)

## Technologies Used

The airport management system utilizes the following technologies:

* Node.js
* Express.js
* MariaDB
* Handlebars
* Forever

## Setup

To set up and run the web app locally, follow these steps:

### Prerequisites

* [Node.js and npm](https://nodejs.org/en/docs)
* [Express.js]()
* [MariaDB/MySQL database server](https://www.mysql.com)

### Installation

1. Clone the repository to your local machine:

`$ git clone https://github.com/katerib/airport-mgmt-sys.git`

2. Navigate to the project directory:

`$ cd airport-mgmt-sys`

3. Install the dependencies

`$ npm install`

4. Set up your database connection:

* Open the `database/db-connector.js` file
* Update the database configuration with your MySQL server details: host, user, password, database
    ```javascript
      // Example configuration
      const dbConfig = {
        host: 'localhost',
        user: 'your_username',
        password: DB_PASS,
        database: 'your_database_name',
      };
      ```
    * Currently, `airport-mgmt-sys/database/db-connector.js` declares DB_PASS as an environment variable in the current shell session. To do the same, use:
        * Linux/macOS: `export DB_PASS="your_password_here"`
        * Windows Command Prompt: `set DB_PASS="your_password_here"`
        * Windows PowerShell: `$env:DB_PASS="your_password_here"`
    * Otherwise, replace `DB_PASS` with `'your_password'`

## Usage

To start the application, use one of two options:

1. Start normally:

`$ npm start`

2. Start with the forever script:

`$ npm run start-forever`

### Configuration

The default port for the application is 9126. If you want to use a different port, update the `PORT` variable in the `app.js` file.

### Database

The application assumes a MySQL database is set up and accessible. Have a running MySQL server and update the database configuration in the `db-connector..js` file.

## Features

* **Terminal Management**: manage airport terminals by adding, updating, and deleting terminals from the system.

* **Gate Management**: efficiently handle airport gates, includes adding new gates, updating gate information, and removing gates. Allows users to view gate status (open/closed) and indicate flights are assigned to specific gates.

* **Flight Management**: manage flights by creating new flight records, updating flight details, and deleting flights when needed. Allows users to attribute flights to specific gates.

* **Passenger Management**: create new passenger records, update passenger details, and remove passengers from the system. 

* **Aircraft Management**: create, update, and delete aircraft profiles in the system.

* **Booked Passengers**: track and manage booked passengers, allowing you to associate passengers with specific flights, update passenger-flight associations, and remove passengers from current flights.

* **Database integration**: connect to a MySQL/MariaDB database to store and retrieve data, ensuring data persistence and scalability.

* **Express.js and Handlebars**: build dynamic and responsive web pages with this web application framework and templating engine, respectively.

* **Forever script**: ensures application stays running continuously in order to provide enhanced reliability and uptime.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/katerib/airport-mgmt-sys/blob/main/LICENSE) file for more details.