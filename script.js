const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
const seats = document.querySelectorAll("#seatCont .seat");
const holder = document.querySelector("#selectedSeatsHolder");

let moviePrice = moviesList[0].price;

// Use moviesList array for displaing the Name in the dropdown menu
const selectElement = document.querySelector("#selectMovie");
const options = moviesList.map(
  (item) =>
    `<option id=${item.movieName} value=${item.movieName + "-" + item.price}> ${
      item.movieName
    } </option>`
);
selectElement.innerHTML = options;

selectElement.addEventListener("change", (e) => {
  const [name, price] = e.target.value.split("-");
  document.querySelector("#movieName").textContent = name;

  document.querySelector("#moviePrice").textContent = `$ ${price}`;
  const selected = document.querySelectorAll(".selected").length;
  const totalPrice = (selected - 1) * price;
  document.querySelector("#totalPrice").textContent = `$ ${totalPrice}`;
  moviePrice = price;
});

for (let key = 0; key < seats.length; key++) {
  const isOccupied = seats[key].classList.contains("occupied");
  if (!isOccupied) {
    function wrappingFun(key, e) {
      console.log("wrapping");
      const selected = document.querySelectorAll(".selected").length;
      if (selected < 1) {
        holder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
      } else {
        document.querySelector(".noSelected")?.remove();
      }
      if (e.target.classList.contains("selected")) {
        e.target.classList.toggle("selected");
        document.getElementById(key).remove();
        // holder
      } else {
        e.target.classList.toggle("selected");
        const spanEl = document.createElement("span");
        spanEl.textContent = key + 1;
        spanEl.className = "selectedSeat";
        spanEl.id = key;
        holder.appendChild(spanEl);
      }

      const totalPrice = selected * moviePrice;

      document.querySelector("#totalPrice").textContent = `$ ${totalPrice}`;
      document.querySelector("#numberOfSeat").textContent = selected;
    }
    const boundFunction = wrappingFun.bind(null, key);
    seats[key].addEventListener("click", boundFunction);
    seats[key].boundFunction = boundFunction;
  }
}

const continueBtn = document.querySelector("#proceedBtn");

continueBtn.addEventListener("click", (e) => {
  const selected = document.querySelectorAll(".selected").length;
  if (selected == 1) {
    alert("Oops no seat Selected");
  } else {
    for (let key = 0; key < seats.length; key++) {
      if (seats[key].classList.contains("selected")) {
        console.log("removing");
        seats[key].classList.add("occupied");
        seats[key].classList.remove("selected");
        seats[key].removeEventListener("click", seats[key].boundFunction);
      }
    }
    alert("Yayy! Your Seats have been booked");
    holder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;

    document.querySelector("#totalPrice").textContent = `$ 0`;
    document.querySelector("#numberOfSeat").textContent = 0;
  }
});

const cancelBtn = document.querySelector("#cancelBtn");

cancelBtn.addEventListener("click", (e) => {
  const selected = document.querySelectorAll(".selected").length;

  for (let key = 0; key < seats.length; key++) {
    if (seats[key].classList.contains("selected")) {
      seats[key].classList.remove("selected");
    }
  }
  holder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;

  document.querySelector("#totalPrice").textContent = `$ 0`;
  document.querySelector("#numberOfSeat").textContent = 0;
});
