const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (nameCity.value === "" || nameCountry.value === "") {
        alert("Complete los campos");
        return;
    }

    callAPI(nameCity.value, nameCountry.value);
    nameCity.value = "";
    nameCountry.value = "";

});

function callAPI(city, country) {
    const apiId = "257aecff0948f8af9d536d7332ea4f2a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}&units=metric&lang=es`;
    fetch(url)
    .then(data =>{
        return data.json();
    
    }).then(dataJSON =>{
        if(dataJSON.cod === "404"){
            showError("Ciudad no encontrada");
            return;
        }else{
            clearHTML();
            showWeather(dataJSON)
        }   
    })
    .catch(error =>{
        showError("Error al cargar los datos");
        console.log(error);
    });

}

function showWeather(data) {
    const {name, main:{temp,temp_min, temp_max}, weather:[arr]} = data;
    const content = document.createElement('div');
    content.innerHTML = `
          <h5>Clima de ${name}</h5>
          <img src="http://openweathermap.org/img/w/${arr.icon}.png" alt="icono_clima">
          <h2>${temp}°C</h2>
            <p>Min: ${temp_min}°C</p>
            <p>Max: ${temp_max}°C</p> 
    `;
    result.appendChild(content);
}

function showError(message) {
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert', 'alert-danger', 'col-md-6');
    alert.innerHTML = `<strong>${message}</strong>`;
    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

/*document.addEventListener('DOMContentLoaded', function () {
    cargar_clima();
    btnEnter.addEventListener('click', function () {
        ciudad = document.getElementById('city').value;
        cargar_clima();
    });
});

function cargar_clima() {
    const api_key = '257aecff0948f8af9d536d7332ea4f2a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=${api_key}&units=metric&lang=es`;
    fetch(url)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            mostrarDatos(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function mostrarDatos(data) {
    const msj_clima = document.querySelector('#Clima_msj');
    const temperatura = data.main.temp;
    msj_clima.innerHTML = `${temperatura}°C`;
}*/

function clearHTML() {
    result.innerHTML = "";
}