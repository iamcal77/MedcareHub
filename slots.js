// Retrieve the schedule table element
const table = document.getElementById("schedule-table");

// Fetch the doctor data from the JSON file
fetch("gb.json")
  .then(response => response.json())
  .then(data => {
    const doctors = data.doctors;
    doctors.forEach(doctor => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${doctor.id}</td>
        <td>${doctor.name}</td>
        <td>${doctor["working-hours"]}</td>
        <td>${doctor["patients-no"]}</td>
        <td>${doctor["slots-booked"]}</td>
        <td><button class="book-button" data-id="${doctor.id}">Book</button></td>
      `;
      table.querySelector("tbody").appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching doctor data:", error);
  });

// Add event listener to the table to handle button clicks
table.addEventListener("click", (event) => {
  if (event.target.classList.contains("book-button")) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    const row = button.parentNode.parentNode;
    const patientsNoElement = row.querySelector("td:nth-child(4)");
    const slotsBookedElement = row.querySelector("td:nth-child(5)");
    let patientsNo = Number(patientsNoElement.textContent);
    let slotsBooked = Number(slotsBookedElement.textContent);

    if (slotsBooked < patientsNo) {
      slotsBooked++;
      slotsBookedElement.textContent = slotsBooked;
      patientsNo--;
      patientsNoElement.textContent = patientsNo;

      // Perform the booking request using Fetch API
      const bookingData = {
        id: id,
        name: "Patient Name" // Replace "Patient Name" with the actual patient's name
      };

      fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Booking successful:", data);
          // Redirect the patient to the next page
          window.location.href = "next-page.html"; // Replace "next-page.html" with your desired URL
        })
        .catch(error => {
          console.error("Booking failed:", error);
        });
    } else {
      console.log("No available slots for booking.");
    }
  }
});
