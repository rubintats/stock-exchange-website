class SearchResults {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  renderResults(userInput) {
    const spinner = document.getElementById("spinnerSearch");
    const searchObj = this;
    const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`;
    fetch(URL)
      .then(function (response) {
        spinner.classList.remove("spinner");
        return response.json();
      })
      .then(function (data) {
        const divSearch = document.getElementById("results");
        divSearch.innerHTML = "";
        const card = document.createElement("ul");
        card.className = "card";
        for (let i = 0; i < 10; i++) {
          const company = document.createElement("li");
          const urlCompanyInfo = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`;
          fetch(urlCompanyInfo)
            .then(function (responseTwo) {
              return responseTwo.json();
            })
            .then(function (dataTwo) {
              company.classList.add("list");
              company.id = "company";
              const companyLogo = document.createElement("img");
              companyLogo.src = `${dataTwo.profile.image}`;

              company.prepend(companyLogo);
              companyLogo.classList.add("img-style");

              const companyName = document.createElement("a");
              companyName.innerText = `${data[i].name}`;
              companyName.href = `./html/company.html?${data[i].symbol}`;

              company.appendChild(companyName);
              searchObj.highlightText(userInput, companyName);
              companyName.classList.add("mr-1");

              const companySymbol = document.createElement("span");
              companySymbol.innerText = `(${data[i].symbol})`;

              company.appendChild(companySymbol);
              searchObj.highlightText(userInput, companySymbol);
              companySymbol.classList.add("mr-1");

              const changesPercentage = document.createElement("span");
              const percentageAsFloat = parseFloat(
                dataTwo.profile.changesPercentage
              ).toFixed(2);

              if (percentageAsFloat > 0) {
                changesPercentage.innerText = `(+${percentageAsFloat}%)`;
                changesPercentage.classList.add("positiveChangesPercentage");
              } else {
                changesPercentage.innerText = `(${percentageAsFloat}%)`;
                changesPercentage.classList.add("negativeChangesPercentage");
              }

              company.appendChild(changesPercentage);
              card.appendChild(company);
              divSearch.append(card);
              spinner.classList.add("spinnerSearch");
            });
        }
      });
  }
  highlightText(textToHighlight, elementToHighlight) {
    const regexForHighlight = new RegExp(textToHighlight, "gi");

    elementToHighlight.innerHTML = elementToHighlight.innerHTML.replace(
      regexForHighlight,
      '<mark class="highlight">$&</mark>'
    );
  }
}
