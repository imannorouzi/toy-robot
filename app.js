
// reference to robot object
let robot;

/* executes when the page loads*/
function init() {
    /* Instantiate a Robot object on a 5x5 board
    * THe problem requirement mentions 5x5 board but it can be any pair of positive values
    *  */
    robot = new Robot(5, 5);
}

/*
* Input: string command
* Output: void
*
* Sends the command to robot object and retrieves result which is { actionPerformed: boolean, message: string }
*
* */
function executeCommand(line){
    let result = robot.processCommand(line);

    // append the command to command placeholder in red(fail) or green(success)
    appendCommand(line, result.actionPerformed ? 'green' : 'red');

    // some commands like 'REPORT' have a 'message' filed as well
    if(result.message){
        appendCommand(result.message, 'black');
    }
}

/*
* Input: string 'text' and string 'colour'
* Output: void
*
* Appends a string to the command placeholder and sets the colour
*
* */
function appendCommand(text, colour){
    let commandDiv = document.createElement("div");
    commandDiv.style.color =  colour;
    commandDiv.innerHTML = text;
    document.getElementById('commands').appendChild(commandDiv);
}

/*
* Input: void
* Output: void
*
* Captures the text from the 'commandTextArea' element and sends sends each line as a command to robot
*
* */
function readTextArea() {
    let textArea = document.getElementById('commandTextArea');
    let lines = textArea.value.split('\n');
    for(let i=0; i<lines.length; i++){
        executeCommand(lines[i].toUpperCase());
    }

    // clear textarea after it's done
    textArea.value = ''
}

/*
* Input: void
* Output: void
*
* This is triggered when a file is selected by the user. It tries to read the content of the file and
* send it line by line to the robot to be executed as a command
*
* */
function readInputFile(){
    let fileInput = document.getElementById('fileInput');
    if(fileInput.files.length > 0){
        let file = fileInput.files[0];

        // TODO: we need to check if the FileReader is available
        let reader = new FileReader();

        // set onload listener
        reader.onload = function (e) {
            let lines = e.target.result.split('\n');
            for(let i=0; i<lines.length; i++){
                if(lines[i]){
                    executeCommand( lines[i].toUpperCase() );
                }
            }
        };

        // read the file as text
        reader.readAsText(file);

        // clear the file input, so we can select the same file again
        fileInput.innerHTML = '';
    }
}

/*
* Input: void
* Output: void
*
* Triggers once a keyUp event happens for single input field.
*
* */
function keyUp(event){
    // if it's an 'Enter' key take the value as a command and send it to robot
    if(event.key === 'Enter'){
        let command = event.target.value;
        executeCommand( command.toUpperCase() );

        // clear the input
        event.target.value = '';
    }
}


// call 'init' function when page loads
window.addEventListener("load", init, false);
