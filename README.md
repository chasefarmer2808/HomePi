# HomePi

Welcome to HomePi! A Python application that uses Flask to turn your Raspberry Pi into a smart home hub!

## Installation

Install dependencies with `pip -r requirements.txt`. It is recommended that you use a python virtual environment in this project, but it isn't required.

## Getting Started

Run the app with by running the command `flask run` in your terminal. This will start the Flask web server on localhost port 5000.
Navigate to http://localhost:5000 in a web browser to access your HomePi portal.

In order to let other users on your network access the portal, run the app with the following command: `flask run --host=0.0.0.0`
