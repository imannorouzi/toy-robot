
// This is an array of command arrays. You can add your test cases to this and they would be executed
// when the page loads.
const commandsContainer = [
    [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'LEFT',
        'MOVE',
        'REPORT', // Please put the expected output just after REPORT
        'Output: 2,2,WEST'
    ],
    [
        'PLACE 0,0,NORTH',
        'MOVE',
        'REPORT',
        'Output: 0,1,NORTH'
    ],
    [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'MOVE',
        'REPORT',
        'Output: 3,3,NORTH'
    ]
];

/*
* Input: void
* Output: void
*
* Loops over commandsContainer and test each set
*
* */
function testAll(){
    for( let c=0; c<commandsContainer.length; c++){
        test(commandsContainer[c]);
    }
}

/*
* Input: string[]
* Output: void
*
* Receives a list of commands. Creates a Robot object and executes the commands on that one by one.
* When reaches to a 'REPORT' command, checks the robot state with the expected output and it would
* give a assert error in console if it fails otherwise console would be empty!
*
* */
function test(commands){
    // crate a robot object
    let testRobot = new Robot(5, 5);
    for( let i=0; i<commands.length; i++){
        if(commands[i] === 'REPORT') {
            let output = testRobot.report();
            console.assert( output === commands[++i], output);
        } else {
            testRobot.processCommand(commands[i]);
        }
    }
}

// execute testAll function when the page loads
window.addEventListener("load", testAll, false);
