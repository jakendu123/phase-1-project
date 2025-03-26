document.addEventListener("DOMContentLoaded", function () {
  const donationForm = document.getElementById("donationForm");
  const donorList = document.getElementById("donorList");
  const totalDisplay = document.getElementById("total");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const categoryDropdown = document.getElementById("categoryDropdown");
 // let selectedCategory = "";
  let totalAmount = 0;

  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const selectedCategory = document.getElementById("category").value;
    if (name === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    totalAmount += amount;
    totalDisplay.textContent = `KES: ${totalAmount.toFixed(2)}`;

    const listItem = document.createElement("li");
    listItem.textContent = `${name} donated KES: ${amount.toFixed(2)}`;
    donorList.appendChild(listItem);

    alert(
      `${name}, you have donated KES: ${amount.toFixed(
        2
      )} for the category: ${selectedCategory}`
    );

    event.target.reset();
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

//   searchButton.addEventListener("click", performSearch);

//    function performSearch() {
//     const query = searchInput.value.trim();

//     if (query !== "") {
//       alert(
//         `Search functionality is not implemented. You searched for: "${query}" in category: "${selectedCategory}"`
//       );
//     } else {
//       alert("Please enter a search query.");
//     }
//   }

  const newFundraiserButton = document.querySelector(
    "button[type='button']:nth-of-type(2)"
  );
  newFundraiserButton.addEventListener("click", startNewFundraiser);

  function startNewFundraiser() {
     document.querySelector(".total").innerHTML = " "
    alert("Start A New Fundraiser functionality is not implemented.");
  }
});
