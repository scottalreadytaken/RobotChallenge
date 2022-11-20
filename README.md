
# Robot Challenge
 

This robot challenge is presented on an html page, index.html in the project directory. 

## Quick Start

The most reproducible way to get the solution to start is to use the dev containers feature in vscode.
The container supplied in the .devcontainer directory is the basic typescript image made by microsoft.
Alternatively if npm is installed locally the following should still work.


Run the following from the project to level directory (where this README is located): 

`npm install --include=dev` 

`tsc`

`npx webpack`

When the solution is built light-server can be used to server the solution as follows:
`npx light-server -s ./` 


## Assumptions
The bottom left is position X:1 Y:1, top right is X:5,Y:5
Commands should be automatically changed to uppercase to make it user friendly. 
User input must not be used unless it is a valid command. Failed commands should not be displayed back to the user. 

The file structure as follows:

Backend:
robot/core.ts - The majority of the code that addresses the challenge here in the Robot class. 

Presentation:
index.html - A basic html page that displays the game board. 
app.ts - Dynamic code that passes commands to the the Robot and updates the display. 

Tests:
__tests__/test-core.ts - Contains basic test cases for the Robot class. There are no tests for the presentation layer code at this stage. The test cases use Jest. 



With more time the following would be high on my TODO list:
1. Put measures in place to stop multiple robot commands executing at once
2. Improve the help messages
3. Improve the UI