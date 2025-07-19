const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    mile: 1609.34,
    foot: 0.3048,
    inch: 0.0254
  },
  mass: {
    kilogram: 1,
    gram: 0.001,
    pound: 0.453592,
    ounce: 0.0283495
  },
  area: {
    "sq meter": 1,
    "sq kilometer": 1e6,
    "sq foot": 0.092903,
    "sq mile": 2.59e6,
    hectare: 10000,
    acre: 4046.86
  },
  volume: {
    liter: 1,
    milliliter: 0.001,
    gallon: 3.78541,
    cubic_meter: 1000,
    cubic_foot: 28.3168
  },
  temperature: {
    celsius: "c",
    fahrenheit: "f",
    kelvin: "k"
  },
  speed: {
    "m/s": 1,
    "km/h": 0.277778,
    "mph": 0.44704
  },
  time: {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400
  },
  pressure: {
    pascal: 1,
    bar: 100000,
    atm: 101325,
    psi: 6894.76
  },
  energy: {
    joule: 1,
    kilojoule: 1000,
    calorie: 4.184,
    kilowatt_hour: 3.6e6
  },
  frequency: {
    hertz: 1,
    kilohertz: 1000,
    megahertz: 1e6,
    gigahertz: 1e9
  },
  storage: {
    bit: 1,
    byte: 8,
    kilobyte: 8000,
    megabyte: 8e6,
    gigabyte: 8e9,
    terabyte: 8e12
  }
};

function updateUnits() {
  const category = document.getElementById("category").value;
  const from = document.getElementById("fromUnit");
  const to = document.getElementById("toUnit");

  from.innerHTML = "";
  to.innerHTML = "";

  for (let unit in units[category]) {
    from.innerHTML += `<option value="${unit}">${unit}</option>`;
    to.innerHTML += `<option value="${unit}">${unit}</option>`;
  }
}

function convert() {
  const category = document.getElementById("category").value;
  const input = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;

  if (category === "temperature") {
    let result;
    if (from === to) {
      result = input;
    } else {
      let celsius;
      if (from === "celsius") celsius = input;
      else if (from === "fahrenheit") celsius = (input - 32) * 5 / 9;
      else if (from === "kelvin") celsius = input - 273.15;

      if (to === "celsius") result = celsius;
      else if (to === "fahrenheit") result = (celsius * 9 / 5) + 32;
      else if (to === "kelvin") result = celsius + 273.15;
    }

    document.getElementById("result").innerText = `${input} ${from} = ${result.toFixed(2)} ${to}`;
    return;
  }

  const factorFrom = units[category][from];
  const factorTo = units[category][to];
  const baseValue = input * factorFrom;
  const converted = baseValue / factorTo;

  document.getElementById("result").innerText = `${input} ${from} = ${converted.toFixed(4)} ${to}`;
}

// Initialize unit dropdowns on page load
window.onload = updateUnits;

