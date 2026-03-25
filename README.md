# PratraApp

This is a simple Angular application that fetches user data from a public REST API and displays it in a list and detail view.

## Setup Instructions

Clone the repository
git clone <your-repo-link>
Navigate to project folder
cd project-name
Install dependencies
npm install
Run the application
ng serve
Open in browser
http://localhost:4200

## Features Implemented

Fetch user data from API
Display users in list view
Show loading indicator while fetching data
Handle API errors with message
Search users by name and email (with debounce)
User detail view using routing
Lazy loading using loadComponent
Simple and responsive UI

## Assumptions

Used public API for demo purpose
UI kept simple, focus is on functionality
Basic error handling implemented
Did not use advanced state management (to keep it simple)
Data is assumed to be small (no pagination added)

