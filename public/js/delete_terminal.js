function deleteTerminal(terminalID) {
    // Put our data we want to send in a javascript object
    let data = {
        terminalID: terminalID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-terminal-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteTerminalRow(terminalID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteTerminalRow(terminalID){

    let table = document.getElementById("Terminals");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == terminalID) {
            table.deleteRow(i);
            break;
       }
    }
    deleteTerminal(terminalID);
}