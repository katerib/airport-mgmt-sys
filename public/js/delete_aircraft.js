function deleteAircraft(aircraftID) {
    // Put our data we want to send in a javascript object
    let data = {
        aircraftID: aircraftID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-aircraft-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // refresh data
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteAircraftRow(aircraftID){

    let table = document.getElementById("Aircrafts");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == aircraftID) {
            table.deleteRow(i);
            break;
       }
    }
    deleteAircraft(aircraftID);
}