export const INVALID_DIMS_ERROR = "Board X and Y must be between 1 and 5.";
export const NOT_PLACED_ERROR = "The robot must be placed before you can move it. Try 'PLACE 1,1,NORTH'."; 
export const OFF_BOARD_MOVE_ERROR = "That move is invalid, it would move the robot outside the board.";
export const INVALID_COMMAND = "Invalid Command - Only the PLACE, LEFT, RIGHT, MOVE, and REPORT commands are allowed. For the PLACE command, X&Y must be between 1-5 inclusive.";
export const PLACE_COMMAND_ARGS_MISSING_ERROR = "The place command requires arguments.";
export const PLACE_COMMAND_ARGS_WRONG_ERROR = "The arguments for place are invalid.";

export const INVALID_MOVE = "That move is invalid as it would move the robot outside the board.";
export const SUCCESS_MSG = "Success.";

export const ROBOT_NORTH = "NORTH"; 
export const ROBOT_EAST = "EAST"; 
export const ROBOT_SOUTH = "SOUTH";
export const ROBOT_WEST = "WEST";
export const DIRECTIONS = [ROBOT_NORTH,ROBOT_EAST,ROBOT_SOUTH,ROBOT_WEST];

const MOVE_CMD = "MOVE";
const LEFT_CMD = "LEFT";
const RIGHT_CMD = "RIGHT";
const REPORT_CMD = "REPORT";
const PLACE_CMD = "PLACE";

/**
 *  This is the main class that addresses the challenge. 
 *  The robot is constructed with board dimensions
 *  The text commands are supplied to the command method
 *  The commands can also be executed directly for testing 
 *  X and Y are in the range 1 to the board size e.g. 5 - rather than 0 based e.g. 0-4
 */
export class Robot{
    
    private _x : number = -1;
    private _y : number = -1;
    private _directionIndex : number = 0; // robot would be north facing if not set

    boardX = 5;
    boardY = 5;

    /**
     * 
     * @param boardX X dimension
     * @param boardY Y dimension
     * Note the robot is not placed on the board initially.
     */

    constructor(boardX : number, boardY : number){
        if(boardX < 1 || boardY < 1 || boardX > 5 || boardY > 5){ // board dimension must be a positive integer
            throw new Error(INVALID_DIMS_ERROR);
        }
        this.boardX = boardX;
        this.boardY = boardY;
    }

    /**
     * 
     * @returns true if the robot has been placed.
     */
    isPlaced() : boolean {
       
        return this._x>0 && this._y > 0;
    }

    /**
     * 
     * @returns NORTH, SOUTH, EAST or WEST for current direction.
     */
    getDirection() : string {
        return DIRECTIONS[this._directionIndex];

    }

    /**
     * 
     * @returns X location
     */
    getX() : number{
        return this._x;
    }

    /**
     * 
     * @returns Y location
     */
    getY() : number{
        return this._y;
    }


    /**
     * Turn the robot left. 
     * @returns true if the robot turned left, false if not placed.
     */
    left() : boolean {
        if(this.isPlaced()){
            this._directionIndex--;
            if(this._directionIndex < 0){
                this._directionIndex = DIRECTIONS.length-1;
            }
            return true;
        }
        return false;
    }

    /**
     * Turn the robot right
     * @returns true if the robot turned right, false if not placed
     */
    right() : boolean {
        if(this.isPlaced()){
            this._directionIndex++;
            if(this._directionIndex >= DIRECTIONS.length){
                this._directionIndex = 0;
            }
            return true;
        }
        return false;
    }

    /**
     * Place the robot
     * @param x X location
     * @param y Y location
     * @param direction must be NORTH,SOUTH,EAST or WEST
     * @returns true if it was a valid placement on the board
     */
    place(x : number, y : number, direction : string) : boolean {
        if(DIRECTIONS.indexOf(direction) > -1){
            if(x > 0 && x <= this.boardX && y > 0 && y <= this.boardY){
                this._directionIndex = DIRECTIONS.indexOf(direction);
                this._x = x;
                this._y = y;
                return true;
            }
        }
        return false;
    }
    /**
     * This is the core of the solution 
     *  - the robot should only move if it can move without leaving the board
     * @returns true if the robot can move within the board
     */
    move() : boolean {
        let valid : boolean = false;
        if(this.isPlaced()){
            if(DIRECTIONS[this._directionIndex] === ROBOT_NORTH){
                if(this._y < this.boardY){
                    this._y++;
                    valid = true;
                }
            }else if(DIRECTIONS[this._directionIndex] === ROBOT_EAST){
                if(this._x < this.boardX){
                    this._x++;
                    valid = true;
                }
            }else if(DIRECTIONS[this._directionIndex] === ROBOT_SOUTH){
                if(this._y > 1){
                    this._y--;
                    valid = true;
                }
            }else if(DIRECTIONS[this._directionIndex] === ROBOT_WEST){
                if(this._x > 1){
                    this._x--;
                    valid = true;
                }
            }  
        }
    
        return valid;  
    }
    
