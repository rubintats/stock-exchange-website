class SearchForm {
  constructor(button, spinner, input) {
    this.input = input;
    this.button = button;
    this.spinner = spinner;
    this.getElements();
  }
  getElements() {
    const form = document.getElementById("form");

    this.input = document.createElement("input");
    this.input.type = "search";
    this.input.placeholder = "";
    this.input.class = "input";
    this.input.id = "input";
    this.input.classList.add("input");

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerText = "Search";
    this.button.class = "button";
    this.button.id = "button";
    this.button.classList.add("button");

    this.spinner = document.createElement("span");
    this.spinner.class = "spinner";
    this.spinner.role = "status";
    this.spinner.id = "spinnerSearch";
    this.spinner.classList.add("spinner");

    form.appendChild(this.input);
    form.appendChild(this.button);
    form.appendChild(this.spinner);
  }

  onSearch(cb) {
    const button = document.getElementById("button");
    const inputObj = this.input;
    button.addEventListener("click", function () {
      cb(inputObj.value);
    });
  }
}
