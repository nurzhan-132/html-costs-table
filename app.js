// Function to get expenses from Local Storage
function getExpenses() {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
}

// Function to save expenses to Local Storage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to update the expense table
function updateTable() {
  const expenses = getExpenses();
  const tableBody = document.getElementById("expenseTableBody");
  tableBody.innerHTML = ""; // Clear table body

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${expense.date}</td>
  <td>${expense.amount}</td>
  <td>${expense.category}</td>
  <td>${expense.comment}</td>
`;
    tableBody.appendChild(row);
  });
}

// Handle form submission
document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form data
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const comment = document.getElementById("comment").value;

    // Create new expense object
    const newExpense = { date, amount, category, comment };

    // Get existing expenses and add the new one
    const expenses = getExpenses();
    expenses.push(newExpense);

    // Save updated expenses to Local Storage
    saveExpenses(expenses);

    // Update the table
    updateTable();

    // Clear form fields
    document.getElementById("expenseForm").reset();
  });

// On page load, update the table
window.onload = updateTable;
