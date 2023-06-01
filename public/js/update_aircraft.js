// Get the objects we need to modify
let updateAircraftForm = document.getElementById('update-aircraft-form-ajax');

// Modify the objects we need
updateAircraftForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let aircraftSelect = document.getElementById("aircraft-select");
    let maxPassengerSelect = document.getElementById("input-maxPassenger-update");
    let airlineCompanySelect = document.getElementById("input-airlineCompany-update");

    // Get the values from the form fields
    let aircraftIDValue = aircraftSelect.value;
    let maxPassengerValue = maxPassengerSelect.value;
    let airlineCompanyValue = airlineCompanySelect.value;

    // Abort if value is null or not a number
    if (isNaN(maxPassengerValue) || airlineCompanyValue===null) {
        return alert("Please insert a value for maximum passengers and airlinecompany");
    }
    // Put our data we want to send in a JavaScript object
    let data = {
        aircraftID: aircraftIDValue,
        maxPassengers: maxPassengerValue,
        airlineCompany: airlineCompanyValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-aircraft-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // aircraft updated successfully
            console.log("aircraft updated successfully");
            // Refresh the page or perform any other necessary actions
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error updating the aircraft.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
