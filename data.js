// data.js - unified data and logic for HotelPro

// ----- DATA -----
let bookings = [];
let payments = [];

// ----- DASHBOARD CARDS -----
function updateDashboardCards() {
  const totalGuests = document.getElementById("totalGuests");
  const activeBookings = document.getElementById("activeBookings");
  const monthlyRevenue = document.getElementById("monthlyRevenue");
  const occupancyRate = document.getElementById("occupancyRate");

  if(totalGuests) totalGuests.textContent = bookings.length;
  if(activeBookings) {
    const active = bookings.filter(b => b.status !== 'Cancelled').length;
    activeBookings.textContent = active;
  }
  if(monthlyRevenue) {
    const revenue = bookings.reduce((sum,b)=>sum+b.revenue,0);
    monthlyRevenue.textContent = new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(revenue);
  }
  if(occupancyRate) {
    const active = bookings.filter(b => b.status !== 'Cancelled').length;
    occupancyRate.textContent = Math.min(100, Math.round((active/10)*100)) + '%';
  }
}

// ----- BOOKINGS TABLE -----
function updateBookingsTable() {
  const bookingsTable = document.getElementById("bookingsTable");
  if(!bookingsTable) return;

  bookingsTable.innerHTML = '';
  bookings.forEach((b,index)=>{
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2"><input type="text" value="${b.guest}" class="border p-1 rounded w-full guestInput"></td>
      <td class="border px-4 py-2"><input type="text" value="${b.room}" class="border p-1 rounded w-full roomInput"></td>
      <td class="border px-4 py-2"><input type="date" value="${b.checkin}" class="border p-1 rounded w-full checkinInput"></td>
      <td class="border px-4 py-2"><input type="date" value="${b.checkout}" class="border p-1 rounded w-full checkoutInput"></td>
      <td class="border px-4 py-2"><input type="number" value="${b.numGuests}" class="border p-1 rounded w-full numGuestsInput"></td>
      <td class="border px-4 py-2">
        <select class="border p-1 rounded roomTypeSelect">
          <option ${b.roomType==='Single'?'selected':''}>Single</option>
          <option ${b.roomType==='Double'?'selected':''}>Double</option>
          <option ${b.roomType==='Suite'?'selected':''}>Suite</option>
        </select>
      </td>
      <td class="border px-4 py-2">
        <select class="border p-1 rounded statusSelect">
          <option ${b.status==='Confirmed'?'selected':''}>Confirmed</option>
          <option ${b.status==='Pending'?'selected':''}>Pending</option>
          <option ${b.status==='Cancelled'?'selected':''}>Cancelled</option>
        </select>
      </td>
      <td class="border px-4 py-2"><input type="text" value="${b.specialRequests}" class="border p-1 rounded w-full specialRequestsInput"></td>
      <td class="border px-4 py-2 flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded saveBtn">Save</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn">Delete</button>
      </td>
    `;
    bookingsTable.appendChild(row);

    row.querySelector('.saveBtn').addEventListener('click',()=>{
      b.guest = row.querySelector('.guestInput').value;
      b.room = row.querySelector('.roomInput').value;
      b.checkin = row.querySelector('.checkinInput').value;
      b.checkout = row.querySelector('.checkoutInput').value;
      b.numGuests = row.querySelector('.numGuestsInput').value;
      b.roomType = row.querySelector('.roomTypeSelect').value;
      b.status = row.querySelector('.statusSelect').value;
      b.specialRequests = row.querySelector('.specialRequestsInput').value;
      updateAll();
    });

    row.querySelector('.deleteBtn').addEventListener('click',()=>{
      bookings.splice(index,1);
      updateAll();
    });
  });
}

// ----- PAYMENTS TABLE -----
function updatePaymentsTable() {
  const paymentsTable = document.getElementById("paymentsTable");
  if(!paymentsTable) return;

  paymentsTable.innerHTML = '';
  payments.forEach((p,index)=>{
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2"><input type="text" value="${p.guest}" class="border p-1 rounded w-full guestInput"></td>
      <td class="border px-4 py-2"><input type="text" value="${p.room}" class="border p-1 rounded w-full roomInput"></td>
      <td class="border px-4 py-2"><input type="text" value="${p.bookingDates}" class="border p-1 rounded w-full dateInput"></td>
      <td class="border px-4 py-2"><input type="number" value="${p.amount}" class="border p-1 rounded w-full amountInput"></td>
      <td class="border px-4 py-2">
        <select class="border p-1 rounded methodSelect">
          <option ${p.paymentMethod==='Cash'?'selected':''}>Cash</option>
          <option ${p.paymentMethod==='Card'?'selected':''}>Card</option>
          <option ${p.paymentMethod==='Online'?'selected':''}>Online</option>
        </select>
      </td>
      <td class="border px-4 py-2">
        <select class="border p-1 rounded statusSelect">
          <option ${p.status==='Paid'?'selected':''}>Paid</option>
          <option ${p.status==='Pending'?'selected':''}>Pending</option>
          <option ${p.status==='Overdue'?'selected':''}>Overdue</option>
        </select>
      </td>
      <td class="border px-4 py-2 flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded saveBtn">Save</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn">Delete</button>
      </td>
    `;
    paymentsTable.appendChild(row);

    row.querySelector('.saveBtn').addEventListener('click',()=>{
      p.guest = row.querySelector('.guestInput').value;
      p.room = row.querySelector('.roomInput').value;
      p.bookingDates = row.querySelector('.dateInput').value;
      p.amount = Number(row.querySelector('.amountInput').value);
      p.paymentMethod = row.querySelector('.methodSelect').value;
      p.status = row.querySelector('.statusSelect').value;
      updateAll();
    });

    row.querySelector('.deleteBtn').addEventListener('click',()=>{
      payments.splice(index,1);
      updateAll();
    });
  });
}

