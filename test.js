const commandsContainer = [
    [
        'PLACE 1,2,EAST',
        'MOVE',
        'MOVE',
        'LEFT',
        'LEFT',
        'MOVE',
        'REPORT',
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

function testAll(){
    for( let c=0; c<commandsContainer.length; c++){
        test(commandsContainer[c]);
    }
}

function test(commands){
    let testRobot = new Robot(5, 5);
    let i=0;
    for( ;i<commands.length; i++){
        if(commands[i] === 'REPORT') break;
        testRobot.processCommand(commands[i]);
    }

    let output = testRobot.report();
    console.assert( output === commands[i+1], output);
}


window.addEventListener("load", testAll, false);
