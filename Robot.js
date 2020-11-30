// This object is used to convert face strings to face numbers (indexes). This helps to
// turn left and right easier just by decreasing and increasing a number
const FACE = [ 'NORTH', 'EAST', 'SOUTH', 'WEST' ];

/**
 * Robot Object
 *
 * Description: It is better to create this in a ts file to be able to define data types and make it more readable
 * but I decided to deliver this application in pure javascript and that's why I'm not using data types
 *
 * Description. (use period)
 *
 * @author Iman Norouzi
 */
class Robot {

    // It's not needed to declare 'undefined' members in js, but I just put them to introduce the Robot object

    // size of the board
    boardCols; boardRows;

    // x keeps horizontal index (column) and y keeps the vertical index (row) starting from 0
    x; y;

    /*
     * facing direction. I used it as a number in which
     * 0 is North
     * 1 is East
     * 2 is South
     * 3 is West
     */
    f;

    /**
     * Description: Places the robot in position (x, y) facing f direction and returns true if place is valid
     *
     * @param {number} x
     * @param {number} y
     *
     * @return {boolean}
     */
    place(x, y, f){

        // check if the place is valid
        if( x < 0 ||
            x >= this.boardCols ||
            y < 0 || y >= this.boardRows ||
            FACE.indexOf(f) === -1
        ) {
            // place is not valid
            return false;
        }

        this.x = x;
        this.y = y;
        this.f = FACE.indexOf(f);
        return true;
    }

    /**
     * Description: Constructor to instantiate a Robot object. Sets the board limits.
     *
     * @param {number}  boardCols
     * @param {number} boardRows
     * */
    constructor(boardCols, boardRows){
        this.boardCols = boardCols;
        this.boardRows = boardRows;
    }

    /**
     * Description: Turns the robot to the 90 degrees to the left and returns true if success (which is always after robot has been placed)
     *
     * @return {boolean}
     * */
    left(){
        if(!this.isRobotPlaced()) {
            return false;
        }

        // decrease f by 1 and ensure it's between 0 and 3
        this.f = ((this.f - 1) + FACE.length) % FACE.length;
        return true;
    }

    /**
     * Description: Turns the robot to the 90 degrees to the right and returns true if success (which is always after robot has been placed)
     *
     * @return {boolean}
     * */
    right(){
        if(!this.isRobotPlaced()) {
            return false;
        }
        // increase f by 1 and ensure it's between 0 and 3
        this.f = (this.f + 1) % FACE.length;
        return true;
    }

    /**
     * description: Moves robot one step forward and return true if there is space forward otherwise returns false
     *
     * @return {boolean}
     * */
    move(){

        // Check if robot has been placed
        if(!this.isRobotPlaced()) {
            return false;
        }

        switch (this.f) {
            case 0: // NORTH
                if (this.y < this.boardRows - 1) {
                    // move forward vertically
                    this.y = this.y + 1;
                } else {
                    // it would fall out
                    return false;
                }
                break;

            case 1: // EAST
                if (this.x < this.boardCols - 1) {
                    // move forward horizontally
                    this.x = this.x + 1;
                } else {
                    // it would fall out
                    return false;
                }
                break;

            case 2: // SOUTH
                if (this.y > 0) {
                    // move back vertically
                    this.y = this.y - 1;
                } else {
                    // it would fall out
                    return false;
                }
                break;

            case 3: // WEST
                if (this.x > 0) {
                    // move back horizontally
                    this.x = this.x - 1;
                } else {
                    // it would fall out
                    return false;
                }
                break;

        }

        return true;
    }

    /**
     * Description: returns the state of the robot in the format of 'Output X,Y,FACE' if robot has placed before
     *
     * @return {string}
     * */
    report(){
        // check if robot is placed
        if(this.isRobotPlaced()) {
            return  'Output: ' + this.x + ',' + this.y + ',' + FACE[this.f];
        }
        return 'Output: Robot is not placed yet!';
    }


    /**
     *
     * Description: returns true if x, y and f have values which means robot has placed on the board
     *
     * @return {boolean}
     * */
    isRobotPlaced(){
        return typeof this.x !== "undefined" &&
            typeof this.y !== "undefined" &&
            typeof this.f !== "undefined";
    }


    /**
     * Description: receives a line of input, checks it's validity and performs the command, if the command has an
     * effect on the robot state or command = 'REPORT', it would return actionPerformed as true otherwise actionPerformed
     * would be false. For some commands like 'REPORT' robot needs to return some message which is
     * communicated using message filed in the return object
     *
     * @param {string} line
     * @return {Object} { actionPerformed: boolean, message: string }
     * */
    processCommand(line){

        let actionPerformed = false;
        let message = '';

        // check the command syntax using regex test.
        // allowed commands are MOVE, LEFT, RIGHT, REPORT and PLACE x,y,FACE
        if(/(MOVE|LEFT|RIGHT|REPORT|(PLACE \d,\d,(NORTH|EAST|WEST|SOUTH)))/.test(line)){

            // the first chunk is the main command
            let command = line.split(' ');
            switch (command[0]) {
                case 'PLACE':

                    // The second chunk is place command parameters comma separated.
                    let args = command[1].split(',');
                    let x = Number(args[0]);
                    let y = Number(args[1]);
                    let face = args[2];

                    // try to place the robot
                    actionPerformed = this.place(x, y, face);
                    break;

                case 'MOVE':
                    actionPerformed = this.move();
                    break;
                case 'LEFT':
                    actionPerformed = this.left();
                    break;
                case 'RIGHT':
                    actionPerformed = this.right();
                    break;
                case 'REPORT':
                    // actionPerformed for REPORT is always true for consistency
                    actionPerformed = true;

                    // REPORT command sends back a message too
                    message = this.report();
                    break;
            }
        } else {
            // regex test failed which means command format is not as expected.
            message = 'command not recognized'
        }

        // TODO: It was better to have a class for the return object, but I thought this way it's easier to read.
        return {
            actionPerformed: actionPerformed,
            message: message
        };

    }

}