// ----- CHARTS -----
let revenueChart, paymentsChart;
function initCharts() {
  const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
  if(revenueCtx) {
    revenueChart = new Chart(revenueCtx,{
      type:'line',
      data:{labels:bookings.map(b=>b.checkin),datasets:[{label:'Revenue (R)',data:bookings.map(b=>b.revenue),borderColor:'rgb(59,130,246)',backgroundColor:'rgba(59,130,246,0.2)',tension:0.3,fill:true}]},
      options:{responsive:true,plugins:{legend:{display:false}}}
    });
  }

  const paymentsCtx = document.getElementById('paymentsChart')?.getContext('2d');
  if(paymentsCtx) {
    paymentsChart = new Chart(paymentsCtx,{
      type:'line',
      data:{labels:payments.map(p=>p.bookingDates),datasets:[{label:'Payments (R)',data:payments.map(p=>p.amount),borderColor:'rgb(34,197,94)',backgroundColor:'rgba(34,197,94,0.2)',tension:0.3,fill:true}]},
      options:{responsive:true,plugins:{legend:{display:false}}}
    });
  }
}

// ----- UPDATE ALL -----
function updateCharts() {
  if(revenueChart) {
    revenueChart.data.labels = bookings.map(b=>b.checkin);
    revenueChart.data.datasets[0].data = bookings.map(b=>b.revenue);
    revenueChart.update();
  }
  if(paymentsChart) {
    paymentsChart.data.labels = payments.map(p=>p.bookingDates);
    paymentsChart.data.datasets[0].data = payments.map(p=>p.amount);
    paymentsChart.update();
  }
}

function updateAll(){
  updateDashboardCards();
  updateBookingsTable();
  updatePaymentsTable();
  updateCharts();
}

// ----- FORMS -----
document.addEventListener('DOMContentLoaded',()=>{
  initCharts();
  updateAll();

  const bookingForm = document.getElementById("bookingForm");
  if(bookingForm){
    bookingForm.addEventListener('submit', e=>{
      e.preventDefault();
      const b = {
        guest: bookingForm.guestName.value,
        room: bookingForm.roomNumber.value,
        checkin: bookingForm.checkInDate.value,
        checkout: bookingForm.checkOutDate.value,
        numGuests: bookingForm.numGuests.value||1,
        roomType: bookingForm.roomType.value,
        status: bookingForm.status.value,
        specialRequests: bookingForm.specialRequests.value,
        revenue: Math.floor(Math.random()*3000)+500
      };
      bookings.push(b);
      bookingForm.reset();
      updateAll();
    });
  }

  const paymentForm = document.getElementById("paymentForm");
  if(paymentForm){
    paymentForm.addEventListener('submit', e=>{
      e.preventDefault();
      const p = {
        guest: paymentForm.guestName.value,
        room: paymentForm.roomNumber.value,
        bookingDates: paymentForm.bookingDates.value,
        amount: Number(paymentForm.amount.value),
        paymentMethod: paymentForm.paymentMethod.value,
        status: paymentForm.status.value
      };
      payments.push(p);
      paymentForm.reset();
      updateAll();
    });
  }
});