    /**
     * 
     * @returns Report of the robots current location
     */
    report() : string {
        return `X: ${this._x} Y: ${this._y} Looking: ${DIRECTIONS[this._directionIndex]}`
    }

    /**
     * Check the input - eliminate bad input. 
     * @param cmdLine the command anything you like but ideally a valid command
     * @returns a command object if it was valid or null if it wasn't
     */
    private _sanitizeCmd(cmdLine : string): RobotCommand | null {
        let trimmedCmd = cmdLine.trim().toLocaleUpperCase();
        if(trimmedCmd.match("^(MOVE|LEFT|RIGHT|REPORT)$")){ // is a valid command other than place
            //command is exactly one of the expected values
            return new RobotCommand(trimmedCmd,null);
        }else if(trimmedCmd.match("^(PLACE [1-5],[1-5],(NORTH|EAST|SOUTH|WEST))$")){ // is a place command
            // command is a valid place command
            let split = trimmedCmd.split(" ");
            return new RobotPlaceCommand(split[0],split[1].split(","));
        }else{
            return null;
        }

    }
    /**
     * Take user input and return a message to the user regarding the success or not. 
     * @param cmdLine user supplied command
     * @returns message to display to the user
     */
    command(cmdLine : string) : string {
        let readyCmd = this._sanitizeCmd(cmdLine);
        if(readyCmd == null){
            return INVALID_COMMAND;
        }
        let result : boolean = false;
        if(readyCmd.action === PLACE_CMD){
            let cmd = readyCmd as RobotPlaceCommand;
            result = this.place(cmd.getX(),cmd.getY(),cmd.getDirection());
        }else if(!this.isPlaced()){
            return NOT_PLACED_ERROR;
        }if(readyCmd.action === MOVE_CMD){
            result = this.move();
        }else if(readyCmd.action == LEFT_CMD){
            result = this.left();
        }else if(readyCmd.action == RIGHT_CMD){
            result = this.right();
        }else if(readyCmd.action == REPORT_CMD){
            return this.report();
        }

        if(result){
            return readyCmd.action + " " + SUCCESS_MSG;
        }
        return INVALID_MOVE;

    }



}
/**
 * Object to hold a valid command
 */
class RobotCommand{
    action : string;
    args : string [] | null;
    constructor(action : string, args : string [] | null){
        this.action = action;
        this.args = args;
    }


}

/**
 * Object to hold a valid place command
 */
class RobotPlaceCommand extends RobotCommand{

    private _x : number = -1;
    private _y : number = -1;
    private _direction : string = "";
    constructor(action : string, args : string [] | null){
        super(action,args);
        if(args == null){
            throw new Error(PLACE_COMMAND_ARGS_MISSING_ERROR);
        
        }
        this._loadArgs(args);

    }

    getX() : number {
        return this._x;
    }

    getY() : number {
        return this._y;
    }

    getDirection() : string {
        return this._direction;
    }
    /**
     * Load the arguments
     * @param args arguments from the place command
     */
    private _loadArgs(args : string []){
        if(args.length != 3){
            throw new Error(PLACE_COMMAND_ARGS_WRONG_ERROR);
        }
        //TODO need to handle if args 0 or 1 are not a number 
        // right not this is handled by an external regex but it would be better here
        //args 0 is the x 
        this._x = +args[0];
        // args 1 is the y 
        this._y = +args[1];
        // args 2 is the direction
        if(DIRECTIONS.indexOf(args[2])== -1){ // reject invalid directions
            throw new Error(PLACE_COMMAND_ARGS_WRONG_ERROR);
        }
        this._direction = args[2];
    }

    



}



