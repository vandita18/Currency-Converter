const convert = document.getElementById("convert");
const result = document.getElementById("result");
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");

convert.addEventListener("click", function () {
    let fromCurrency = from.value;
    let toCurrency = to.value;
    let amt = parseFloat(amount.value);

    // Validate amount
    if (isNaN(amt) || amt <= 0) {
        noamount();
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            let rate = data.rates[toCurrency];

            if (!rate) {
                result.innerHTML = "Invalid currency selection.";
                return;
            }

            let total = (rate * amt).toFixed(2); 
            result.innerHTML = `${amt} ${fromCurrency} = ${total} ${toCurrency}`;
        })
        .catch(error => {
            console.error("API Error:", error);
            result.innerHTML = "Error fetching exchange rate.";
        });
});

// Checking for invalid amount
function noamount() {
    result.innerHTML = "";
    alert("Please enter a valid amount!");
}

// Reset Values
function reloadValues() {
    amount.value = "0";
    from.value = "USD";
    to.value = "USD";
    result.innerHTML = "";
}