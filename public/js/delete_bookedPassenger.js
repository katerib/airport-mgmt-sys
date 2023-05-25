function deleteBookedPassenger(passengerID) {
    // Put our data we want to send in a javascript object
    let data = {
        passengerID: passengerID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-bookedPassenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteBookedPassengerRow(passengerID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteBookedPassengerRow(passengerID){
    let table = document.getElementById("Passengers_has_Flights");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == passengerID) {
            table.deleteRow(i);
            break;
       }
    }
    deleteBookedPassenger(passengerID);
}