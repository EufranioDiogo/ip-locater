const apiKey = 'at_GiVC80uBHUnI4TVo2tqBXa1WHr1Dh';
const ipifyAPIUrl = 'https://geo.ipify.org/api/v1'
const corsAnyWhere = 'https://cors-anywhere.herokuapp.com'
let res;

const app = new Vue({
    el: '#app',
    data: {
        ipInput: '',
        ip: '',
        location: '',
        timezone: '',
        isp: '',
        lat: 0,
        lng: 0,
        flagSearching: false
    },
    methods: {
        search: function () {
            this.flagSearching = true;

            fetch(ipifyAPIUrl + `?apiKey=${apiKey}&ipAddress=${this.ipInput}`)
                .then(res => res.json())
                .then(data => {
                    res = data
                    this.location = `${data.location.country}, ${data.location.region}, ${data.location.city}`;
                    this.timezone = `${data.location.timezone}`;
                    this.ip = `${data.ip}`;
                    this.isp = `${data.isp}`;

                    this.lat = `${data.location.lat}`;
                    this.lng = `${data.location.lng}`;

                    this.drawMap();
                    this.flagSearching = false;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        drawMap: function () {
            var map = L.map('map').setView([this.lat, this.lng], 13
            )
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([this.lat, this.lng]).addTo(map)
                .bindPopup('Location of IP: ' + this.ip)
                .openPopup();
        }
    }
});

document.querySelector('#map').innerHTML = '';
