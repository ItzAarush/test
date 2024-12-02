// Function to change the text of the button when a period is selected
function setPeriod(event, period) {
    event.preventDefault(); // Prevent the default anchor behavior (page refresh)
    document.querySelector('.filterCalendar-dropbtn').textContent = period; // Change the button text
}
