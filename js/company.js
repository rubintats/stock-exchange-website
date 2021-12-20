const spinnerCompany = document.getElementById("spinnerCompany");

var urlParams = new URLSearchParams(window.location.search);
let symbolCompany = "";

var keys = urlParams.keys();
for (key of keys) {
  symbolCompany = key;
}

async function fetchCompanyProfile() {
  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolCompany}`
  );

  const companyProfile = await response.json();
  console.log(companyProfile);

  const companyName = document.createElement("a");
  companyName.innerText = companyProfile.profile.companyName;
  const divCompanyName = document.getElementById("companyName");
  divCompanyName.appendChild(companyName);
  companyName.href = `{companyProfile.profile.website}`;
  companyName.classList.add("companyName");

  const companyImg = document.getElementById("companyImage");
  companyImg.innerHTML = `<img src="${companyProfile.profile.image}">`;
  companyImg.classList.add("companyImg");

  const companyDescription = document.getElementById("description");
  companyDescription.innerText = companyProfile.profile.description;
  companyDescription.classList.add("companyDescription");

  const stockPrice = document.getElementById("stockPrice");
  stockPrice.innerText = `${STOCK_PRICE}${companyProfile.profile.price}`;
  stockPrice.classList.add("stockPrice");

  const changesPercent = document.getElementById("changes");
  changesPercentFloat = parseFloat(
    companyProfile.profile.changesPercentage
  ).toFixed(2);

  if (changesPercentFloat > 0) {
    changesPercent.innerText = `(+${changesPercentFloat}%)`;

    changesPercent.classList.add("positiveChangesPercentage");
  } else {
    changesPercent.innerText = `(${changesPercentFloat}%)`;

    changesPercent.classList.add("negativeChangesPercentage");
  }
}

fetchCompanyProfile();

async function fetchCompanyHistory() {
  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbolCompany}?serietype=line`
  );
  spinnerCompany.classList.remove("spinnerCompany");
  const data = await response.json();
  const firstTen = data.historical.slice(0, 10);
  return firstTen;
}

fetchCompanyHistory();

async function chart() {
  spinnerCompany.classList.remove("spinnerCompany");
  const ctx = document.getElementById("myChart").getContext("2d");
  ctx.class = "myChart";
  const dataArray = await fetchCompanyHistory();
  const mapped = dataArray.map((obj) => ({
    x: obj.date,
    y: obj.close,
  }));
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Stock Price History",
          data: mapped,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

chart();

function getPreviousMonths() {
  const months = [];
  months = Array.apply(0, Array(12)).map(function (_, i) {
    return moment().month(i).toISOString();
  });
  return months;
}
