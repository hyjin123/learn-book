# Welcome to Life-Booster!

## Description

Life-Booster is a full-stack application that allows users to create a to-do list for each day whether it would be today or tuesday next week. It provides an efficient way for the users to organize their day to day allowing them to be more productive.

## Features

- Users can register and log in using their email.
- Users can view a full calendar on the main page.
- Users can choose a date and view the to-do list for that specific day.
- Users can see all, uncompleted, in-progress, and completed tasks for that day.
- Users can add tasks.
- Users can edit tasks such as the date, details, and status (eg. uncompleted to completed).
- Users can delete tasks.
- Users can mark a task as high priority.
- Users can see all tasks based on their status (not just for 1 specific day but for all days).

## The App

### Home Page

Users can view a caldenar and choose which day they would like to create a to-do list.

!["Home Page"](https://github.com/hyjin123/life-booster/blob/master/frontend/docs/Home.png?raw=true)

### Add tasks

Users can add tasks for each day.

!["Add"](https://github.com/hyjin123/life-booster/blob/master/frontend/docs/add-task.png?raw=true)

### View tasks

Users can view all tasks or tasks based on status for each day.

!["View all task"](https://github.com/hyjin123/life-booster/blob/master/frontend/docs/all-task.png?raw=true)

### Edit and delete tasks

You can edit and delete tasks.

!["edit"](https://github.com/hyjin123/life-booster/blob/master/frontend/docs/Edit.png?raw=true)

### View tasks for all days

Users can view tasks based on status for all days (not just each day)

!["View tasks based on status"](https://github.com/hyjin123/life-booster/blob/master/frontend/docs/completed-task.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the npm install in the frontend directory and backend directory.
3. Start postgresql using psql.
4. Create a database in your host machine called "life-booster" with user "labber" and password "labber" on port 5432
5. Seed the database in the backend directory with npm run db:reset and npm run seed.
6. Start the web server using the npm start command in the frontend directory. The app will be served at http://localhost:3000/.
7. Start the backend server using the npm run dev command in the backend directory. The app will be served at http://localhost:3001/.

## Stack Choices

**Front-End**

- React JS
- Bootstrap CSS

**Back-End**

- Node JS
- Express
- PostgresSQL
- JSON Web Token
