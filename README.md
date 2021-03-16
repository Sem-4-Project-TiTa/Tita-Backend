
# Tita - Classroom management system

  

## About

  

Students and teachers often face difficulties while managing time-tables, assignments, and quizzes. Such problems arise due to the unavailability of a centralized management system where-in the communication between the teachers and students can be made efficient. <br>

The purpose of TiTa- Classroom Management System, at a University level, is to manage time-tables, assignments, and quizzes for teachers and students

  

<hr>

  

## Installation

  

### Clone to your local repo

  

```

git clone git@github.com:TiTa-Classroom-Management-System/TiTa-Backend.git

```

  

### Install dependencies

  

```

npm install

```

  

### Setting up environment variables

  

Create a new file .env in root of project and add the following contents.

  

```

MYSQL_USER=<your_mysql_user>

MYSQL_PASS=<your_mysql_password>

```

  

### Setting up your database

  

To stay in sync with tita database, you need to first create a database name tita using

  

```

CREATE DATABASE tita;

```

### Error handling for mysqldump
In case your mysqldump command does not work, don't forget to add it as an environment variable. 
Go to 
```
C:\Program Files\MySQL\MySQL Server 8.0\bin
```
Copy this path and add the path to local environment.

  
  

## Contribution

  

Before pushing the changes, update your db changes using the following script

  

```

npm run commit-db

```

Enter your mysql server password and then commit and push your changes.

This command assumes your username to be root, if you have a different username then change the script in package.json(don't push that to GitHub)

  

<hr>

  

## Technoglogies used:

  

<img  src="https://img.icons8.com/color/48/000000/nodejs.png"/>  &nbsp;  <img  src="https://img.icons8.com/fluent/48/000000/mysql-logo.png"/>  &nbsp;

  

### Other technologies:

  

- ExpressJS

<hr>