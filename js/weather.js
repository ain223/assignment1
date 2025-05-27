const apiKey = "ee3aee50a7676039a77599f7bba83a61";

const ctx = document.getElementById("weatherChart").getContext("2d");
let chart;

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("City not found or API error");
    }

    const data = await res.json();

    const labels = data.list.slice(0, 10).map(item => item.dt_txt);
    const temps = data.list.slice(0, 10).map(item => item.main.temp);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `Temperature (°C) in ${city}`,
          data: temps,
          backgroundColor: "rgba(111, 66, 193, 0.7)", // soft purple
          borderColor: "rgba(111, 66, 193, 1)",       // deep purple

          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date/Time"
            }
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)"
            },
            suggestedMin: 0
          }
        }
      }
    });

  } catch (err) {
    alert("Error: " + err.message);
  }
}

document.getElementById("fetchWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
