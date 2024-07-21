
document.addEventListener("DOMContentLoaded", () => {
    const filmsList = document.getElementById("films");
    const title = document.getElementById("title");
    const poster = document.getElementById("poster");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const tickets = document.getElementById("tickets");
    const buyTicketButton = document.getElementById("buy-ticket");

    // Fetch and display all films
    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(films => {
            filmsList.innerHTML = '';
            films.forEach(film => {
                const filmItem = document.createElement("li");
                filmItem.className = "film item";
                filmItem.innerText = film.title;
                filmItem.addEventListener("click", () => displayFilmDetails(film));
                filmsList.appendChild(filmItem);
            });
            // Display first film's details by default
            displayFilmDetails(films[0]);
        });

    // Function to display film details
    function displayFilmDetails(film) {
        title.innerText = film.title;
        poster.src = film.poster;
        runtime.innerText = `Runtime: ${film.runtime} minutes`;
        showtime.innerText = `Showtime: ${film.showtime}`;
        const availableTickets = film.capacity - film.tickets_sold;
        tickets.innerText = `Available Tickets: ${availableTickets}`;
        buyTicketButton.disabled = availableTickets === 0;
        buyTicketButton.innerText = availableTickets === 0 ? "Sold Out" : "Buy Ticket";

        // Handle Buy Ticket button click
        buyTicketButton.onclick = () => {
            if (availableTickets > 0) {
                film.tickets_sold += 1;
                displayFilmDetails(film);
                updateFilmList(film);
            }
        };
    }

    // Function to update the film list when a film is sold out
    function updateFilmList(film) {
        const filmItems = document.querySelectorAll(".film.item");
        filmItems.forEach(item => {
            if (item.innerText === film.title) {
                if (film.capacity - film.tickets_sold === 0) {
                    item.classList.add("sold-out");
                } else {
                    item.classList.remove("sold-out");
                }
            }
        });
    }
});

