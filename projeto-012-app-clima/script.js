const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const API_KEY = "ca97c7e28377dbd8fde022a19d925dfd";

searchBtn.addEventListener("click", async () => {
  const cidade = cityInput.value;

  if (!cidade) {
    alert("Digite uma cidade!");
    return;
  }

  cityInput.value = "";

  document.getElementById("weatherInfo").innerHTML = "Carregando...";

  const dadosClima = await buscarClima(cidade);

  if (dadosClima && dadosClima.main) {
    exibirClima(dadosClima);
  } else {
    document.getElementById("weatherInfo").innerHTML = "Cidade não encontrada";
  }
});

async function buscarClima(cidade) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const dados = await response.json();
    console.log("Dados recebidos:", dados);
    return dados;
  } catch (error) {
    console.log(`Erro ao buscar clima: ${error}`);
    return null;
  }
}

function exibirClima(dados) {
  const weatherInfo = document.getElementById("weatherInfo");

  weatherInfo.innerHTML = `
        <div class="weather-card">
            <h2>${dados.name}</h2>
            <div class="temperature">${Math.round(dados.main.temp)}°C</div>
            <div class="description">${dados.weather[0].description}</div>
            
            <div class="details">
                <p>Sensação térmica: ${Math.round(dados.main.feels_like)}°C</p>
                <p>Umidade: ${dados.main.humidity}%</p>
                <p>Vento: ${dados.wind.speed} km/h</p>
            </div>
        </div>
    `;
}

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const dadosClima = await buscarClimaPorCoordenadas(lat, lon);
      if (dadosClima) {
        exibirClima(dadosClima);
      }
    });
  } else {
    alert("Geolocalização não suportada pelo navegador");
  }
});

async function buscarClimaPorCoordenadas(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.log(`Erro ao buscar clima: ${error}`);
    return null;
  }
}
