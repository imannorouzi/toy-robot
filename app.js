let robot;

function init() {
    robot = new Robot(5, 5);
}

function executeCommand(line){

    let result = robot.processCommand(line);
    appendCommand(line, result.actionPerformed ? 'green' : 'red');
    if(result.message){
        appendCommand(result.message, 'black');
    }
}

function appendCommand(command, colour){
    let commandDiv = document.createElement("div");
    commandDiv.style.color =  colour;
    commandDiv.innerHTML = command;
    document.getElementById('commands').appendChild(commandDiv);
}

function readTextArea() {
    let textArea = document.getElementById('commandTextArea');
    let lines = textArea.value.split('\n');
    for(let i=0; i<lines.length; i++){
        executeCommand(lines[i].toUpperCase());
    }
    textArea.value = ''
}

function readInputFile(){
    let fileInput = document.getElementById('fileInput');
    if(fileInput.files.length > 0){
        let file = fileInput.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let lines = e.target.result.split('\n');
            for(let i=0; i<lines.length; i++){
                if(lines[i]){
                    executeCommand( lines[i].toUpperCase() );
                }
            }
        };

        reader.readAsText(file);

        fileInput.innerHTML = '';
    }
}

function keyUp(event){
    if(event.key === 'Enter'){
        let command = event.target.value;
        executeCommand( command.toUpperCase() );
        event.target.value = '';
    }
}

window.addEventListener("load", init, false);
