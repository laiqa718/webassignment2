const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// In-memory array to store expenses
let expenses = [];

// Route: Display expense tracker page with current expenses
app.get('/', (req, res) => {
  // Calculate total expense
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  res.render('index', { expenses, total });
});

// Route: Add a new expense
app.post('/add-expense', (req, res) => {
  const { description, amount } = req.body;
  if (description && amount && !isNaN(amount)) {
    expenses.push({ description, amount: parseFloat(amount) });
  }
  res.redirect('/');
});

// Route: Delete an expense by index
app.post('/delete-expense', (req, res) => {
  const index = parseInt(req.body.index);
  if (!isNaN(index) && index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Expense tracker app listening at http://localhost:${port}`);
});
