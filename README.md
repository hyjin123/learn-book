# Welcome to Learn-Book!

## Description

Learn-Book is a full-stack application where users can save all their resources in a single central place for easy and efficient access. It is also a social media platform where users can interact with each other.

## Features

- Users can register and log in using their email.
- Users can add topics and resources within a selected topic (resources can be any url like youtube links or article links).
- Users can view all their topics. If they click on a topic, they can also view all the resources tied to that topic.
- Users edit and delete a resource.
- Users can view other user's resources in the explore page (there is also a search functionality).
- Users can perform tasks on each resource such as like, save, add as your own resource and comment.
- In the comment page, users can comment or reply to other comments. Users can also edit their comment (5 minute limit) or delete their comment.
- Users can view all their saved resources in the saved page.
- Users can click on other people's profile and view their topics and resources.

## The App

### Home Pages

Users can view their own topics and resources in the home page.

!["Home Page"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Home.png?raw=true)

### Add, Edit, or Delete

Users can add, edit or delete their own resources.

!["Add"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Edit.png?raw=true)

### Explore

Users can view other people's resources via explore page. Users can also search based on their interest.

!["Explore"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Explore.png?raw=true)

### Like, Save, or Comment

Users can like, save, or comment on other people's resources (you can also add the resource on your own page).

!["Like"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Save-Like.png?raw=true)

### Comment

In the comment section, users can comment or reply to a comment. Users can also edit or delete their own comments.

!["Comment"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Comments.png?raw=true)

### Saved

Users can view all their saved resources in the saved page.

!["Saved"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Saved.png?raw=true)

### Profile

Users can view other people's profile.

!["Profile"](https://github.com/hyjin123/learn-book/blob/master/front-end/docs/Profile.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the npm install in the front-end directory and back-end directory.
3. Start postgresql using psql.
4. Create a database in your host machine called "learn-book" with user "labber" and password "labber" on port 5432
5. Seed the database in the back-end directory with npm run db:reset and npm run seed.
6. Start the web server using the npm start command in the front-end directory. The app will be served at http://localhost:3000/.
7. Start the back-end server using the npm run dev command in the back-end directory. The app will be served at http://localhost:3001/.

## Stack Choices

**Front-End**

- React JS
- Bootstrap CSS

**Back-End**

- Node JS
- Express
- PostgresSQL
- JSON Web Token
