# your-codepen
Codepen is one of the most favourite online editor among web developers for testing or showcasing your HTML,CSS. 
It provides hot reloading at a single click. But it doesn't provide autosuggestion or autocompleting variables like our IDE. 
It is not great to use if our network is slow. 

# Features
- Support for a simple app with HTML, CSS and JS Files with hot reloading feature


# How to use

To install run
`npm i your-codepen`

Then run `your-codepen init --app:name=<default-app-name>[optional]` which creates a single codepen with a mock js,css and html file.

Then run `your-codepen start --app:port=<PORT_NO>[optional]` which runs a development server in the specified port
Eg: https://localhost:3000  and access your pen https://localhost:3000/app-name

To create another pen run `your-codepen createnew --app:name=<pen-name>[optional]` 

*P.S: Only files with names index.js, index.css and index.html will be served in the development server*

# How to contribute

- After downloading the repository, run the following commands to install your-codepen package globally

`cd downloaded_folder/`

`npm install`

`npm install -g .`

*File Structure*

bin/cli.js -> Deals with arguments that are passed in your-codepen 
src/server/* -> Deals with running browsersync server and providing static files 


# Upcoming Features
- Support for CSS Preprocessor like Sass, Scss
- Support for JS Preprocessor