class Marquee {
  constructor(marquee) {
    this.marquee = marquee;
  }

  load = async () => {
    const marquee = this.marquee;

    const URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nasdaq`;

    const response = await fetch(URL);

    const marqueeJson = await response.json();

    marquee.innerText = "";

    for (let i = 0; i < 10; i++) {
      const marqueeSymbol = document.createElement("span");
      marqueeSymbol.innerText = `${marqueeJson[i].symbol}`;
      marquee.appendChild(marqueeSymbol);
      marqueeSymbol.classList.add("mr-1");

      const marqueePrice = document.createElement("span");
      marqueePrice.innerText = `${marqueeJson[i].price}`;
      marquee.appendChild(marqueePrice);
      marqueePrice.classList.add("mr-1");

      const marqueeChange = document.createElement("span");
      const marqueeChangeAsFloat = parseFloat(marqueeJson[i].change).toFixed(2);

      if (marqueeChangeAsFloat > 0) {
        marqueeChange.innerText = `+${marqueeChangeAsFloat}`;
        marqueeChange.classList.add("positiveChangesPercentage");
      } else {
        marqueeChange.innerText = `${marqueeChangeAsFloat}`;
        marqueeChange.classList.add("negativeChangesPercentage");
      }
      marquee.appendChild(marqueeChange);
      marqueeChange.classList.add("mr-1");

      const marqueePercent = document.createElement("span");
      const marqueePercentAsFloat = parseFloat(
        marqueeJson[i].changesPercentage
      ).toFixed(2);
      marquee.appendChild(marqueePercent);
      marqueePercent.classList.add("mr-3");

      if (marqueePercentAsFloat > 0) {
        marqueePercent.innerText = `${marqueePercentAsFloat}%`;
        marqueePercent.classList.add("positiveChangesPercentage");
      } else {
        marqueePercent.innerText = `${marqueePercentAsFloat}%`;
        marqueePercent.classList.add("negativeChangesPercentage");
      }

      marquee.classList.add("marquee");
    }
  };
}
