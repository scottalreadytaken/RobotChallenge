
# Robot Challenge
 

This robot challenge is presented on an html page, index.html, in the project directory. 

The instructions for moving the robot are at the top of the page.

The game board is represented by an HTML table.

The robot is shown as an arrow character based on the direction it's facing.
^ = North
\> = East
V = South
< = West

The output that tells the user whether or not their commands have succeeded is displayed in the log below the table. 

## Quick Start

The most reproducible way to get the program to start is to use the dev containers feature in VS Code.
The container supplied in the .devcontainer directory is the basic TypeScript image made by Microsoft.
Once the container is running, execute the following commands. (Alternatively, if npm is installed locally, the following procedure should work without the container.)

Run the following from the project's top level directory (where this README is located): 

`npm install --include=dev` 

`npx tsc`

`npx webpack`

When the project is built, light-server can be used to serve the page by running this command:

`npx light-server -s ./` 

Once started, that command will output the URL for the user interface.

## Assumptions
The bottom left square of the table is position X:1 Y:1; top right is X:5,Y:5.
Commands should be automatically changed to uppercase to make it user friendly. 
User input must not be used unless it is a valid command. Failed commands should not be displayed back to the user. 

## File Structure
The file structure is as follows:

Backend:
robot/core.ts - The majority of the code that addresses the challenge is here in the Robot class. 

Presentation:
index.html - A basic html page that displays the game board. 
app.ts - Dynamic code that passes commands to the Robot and updates the display. 

Tests:
__tests__/test-core.ts - Contains basic test cases for the Robot class. There are no tests for the presentation layer code at this stage. The test cases use Jest. To run the tests, use `npm test`. 

I've also checked in the built dist/bundle.js so there is something to run if the build fails in other environments for some reason. 

## Other
With more time, the following would be high on my TODO list:
1. Improve the help messages
2. Improve the UI
