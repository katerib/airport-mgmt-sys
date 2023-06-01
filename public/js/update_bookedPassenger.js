// Get the objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

// Modify the objects we need
updatePassengerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let passengerSelect = document.getElementById("passenger-select");
    let flightIDSelect = document.getElementById("input-flightID-update");

    // Get the values from the form fields
    let passengerID = passengerSelect.value;
    let flightID = flightIDSelect.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        passengerID: passengerID,
        flightID: flightID || null // Set flightID as null if no value is selected
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-bookedPassenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Booked passenger updated successfully
            console.log("Booked passenger updated successfully");
            // Refresh the page or perform any other necessary actions
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error updating the booked passenger.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
