
// Central Data Hub for HotelPro
let data = {
  bookings: [],
  payments: [],
  rooms: [],
  settings: {
    hotelName: "HotelPro",
    logo: "logo.png",
    currency: "ZAR"
  }
};

// Load data from localStorage if it exists
function loadData() {
  const saved = localStorage.getItem('hotelProData');
  if (saved) data = JSON.parse(saved);
  return data;
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('hotelProData', JSON.stringify(data));
}

// --- Booking Functions ---
function addBooking(booking) {
  data.bookings.push(booking);
  saveData();
}

function updateBooking(index, updatedBooking) {
  data.bookings[index] = updatedBooking;
  saveData();
}

function deleteBooking(index) {
  data.bookings.splice(index, 1);
  saveData();
}

// --- Payment Functions ---
function addPayment(payment) {
  data.payments.push(payment);
  saveData();
}

function updatePayment(index, updatedPayment) {
  data.payments[index] = updatedPayment;
  saveData();
}

function deletePayment(index) {
  data.payments.splice(index, 1);
  saveData();
}

// --- Room Functions ---
function addRoom(room) {
  data.rooms.push(room);
  saveData();
}

function updateRoom(index, updatedRoom) {
  data.rooms[index] = updatedRoom;
  saveData();
}

function deleteRoom(index) {
  data.rooms.splice(index, 1);
  saveData();
}

// --- Settings Functions ---
function updateSettings(newSettings) {
  data.settings = {...data.settings, ...newSettings};
  saveData();
}

// Initialize on page load
loadData();
