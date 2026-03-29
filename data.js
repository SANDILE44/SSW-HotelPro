// ------------------- Global Data.js with localStorage -------------------

// ------------------- Initialize Data -------------------

let bookings = JSON.parse(localStorage.getItem("bookings")) || [
{
id: 1,
guest: "John Doe",
room: "101",
checkin: "2026-03-28",
checkout: "2026-03-30",
numGuests: 2,
roomType: "Single",
status: "Confirmed",
specialRequests: "Late check-in",
revenue: 1200
},
{
id: 2,
guest: "Jane Smith",
room: "102",
checkin: "2026-03-27",
checkout: "2026-03-29",
numGuests: 1,
roomType: "Double",
status: "Pending",
specialRequests: "",
revenue: 900
}
];

let payments = JSON.parse(localStorage.getItem("payments")) || [
{
id: 1,
guest: "John Doe",
amount: 1200,
date: "2026-03-28",
method: "Card",
status: "Paid"
},
{
id: 2,
guest: "Jane Smith",
amount: 900,
date: "2026-03-27",
method: "Cash",
status: "Pending"
}
];

let rooms = JSON.parse(localStorage.getItem("rooms")) || [
{ number: "101", type: "Single", status: "Occupied", price: 600 },
{ number: "102", type: "Double", status: "Available", price: 900 },
{ number: "103", type: "Suite", status: "Maintenance", price: 1500 }
];

let hotelSettings = JSON.parse(localStorage.getItem("hotelSettings")) || {
hotelName: "HotelPro",
hotelAddress: "123 Main Street",
hotelPhone: "+27 123 456 789",
hotelWebsite: "www.hotelpro.com",
adminName: "Admin User",
adminEmail: "admin@hotelpro.com",
theme: "light",
logo: "logo.png"
};

// ------------------- Save All Data -------------------

function saveData() {
localStorage.setItem("bookings", JSON.stringify(bookings));
localStorage.setItem("payments", JSON.stringify(payments));
localStorage.setItem("rooms", JSON.stringify(rooms));
localStorage.setItem("hotelSettings", JSON.stringify(hotelSettings));
}

// ------------------- BOOKINGS -------------------

function addBooking(booking) {
booking.id = Date.now();
bookings.push(booking);
saveData();
}

function updateBooking(index, booking) {
bookings[index] = booking;
saveData();
}

function deleteBooking(index) {
bookings.splice(index, 1);
saveData();
}

// ------------------- PAYMENTS -------------------

function addPayment(payment) {
payment.id = Date.now();
payments.push(payment);
saveData();
}

function updatePayment(index, payment) {
payments[index] = payment;
saveData();
}

function deletePayment(index) {
payments.splice(index, 1);
saveData();
}

// ------------------- ROOMS -------------------

function addRoom(room) {
rooms.push(room);
saveData();
}

function updateRoom(index, room) {
rooms[index] = room;
saveData();
}

function deleteRoom(index) {
rooms.splice(index, 1);
saveData();
}

// ------------------- SETTINGS -------------------

function saveSettings(newSettings) {
hotelSettings = { ...hotelSettings, ...newSettings };
saveData();
}

// ------------------- COUNTS -------------------

function getBookingCounts() {
const confirmed = bookings.filter(b => b.status === "Confirmed").length;
const pending = bookings.filter(b => b.status === "Pending").length;
const cancelled = bookings.filter(b => b.status === "Cancelled").length;

return {
total: bookings.length,
confirmed,
pending,
cancelled
};
}

function getRoomCounts() {
const total = rooms.length;
const available = rooms.filter(r => r.status === "Available").length;
const occupied = rooms.filter(r => r.status === "Occupied").length;
const maintenance = rooms.filter(r => r.status === "Maintenance").length;

return { total, available, occupied, maintenance };
}

// ------------------- END -------------------


