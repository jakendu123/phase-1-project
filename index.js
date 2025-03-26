document.addEventListener("DOMContentLoaded", function () {
  const donationForm = document.getElementById("donationForm");
  const donorList = document.getElementById("donorList");
  const totalDisplay = document.getElementById("total");
  let totalAmount = 0;

  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    if (name === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    totalAmount += amount;
    totalDisplay.textContent = `KES: ${totalAmount.toFixed(2)}`;

    const listItem = document.createElement("li");
    listItem.textContent = `${name} donated KES: ${amount.toFixed(2)}`;
    donorList.appendChild(listItem);

    donationForm.reset();
  });
});

// function performSearch() {
//   const query = document.getElementById("searchInput").value.trim();
//   if (query !== "") {
//     alert(
//       `Search functionality is not implemented. You searched for: "${query}"`
//     );
//   }
// }

// function startNewFundraiser() {
//   alert("Start A New Fundraiser functionality is not implemented.");

// }
