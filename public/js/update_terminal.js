// Get the objects we need to modify
let updateTerminalForm = document.getElementById('update-terminal-form-ajax');

// Modify the objects we need
updateTerminalForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTerminalID = document.getElementById("terminal-select");
    let inputTerminalName = document.getElementById("input-terminalName-update");
    let inputNumGates = document.getElementById("input-numGates-update");
    let inputNumOpenGates = document.getElementById("input-numOpenGates-update");

    // Get the values from the form fields
    let terminalIDValue = inputTerminalID.value;
    let terminalNameValue = inputTerminalName.value;
    let numGatesValue = inputNumGates.value;
    let numOpenGatesValue = inputNumOpenGates.value;

    // Abort if value is null or not a number for numGates or numOpenGates
    if (isNaN(numGatesValue) || isNaN(numOpenGatesValue)) {
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        terminalID: terminalIDValue,
        terminalName: terminalNameValue,
        numGates: numGatesValue,
        numOpenGates: numOpenGatesValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-terminal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Terminal updated successfully
            console.log("Terminal updated successfully");
            // Refresh the page
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error updating the terminal.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
