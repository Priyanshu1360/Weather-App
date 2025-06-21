const apiKey = "20495463a2fd789f795c1b614042db13";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("input");
const searchBtn = document.getElementById("search");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.getElementById("loader");
const modeToggle = document.getElementById("mode-toggle");
const bgVideo = document.getElementById("bg-video");

// Load stored theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  modeToggle.checked = true;
}

// Toggle dark/light mode
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

async function checkWeather(city) {
  loader.style.display = "flex";

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      alert("City not found!");
      loader.style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const weatherType = data.weather[0].main.toLowerCase();
    const videoMap = {
      clear: "clear.mp4",
      clouds: "clouds.mp4",
      rain: "rain.mp4",
      drizzle: "drizzle.mp4",
      mist: "mist.mp4",
      smoke: "mist.mp4",
      haze: "mist.mp4",
      fog: "mist.mp4",
      dust: "mist.mp4",
      snow: "snow.mp4",
      thunderstorm: "rain.mp4"
    };

    bgVideo.src = videoMap[weatherType] || "default.mp4";

  } catch (err) {
    alert("Error fetching weather data");
  } finally {
    loader.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
