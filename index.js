const apiKey = "f32b7192bfbe933647891241"
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("converter-form");
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const resultContainer = document.getElementById("result");

    fetch(apiUrl + "MYR")
    .then((response) => response.json())
    .then((data) => {
        console.log(data.conversion_rates);
        const currencies = Object.keys(data.conversion_rates)
        console.log(currencies)
        currencies.forEach((currency) => {
            const option = document.createElement("option");
            option.value = currency
            option.text = currency
            fromCurrency.appendChild(option.cloneNode(true))
            toCurrency.appendChild(option)
        })
    }); 

    form.addEventListener("submit", (e) => {
        e.preventDefault() //make sure all required field are filled
        const amount = amountInput.value
        const from = fromCurrency.value
        const to = toCurrency.value

        fetch(`${apiUrl}${from}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.conversion_rates[to])
            const rate = data.conversion_rates[to]
            const convertedAmount = amount * rate;
            resultContainer.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        })
        .catch((error) => {
            resultContainer.textContent = "Error fetching conversion rate";
            console.error(error);
        })
    })
});
