
import { Robot, ROBOT_EAST, ROBOT_NORTH, ROBOT_SOUTH, ROBOT_WEST } from "./robot/core";

const BOARD_X = 5; // spec is for a 5 by 5 board
const BOARD_Y = 5;

// collect user interface elements
const input = document.getElementById('message') as HTMLInputElement | null;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement | null;
const commandLog = document.getElementById("commandLog") as HTMLDivElement | null;
const gameBoard = document.getElementById("gameBoard") as HTMLTableElement | null;
const testButton = document.getElementById("testButton") as HTMLButtonElement | null;

const robot = new Robot(BOARD_X,BOARD_Y); // create a robot object
var testScriptRunning = false; // don't let the test script run twice

/**
 * Update the display
 * Removes and adds all rows
 * Would be better to just update
 */
function refreshBoard(){
    let robotX = robot.getX();
    let robotY = robot.getY();
    let direction = robot.getDirection();
    let robotPic = "X";
    if(direction === ROBOT_NORTH){
        robotPic="^";
    }else if(direction === ROBOT_EAST){
        robotPic=">";
    }else if(direction === ROBOT_SOUTH){
        robotPic="V";
    }else if(direction === ROBOT_WEST){
        robotPic="<";
    }

    if(gameBoard?.rows){
        while(gameBoard?.rows.length > 0){
            gameBoard?.deleteRow(0);
        }
        for(let y =0; y<BOARD_Y; y++){
            let row = gameBoard?.insertRow(0);
            for(let x = BOARD_X-1; x>=0; x--){
                let cell = row.insertCell(0);
                if(x+1 == robotX && y+1 == robotY){
                    cell.innerText = "|__" + robotPic + "__]";
                }else{
                    cell.innerText = "|_____|";
                }
            }
        }
    }
}
/**
 * Wait a given time to make the UI changes observable. 
 * @param ms Delay in ms 
 * @returns 
 */
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
/**
 * Run a command, update the UI and wait
 * @param cmd the supplied command
 */
async function runCommandAndWait(cmd : string){
    runAndLog(cmd);
    refreshBoard();
    await delay(500);
}
/**
 * This is a test script that can be run when you don't want to type. 
 */
async function runTestScript(){
    await runCommandAndWait("PLACE 1,1,NORTH");

    //last move should fail
    for(let i = 0; i < 5; i++){
        await runCommandAndWait("MOVE"); 
    }
    await runCommandAndWait("RIGHT");
    //last move should fail
    for(let i = 0; i < 5; i++){
        await runCommandAndWait("MOVE"); 
    }

    await runCommandAndWait("RIGHT");
    //last move should fail
    for(let i = 0; i < 5; i++){
        await runCommandAndWait("MOVE"); 
    }

    await runCommandAndWait("RIGHT");
    //last move should fail
    for(let i = 0; i < 3; i++){
        await runCommandAndWait("MOVE"); 
    }
    await runCommandAndWait("LEFT");
    await runCommandAndWait("LEFT");
    await runCommandAndWait("LEFT");
    await runCommandAndWait("LEFT");
    await runCommandAndWait("LEFT");
    await runCommandAndWait("REPORT");

}
/**
 * Run a command and log
 * @param cmd User command
 */
function runAndLog(cmd : string){
    if(commandLog){
        commandLog.textContent = robot.command(cmd) + "\n" + commandLog?.textContent;
    }
}
/**
 * Has the test button been clicked
 */
testButton?.addEventListener('click', async function (event){
    if(testScriptRunning === false){ // don't let multiple runs occur
        testScriptRunning = true;
        await runTestScript();
        testScriptRunning = false;
    }
});
/**
 * Has the submit button been clicked. 
 */
submitButton?.addEventListener('click', function (event){
    // should prevent this from running when the test script is running 
    // but it's more fun to send additional commands during the test script
    // to see what happens. 
    // The robot should be updated to prevent multiple commands been run at once
    if(input?.value && commandLog?.textContent){
        runAndLog(input.value);
    }
    refreshBoard();
    

});

refreshBoard();









