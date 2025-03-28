document.addEventListener("DOMContentLoaded", async function () {
  const donationForm = document.getElementById("donationForm");
  const donorList = document.getElementById("donorList");
  const totalDisplay = document.getElementById("total");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const categoryDropdown = document.getElementById("categoryDropdown");
  let totalAmount = localStorage.getItem("totalAmount")
    ? parseFloat(localStorage.getItem("totalAmount"))
    : 0;
  let selectedCause = "";

  function updateTotalDisplay() {
    totalDisplay.textContent = `KES: ${totalAmount.toFixed(2)}`;
  }

  updateTotalDisplay();

  async function fetchDonations() {
    try {
      const response = await fetch("http://localhost:3000/donations", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  }
  function listDonation(donation) {
  fetch("http://localhost:3000/donations", {
    method: "POST",
    headers: {
      Accept: "application/json",
     "Content-Type": "application/json"
        },
        body: JSON.stringify({
          donations_id: donations.id,
    name: donations.name,
    amount: donations.amount,
    category: donation.category  
        })
    }).then((response)=> response.json())
    .then((data) => renderDonations(data))
  });
listDonation(donations)
  const donations = await fetchDonations();
  function renderDonations(donations) {
    donorList.innerHTML = "";
    let calculatedTotal = 0;

    donations.forEach((donation) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${donation.name}: KES ${donation.amount} for "${donation.cause}"`;
      donorList.appendChild(listItem);

      calculatedTotal += parseFloat(donation.amount);
    });

    totalAmount = calculatedTotal;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();
  }
  renderDonations(donations);

  document.querySelectorAll(".btn-danger").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".card");
      selectedCause = card.querySelector("h4").textContent;
      alert(`You are donating to: ${selectedCause}`);
    });
  });

  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (name === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    if (!selectedCause) {
      alert("Please select a cause by clicking a 'Donate' button on a card.");
      return;
    }

    totalAmount += amount;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();

    const listItem = document.createElement("li");
    listItem.textContent = `${name} donated KES: ${amount.toFixed(
      2
    )} for "${selectedCause}"`;
    donorList.appendChild(listItem);

    alert(
      `${name}, you have donated KES: ${amount.toFixed(
        2
      )} for "${selectedCause}"`
    );

    event.target.reset();
    selectedCause = "";
  });

  searchButton.addEventListener("click", function () {
    categoryDropdown.style.display =
      categoryDropdown.style.display === "block" ? "none" : "block";
  });

  const dropdownItems =
    categoryDropdown.getElementsByClassName("dropdown-item");
  for (let item of dropdownItems) {
    item.addEventListener("click", function () {
      selectedCategory = this.getAttribute("data-value");
      searchInput.placeholder = `Search in ${selectedCategory}`;
      categoryDropdown.style.display = "none";
    });
  }

  const newFundraiserButton = document.querySelector("#newFundraiser");
  newFundraiserButton.addEventListener("click", function (event) {
    totalAmount = 0;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();

    donorList.innerHTML = "";

    alert("Fundraiser has been reset. Start a new fundraiser now!");
    event.target.reset(donorList);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all donate buttons
  const donateButtons = document.querySelectorAll(".btn-danger");
  const donationForm = document.getElementById("donationForm");

  // Hide the form initially
  donationForm.style.display = "none";
  // Add event listener to each donate button
  donateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Show the donation form when any donate button is clicked
      donationForm.style.display = "block";
    });
  });
});
