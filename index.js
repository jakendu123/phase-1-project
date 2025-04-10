document.addEventListener("DOMContentLoaded", async function () {
  const donationForm = document.getElementById("donationForm");
  const donorList = document.getElementById("donorList");
  const totalDisplay = document.getElementById("total");
  const categoryDropdown = document.getElementById("category");
  const newFundraiserButton = document.getElementById("newFundraiser");
  const donateButtons = document.querySelectorAll(".btn-danger");
  let selectedCause = "";
  let totalAmount = localStorage.getItem("totalAmount")
    ? parseFloat(localStorage.getItem("totalAmount"))
    : 0;

  function updateTotalDisplay() {
    totalDisplay.textContent = `KES: ${totalAmount.toFixed(2)}`;
  }
  updateTotalDisplay();

  async function fetchDonations() {
    try {
      const response = await fetch("http://localhost:3000/donations");
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  }

  function renderDonations(donations) {
    donorList.innerHTML = "";
    let calculatedTotal = 0;

    donations.forEach((donation) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${donation.name} donated KES ${donation.amount} for "${donation.cause}"`;
      donorList.appendChild(listItem);
      calculatedTotal += parseFloat(donation.amount);
    });

    totalAmount = calculatedTotal;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();
  }

  async function listDonation(donation) {
    try {
      const response = await fetch("http://localhost:3000/totalAmount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donation),
      });
      if (response.ok) {
        const newDonation = await response.json();
        renderDonations([...donations, newDonation]);
      }
    } catch (error) {
      console.error("Error saving donation:", error);
    }
  }

  const donations = await fetchDonations();
  renderDonations(donations);

  donateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      selectedCause = card.querySelector("h4").textContent;
      alert(`You are donating to: ${selectedCause}`);
      donationForm.style.display = "block"; // Show the form
    });
  });
async function postDonation(donation) {
  try {
    const response = await fetch("http://localhost:3000/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donation),
    });

    if (!response.ok) throw new Error("Failed to save donation");
    const newDonation = await response.json();
    renderDonations([...donations, newDonation]);
  } catch (error) {
    console.error("Error posting donation:", error);
  }
}
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const amount = Number(document.getElementById("amount").value);

    if (!name || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    if (!selectedCause) {
      alert("Please select a cause by clicking a 'Donate' button on a card.");
      return;
    }

    const donation = { name, amount, category: selectedCause };
    listDonation(donation);
postDonation(donation);
    totalAmount += amount;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();

    const listItem = document.createElement("li");
    listItem.textContent = `${name} donated KES ${amount.toFixed(
      2
    )} for "${selectedCause}"`;
    donorList.appendChild(listItem);

    alert(
      `${name}, you have donated KES ${amount.toFixed(
        2
      )} for "${selectedCause}"`
    );

    donationForm.reset();
    selectedCause = "";
  });

  newFundraiserButton.addEventListener("click", function () {
    totalAmount = 0;
    localStorage.setItem("totalAmount", totalAmount);
    updateTotalDisplay();
    donorList.innerHTML = "";
    alert("Fundraiser has been reset. Start a new fundraiser now!");
  });
});
