const urlParams = new URLSearchParams(window.location.search);
const price = urlParams.get("price");
const title = urlParams.get("title");
document.getElementById("ticket-price").innerHTML = price;
    document.getElementById("movie-name").innerHTML = title;

const numberOfTickets=document.getElementById('ticketCount');
const tax=document.querySelector('#convenience-fee');
const total=document.querySelector('#subtotal')

tax.textContent=parseFloat((Number(numberOfTickets.value)*price)*(1.75/100)).toFixed(2);
total.textContent=Number(tax.textContent)+Number(numberOfTickets.value)*price;

function getAmount(){
    tax.textContent=parseFloat((Number(numberOfTickets.value)*price)*(1.75/100)).toFixed(2);
    total.textContent=Number(tax.textContent)+Number(numberOfTickets.value)*price;
}
