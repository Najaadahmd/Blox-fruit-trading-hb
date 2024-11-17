// Fruit icons mapping
const fruitIcons = {
  dragon: 'https://i.ibb.co/DDNDKcP/65582601870070a4865d58bf64394b5c.jpg',
  phoenix: 'https://i.ibb.co/5k1xBRW/latest-1.png',
  quake: 'https://i.ibb.co/zxV7tvL/400.png',
  light: 'https://i.ibb.co/X8vhLb4/latest-0.png',
  dark: 'https://i.ibb.co/ZzJmB4g/340.png',
};

// Initialize trades array
let trades = JSON.parse(localStorage.getItem('trades')) || [];

// Handle username submission
document.getElementById('submit-username').addEventListener('click', function () {
  const robloxUsername = document.getElementById('roblox-username').value.trim();

  if (robloxUsername) {
    localStorage.setItem('username', robloxUsername);
    document.getElementById('welcome-message').textContent = `Welcome, ${robloxUsername}!`;
    document.getElementById('username-section').style.display = 'none';
    document.getElementById('trading-section').style.display = 'block';
    renderTrades(); // Render trades on the page
  } else {
    alert('Please enter your Roblox username.');
  }
});

// Handle trade posting
document.getElementById('post-trade').addEventListener('click', function () {
  const robloxUsername = localStorage.getItem('username');
  const offer = document.getElementById('item-offer').value;
  const request = document.getElementById('item-request').value;

  if (!robloxUsername) {
    alert('Please enter your Roblox username first.');
    return;
  }

  if (offer && request) {
    const newTrade = {
      username: robloxUsername,
      offer: offer,
      request: request,
    };
    trades.push(newTrade);
    localStorage.setItem('trades', JSON.stringify(trades)); // Save trades to localStorage
    renderTrades();
    document.getElementById('trade-form').reset();
    alert('Trade posted successfully!');
  } else {
    alert('Please select both offer and request fruits.');
  }
});

// Render trades
function renderTrades() {
  const tradeList = document.querySelector('#trade-list ul');
  tradeList.innerHTML = '';

  trades.forEach((trade, index) => {
    const tradeItem = document.createElement('li');
    tradeItem.innerHTML = `
      <div>
        <b>${trade.username}</b> offers 
        <img src="${fruitIcons[trade.offer]}" alt="${trade.offer}" class="fruit-img"> 
        <i>${trade.offer}</i> for 
        <img src="${fruitIcons[trade.request]}" alt="${trade.request}" class="fruit-img"> 
        <i>${trade.request}</i>
      </div>
      <button onclick="contactTrader(${index})">Contact</button>
    `;
    tradeList.appendChild(tradeItem);
  });
}

// Handle contact trader
function contactTrader(index) {
  const trade = trades[index];
  document.getElementById('contact-info').textContent = `Contacting ${trade.username} about their trade.`;
  document.getElementById('contact').style.display = 'block';
  window.location.href = "#contact";
}

// Handle message submission
document.getElementById('send-message').addEventListener('click', function () {
  const message = document.getElementById('contact-message').value.trim();

  if (message === '') {
    alert('Please enter a message.');
    return;
  }

  alert(`Your message has been sent: "${message}"`);
  document.getElementById('contact-message').value = '';
});

// Load saved username and trades
window.onload = function () {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    document.getElementById('welcome-message').textContent = `Welcome back, ${savedUsername}!`;
    document.getElementById('username-section').style.display = 'none';
    document.getElementById('trading-section').style.display = 'block';
  }
  renderTrades();
};