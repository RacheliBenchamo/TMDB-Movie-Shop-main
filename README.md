# Author
Racheli Benchamo

# Project Overview

This project is a modern e-commerce website built using React and Spring. It allows customers to browse movies, add them to a cart, and complete a purchase (no actual payment) without the need for registration. The website utilizes the TMDB API (The Movie Database) to browse movie products.

## Front End Development

The front end of the website is developed using React as a single page application. It utilizes hooks, browser router, effects, and reducers to manage state and navigation.

### Pages

The website consists of the following pages:

1. Search Page: Displays a list of movies/shows based on search queries. The search can be performed using a search string, genre, release date, popular movies, or actor name.

2. Cart Page: Allows users to view the contents of their shopping cart and see the total cost of the purchase. Items in the cart can be removed individually or emptied entirely.

3. Checkout Page: Displays a form for customers to enter their information (first name, last name, email) to complete the purchase. The purchase details are saved in the database, and the cart is reset after submission.

## Search Attributes

The search functionality includes the following attributes:

- Search String: Allows users to enter a search term to find movies or shows matching the query.

- Genre: Users can select genres from a predefined list, including Animation, Crime and Comedy.

- Upcoming Movies: Displays a list of movies that are scheduled to be released in the future.

- Popular Movies: Displays the most popular movies based on the TMDB popularity metric.

In order to get to the Discover attributes, the user must click on the arrow button on the left side of the Home page.

### Search History

The website records every search performed using the TMDB API and builds a history list of previous searches. Users can click on a history item to perform the same search again. The search history can be cleared entirely or individual items can be deleted. Please note that the search history is handled by the React client and is not persistent.

## Back End Development

The back end of the website is developed using Spring and provides a REST API for communication with the front end. It handles the shopping cart and records purchases in a SQL Server database.

### REST API Endpoints

The REST API includes the following endpoints:

- `/cart`: Handles operations related to the shopping cart, such as adding items and retrieving the cart contents.

- `/purchase`: Records completed purchases by saving them in the SQL database.

### Shopping Cart and Database

The shopping cart functionality is implemented using Spring session beans, allowing the cart to be stored in the user session. Completed orders are saved in the SQL Server database using the provided code in the template.

For debugging and grading purposes, the REST endpoint `http://localhost:8080/debug/purchases` is available to retrieve the full list of purchases stored in the database in JSON format.

# Getting Started

Follow these steps to initialize the project:

---------------------
# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.


We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).
