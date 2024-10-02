// Function to show alert popup
function showAlert(message, image) {
    const alertPopup = document.getElementById('alert-popup');
    const alertMessage = document.getElementById('alert-message');
    const alertImage = document.getElementById('alert-image');

    // Set the alert message and image
    alertMessage.textContent = message;
    alertImage.src = image; // Update the src of the image
    alertPopup.style.display = "flex"
    alertPopup.classList.add('show'); // Add class for bounce-in animation

    // // Automatically hide the alert after a few seconds (optional)
    // setTimeout(() => {
    //     alertPopup.style.display = "none"
    // }, 10000); // Adjust the time as needed (5000 ms = 5 seconds)
}

// Function to close alert popup
document.getElementById('alert-close').addEventListener('click', function() {
    const alertPopup = document.getElementById('alert-popup');
    alertPopup.classList.add('hide'); // Add the hide class to start bounce-out

    // Wait for the animation to finish, then set display to none
    setTimeout(() => {
        alertPopup.style.display = 'none'; // Hide the popup
        alertPopup.classList.remove('hide'); // Remove the class for future use
    }, 500); // Match this duration to the CSS transition duration
})

// Automatically connect to WebSocket server
const socket = new WebSocket('ws://localhost:9000');

// Connection opened
socket.onopen = () => {
    console.log("Connected to WebSocket server.");
};

// Listen for messages
socket.onmessage = function(event) {
    console.log("Message received:", event.data); // Log the incoming message
    const data = JSON.parse(event.data);
    
    if (data.alert && data.image) { // Check if both alert and image are present
        showAlert(data.alert, `data:image/jpeg;base64,${data.image}`);
    } else {
        console.error("Invalid data format:", data); // Log an error if the format is incorrect
    }
};

// Connection closed
socket.onclose = () => {
    console.log("Disconnected from WebSocket server.");
};

// Handle connection errors
socket.onerror = (error) => {
    console.log("WebSocket Error: ", error);
};

// function to change tabs
function openTab(tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }

    // Remove active class from all tabs
    const tabs = document.getElementsByClassName('tab');
    for (let tab of tabs) {
        tab.classList.remove('active');
    }

    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to the clicked tab
    event.currentTarget.classList.add('active');
}



