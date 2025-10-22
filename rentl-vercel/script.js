const propertyID = 33408;
const calendar = document.getElementById('calendar');
const loading = document.getElementById('loading');

async function fetchCalendar() {
  try {
    const response = await fetch(`/api/rentl-proxy?propertyID=${propertyID}`);
    const data = await response.json();
    loading.style.display = 'none';
    renderCalendar(data);
  } catch (error) {
    loading.textContent = 'Error loading calendar.';
    console.error(error);
  }
}

function renderCalendar(data) {
  if (!data || !data.availability) {
    calendar.innerHTML = '<p>No data available.</p>';
    return;
  }
  const days = data.availability;
  days.forEach(day => {
    const div = document.createElement('div');
    div.classList.add('calendar-day');
    div.classList.add(day.available ? 'available' : 'booked');
    div.textContent = new Date(day.date).getDate();
    calendar.appendChild(div);
  });
}

fetchCalendar();
