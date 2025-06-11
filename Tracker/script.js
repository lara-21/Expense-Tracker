const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    total += parseFloat(expense.amount);

    const li = document.createElement('li');
    li.className = 'expense-item';

    const details = document.createElement('div');
    details.className = 'expense-details';

    const title = document.createElement('span');
    title.className = 'expense-title';
    title.textContent = expense.title;

    const date = document.createElement('span');
    date.className = 'expense-date';
    date.textContent = formatDate(expense.date);

    details.appendChild(title);
    details.appendChild(date);

    const amount = document.createElement('span');
    amount.className = 'expense-amount';
    amount.textContent = `₹${parseFloat(expense.amount).toFixed(2)}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      expenses.splice(index, 1);
      renderExpenses();
    };

    li.appendChild(details);
    li.appendChild(amount);
    li.appendChild(delBtn);

    expenseList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return `${d.getDate().toString().padStart(2, '0')}/${
    (d.getMonth() + 1).toString().padStart(2, '0')
  }/${d.getFullYear()}`;
}

form.onsubmit = function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;

  if (!title || !amount || !date) return;

  expenses.push({ title, amount, date });
  form.reset();
  renderExpenses();
};


renderExpenses();
