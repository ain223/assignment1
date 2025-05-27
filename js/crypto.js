const cryptoChartCtx = document.getElementById("cryptoChart").getContext("2d");
let cryptoChart;

async function fetchCrypto(cryptoId) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`;
  const res = await fetch(url);
  if (!res.ok) {
    alert("Cryptocurrency not found");
    return;
  }
  const data = await res.json();

  if (!data[cryptoId]) {
    alert("Cryptocurrency not found");
    return;
  }

  const price = data[cryptoId].usd;

  if (cryptoChart) cryptoChart.destroy();

  cryptoChart = new Chart(cryptoChartCtx, {
    type: "bar",
    data: {
      labels: [cryptoId],
      datasets: [{
        label: "Price in USD",
        data: [price],
        backgroundColor: "rgba(13, 110, 253, 0.7)",
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      }
    }
  });
}

document.getElementById("fetchCryptoBtn").addEventListener("click", () => {
  const cryptoId = document.getElementById("cryptoInput").value.trim().toLowerCase();
  if (cryptoId) fetchCrypto(cryptoId);
});
