const FACE = [ 'NORTH', 'EAST', 'SOUTH', 'WEST' ];

class Robot {

    // size of the board
    boardCols; boardRows;

    // location
    x; y;
    // face
    f;

    place(x, y, f){
        if( x < 0 ||
            x >= this.boardCols ||
            y < 0 || y >= this.boardRows ||
            FACE.indexOf(f) === -1
        ) {
            return false;
        }
        this.x = x;
        this.y = y;
        this.f = FACE.indexOf(f);
        return true;
    }

    constructor(boardCols, boardRows){
        this.boardCols = boardCols;
        this.boardRows = boardRows;
    }

    left(){
        if(!this.isRobotPlaced()) {
            return false;
        }
        this.f = ((this.f - 1) + FACE.length) % FACE.length;
        return true;
    }

    right(){
        if(!this.isRobotPlaced()) {
            return false;
        }
        this.f = (this.f + 1) % FACE.length;
        return true;
    }

    move(){
        if(!this.isRobotPlaced()) {
            return false;
        }

        switch (this.f) {
            case 0: // NORTH
                if (this.y < this.boardRows - 1) {
                    this.y = this.y + 1;
                } else {
                    return false;
                }
                break;

            case 1: // EAST
                if (this.x < this.boardCols - 1) {
                    this.x = this.x + 1;
                } else {
                    return false;
                }
                break;

            case 2: // SOUTH
                if (this.y > 0) {
                    this.y = this.y - 1;
                } else {
                    return false;
                }
                break;

            case 3: // WEST
                if (this.x > 0) {
                    this.x = this.x - 1;
                } else {
                    return false;
                }
                break;

        }

        return true;
    }

    report(){
        if(this.isRobotPlaced()) {
            return  'Output: ' + this.x + ',' + this.y + ',' + FACE[this.f];
        }
        return 'Output: Robot is not placed yet!';
    }

    isRobotPlaced(){
        return typeof this.x !== "undefined" &&
            typeof this.y !== "undefined" &&
            typeof this.f !== "undefined";
    }

    processCommand(line){

        let actionPerformed = false;
        let message = '';
        if(/(MOVE|LEFT|RIGHT|REPORT|(PLACE \d,\d,(NORTH|EAST|WEST|SOUTH)))/.test(line)){
            let command = line.split(' ');
            switch (command[0]) {
                case 'PLACE':
                    let args = command[1].split(',');
                    let x = Number(args[0]);
                    let y = Number(args[1]);
                    let face = args[2];
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
                    actionPerformed = true;
                    message = this.report();
                    break;
            }
        } else {
            message = 'command not recognized'
        }


        return {
            actionPerformed: actionPerformed,
            message: message
        };

    }

}
