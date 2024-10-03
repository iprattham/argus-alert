// Function to show alert popup
function showAlert(message, image) {
    const alertPopup = document.getElementById('alert-popup');
    const alertMessage = document.getElementById('alert-message');
    const alertImage = document.getElementById('alert-image');

    // Set the alert message and image
    alertMessage.textContent = message;
    alertImage.src = image; // Update the src of the image
    alertPopup.style.display = "flex";
    alertPopup.classList.add('show'); // Add class for bounce-in animation

    // Automatically hide the alert after a few seconds (optional)
    // setTimeout(() => {
    //     alertPopup.style.display = "none";
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
});

// Automatically connect to Socket.IO server
const socket = io('https://socket-test-auty.onrender.com'); // Use your Render URL here

// Connection opened
socket.on('connect', () => {
    console.log("Connected to Socket.IO server.");
});

// Listen for alert messages
socket.on('alert', (data) => {
    console.log("Message received:", data); // Log the incoming message

    if (data.alert && data.image) { // Check if both alert and image are present
        showAlert(data.alert, `data:image/jpeg;base64,${data.image}`); // Correctly format the image
    } else {
        console.error("Invalid data format:", data); // Log an error if the format is incorrect
    }
});

// Connection closed
socket.on('disconnect', () => {
    console.log("Disconnected from Socket.IO server.");
});

// Handle connection errors
socket.on('error', (error) => {
    console.log("Socket.IO Error: ", error);
});

// Function to change tabs
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
