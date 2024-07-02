document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    console.log(city);
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cffecceafab4795d98bde4086c0332bb`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) { 
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('weather-description').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('weather-info').style.display = 'block';

                const weatherMain = data.weather[0].main.toLowerCase();
                document.querySelectorAll('.icon-container').forEach(icon => icon.style.display = 'none');

                if (weatherMain.includes('clear')) {
                    document.getElementById('sun-icon').style.display = 'block';
                } else if (weatherMain.includes('clouds')) {
                    document.getElementById('cloud-icon').style.display = 'block';
                } else if (weatherMain.includes('rain')) {
                    document.getElementById('rain-icon').style.display = 'block';
                } else {
                    document.getElementById('sun-icon').style.display = 'block';
                }
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.log('Error', error));
});
