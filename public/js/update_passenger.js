// Get the objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

// Modify the objects we need
updatePassengerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let passengerSelect = document.getElementById("passenger-select");
    let firstNameSelect = document.getElementById("input-firstName-update");
    let lastNameSelect = document.getElementById("input-lastName-update");

    // Get the values from the form fields
    let passengerIDValue = passengerSelect.value;
    let firstNameValue = firstNameSelect.value;
    let lastNameValue = lastNameSelect.value;

    // Abort if value is null or not a number
    if (firstNameValue===null || lastNameValue===null) {
        return alert("Please insert a value for first and last name fields");
    }
    // Put our data we want to send in a JavaScript object
    let data = {
        passengerID: passengerIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-passenger-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // passenger updated successfully
            console.log("passenger updated successfully");
            // Refresh the page or perform any other necessary actions
            location.reload();
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error updating the passenger.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});
