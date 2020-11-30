##Toy Robot Code Challenge

This small application has been created by **Iman Norouzi** in order to accomplish a code challenge for **IRESS company**.

The application has been written in pure javascript and doesn't use any framework or third party library. 

#### Project tree
The project consists of five files.

 * [index.html](./index.html) - Landing page
 * [app.js](./app.js) - The script that initiates the page, a robot object, and manages user inputs.
 * [Robot.js](./Robot.js) - The Robot class which is simulating a Robot with all the required attributes and methods.
 * [test.js](./test.js) - The script containing some simple test cases which is executed when the page is loaded.
 * [README.md](./README.md) - The file you are looking at now.

## How to run

  1. Open index.html or go to `this url` and that's it!

##How it works

It is possible to send commands to the Robot using three different methods.

1. Single Input - `app.js` has a listener set on the input field using `keyUp` function. It monitors each input character and sends the typed in value to Robot once `Enter` key is pressed. 
1. Textarea Input - It is possible to enter multiple commands in the textarea and send them to Robot by clicking on `Execute` button. This action is handled in `readTextArea` in `app.js`.
1. Text File Input - By choosing a txt file which contains the list of commands, `readInputFile` function would read the content of selected file and send it to simulated robot.

##Robot Object


`Robot` class is declared in `Robot.js` file and has below attributes and methods:
* x: number (0..4) - the column that Robot is located in
* y: number (0..4) - the row that Robot is located in
* f: number (0..4) - the direction that Robot is facing, 0: North, 1: EAST, 2: SOUTH, 3: WEST
* constructor( boardColumnCount: number, boardRowCount: number) 
* left(): boolean - turns the Robot to the left and returns true if successful
* right(): boolean - turns the Robot to the right and returns true if successful
* move(): boolean - moves the Robot one step forward and returns true if successful
* place(x: number, y: number, f: string): boolean - places the Robot on the board based on input parameters if they are valid and returns true if successful
* report(): string - returns current state of the Robot (x, y, face)
* isRobotPlaced(): boolean - tells if the Robot is placed on the board
* executeCommand(command: string): { actionPerformed: boolean, message: string } - executes a string command

## How to test

You can either use the input methods to test the application or use `test.js` file to test your own cases. To use `test.js` file, you need to put all your cases in `commandsContainer` object. It looks like below. Just change the values with your test cases.

If you find any failing assert (red message) in the browser console, that means a test case has failed.
```
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
```
