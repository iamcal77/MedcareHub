const table = document.getElementById("schedule-table");

fetch("db.json")
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

      const bookingData = {
        id: id,
        name: "Patient Name"
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
          window.location.href = "next-page.html";
        })
        .catch(error => {
          console.error("Booking failed:", error);
        });
    } else {
      console.log("No available slots for booking.");
      // Display a message to the patient that all slots are full
      alert("All slots are full. Please try again later.");
    }
  }
});
