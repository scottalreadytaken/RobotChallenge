import {DIRECTIONS, INVALID_COMMAND, INVALID_DIMS_ERROR, INVALID_MOVE, NOT_PLACED_ERROR, PLACE_COMMAND_ARGS_MISSING_ERROR, Robot, ROBOT_EAST, ROBOT_NORTH, ROBOT_SOUTH, ROBOT_WEST, SUCCESS_MSG} from "../robot/core";


test('setup a valid board', () => {

    let robot = new Robot(5,5);
    robot.place(1,1,"NORTH");
    let report = robot.report();
    console.log(report);
    robot.left();
    expect(robot.getDirection() == "WEST");

});

test('check for error when robot is not placed ', () => {
    let robot = new Robot(5,5);
    
    expect(robot.left()).toEqual(false);
    expect(robot.right()).toEqual(false);
    expect(robot.move()).toEqual(false);


});

test('rotate the robot ', () => {

    let robot = new Robot(5,5);
    robot.place(1,1,ROBOT_EAST);
    robot.left();
    expect(robot.getDirection()).toEqual(ROBOT_NORTH);
    robot.left();
    expect(robot.getDirection()).toEqual(ROBOT_WEST);
    robot.left();
    expect(robot.getDirection()).toEqual(ROBOT_SOUTH);
    robot.left();
    expect(robot.getDirection()).toEqual(ROBOT_EAST);
    robot.left();
    expect(robot.getDirection()).toEqual(ROBOT_NORTH);
    robot.right();
    expect(robot.getDirection()).toEqual(ROBOT_EAST);
    robot.right();
    expect(robot.getDirection()).toEqual(ROBOT_SOUTH);
    robot.right();
    expect(robot.getDirection()).toEqual(ROBOT_WEST);
    robot.right();
    expect(robot.getDirection()).toEqual(ROBOT_NORTH);
    robot.right();
    expect(robot.getDirection()).toEqual(ROBOT_EAST);

});

test('test valid moving sequence', () => {

    let robot = new Robot(5,5);
    // robot is at the top right
    // facing down
    expect(robot.place(5,5,ROBOT_SOUTH)).toEqual(true); 
    expect(robot.move()).toEqual(true);
    // robot should now be at 5,4
    expect(robot.getX()).toEqual(5);
    expect(robot.getY()).toEqual(4);

    //rotate west then move
    robot.right();
    expect(robot.move()).toEqual(true);
    // robot should now be at 4,4
    expect(robot.getX()).toEqual(4);
    expect(robot.getY()).toEqual(4);

    //rotate north then move
    robot.right();
    expect(robot.move()).toEqual(true);
    // robot should now be at 4,5
    expect(robot.getX()).toEqual(4);
    expect(robot.getY()).toEqual(5);

    // rotate east then move
    robot.right();
    expect(robot.move()).toEqual(true);
    // should be back at 5,5
    expect(robot.getX()).toEqual(5);
    expect(robot.getY()).toEqual(5);


});

test('error when moving off board', () => {

    let robot = new Robot(5,5);
    expect(robot.place(1,5,ROBOT_NORTH)).toEqual(true);
    expect(robot.move()).toEqual(false);

    expect(robot.place(3,1,ROBOT_SOUTH)).toEqual(true);
    expect(robot.move()).toEqual(false);

    expect(robot.place(5,2,ROBOT_EAST)).toEqual(true);
    expect(robot.move()).toEqual(false);

    expect(robot.place(1,3,ROBOT_WEST)).toEqual(true);
    expect(robot.move()).toEqual(false);

});

test('only allow valid placement', () => {

    let robot = new Robot(5,5);
    expect(robot.place(6,5,ROBOT_NORTH)).toEqual(false);

    expect(robot.place(5,6,ROBOT_NORTH)).toEqual(false);

    expect(robot.place(0,0,ROBOT_NORTH)).toEqual(false);

});

test('ensure board cells are not 0 based', () => {

    expect(() => {
        new Robot(0,0);
      }).toThrow(INVALID_DIMS_ERROR);

});


test('confirm negative dimension boards are not created. ', () => {

    expect(() => {
        new Robot(-1,5);
      }).toThrow(INVALID_DIMS_ERROR);

    expect(() => {
        new Robot(5,-1);
      }).toThrow(INVALID_DIMS_ERROR);
    
    expect(() => {
        new Robot(1,-5);
      }).toThrow(INVALID_DIMS_ERROR);


});


test('test invalid commands', () => {

    let robot = new Robot(5,5);
    expect(robot.command("ROBOT")).toEqual(INVALID_COMMAND);
   
    //place with no args
    expect(robot.command("PLACE")).toEqual(INVALID_COMMAND);


});

test('test command sequence', () => {

    let robot = new Robot(5,5);
    expect(robot.command("place 1,1,NORTH")).toEqual("PLACE " + SUCCESS_MSG);
    expect(robot.command("MOVE")).toEqual("MOVE " + SUCCESS_MSG);
    expect(robot.command("RIGHT")).toEqual("RIGHT " + SUCCESS_MSG);
    expect(robot.command("MOVE")).toEqual("MOVE " + SUCCESS_MSG);
    expect(robot.command("REPORT")).toEqual("X: 2 Y: 2 Looking: EAST");
    expect(robot.command("LEFT")).toEqual("LEFT " + SUCCESS_MSG);
    expect(robot.command("LEFT")).toEqual("LEFT " + SUCCESS_MSG);
    expect(robot.command("MOVE")).toEqual("MOVE " + SUCCESS_MSG);
    expect(robot.command("MOVE")).toEqual(INVALID_MOVE);
});