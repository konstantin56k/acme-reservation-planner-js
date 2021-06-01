import axios from 'axios';

const userList = document.querySelector('#users-list');
const restaurantList = document.querySelector('#restaurants-list');
const reservationList = document.querySelector('#reservations-list');

const renderUsers = (users) => {
    const html = users.map(user => `
    <li>
        <a href='#${user.id}'>
            ${user.name}
        </a>
    </li>
    `).join('');
    userList.innerHTML = html;
}

const renderRestaurant = (restaurants) => {
    const html = restaurants.map(restaurant => `
    <li>
        <a href='#${restaurant.id}'>
            ${restaurant.name}
        </a>
    </li>
    `).join('');
    restaurantList.innerHTML = html;
}

const renderReservation = (reservations) => {
    const html = reservations.map(reservation => `
    <li>
        ${reservation.id}
    </li>
    `).join('');
    reservationList.innerHTML = html;
}

const init = async() => {
    try {
        const users = (await axios.get('/api/users')).data;
        const restaurants = (await axios.get('/api/restaurants')).data;
        renderUsers(users);
        renderRestaurant(restaurants);
    }
    catch(error) {
        console.log(error)
    }
}

init();

window.addEventListener('hashchange', async() => {
    const userId = window.location.hash.slice(1);
    const url = `/api/users/${userId}/reservations`;
    const reservations = (await axios.get(url)).data;
    renderReservation(reservations);
})