const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        select.append(newOption);

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}
btn.addEventListener("click", async(e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value
    if(amountValue === "" || amountValue <1) {
        amountValue = 1
        amount.value="1"
    }
    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();
    const url = `${BASE_URL}/${from}.json`;
    let response = await fetch(url)
    let data = await response.json();
    let rate = data[from][to]
    const finalAmount = (amountValue * rate)
    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})
// Initial load of flags
// updateFlag(document.querySelector("select[name='from']"));
// updateFlag(document.querySelector("select[name='to']"));

function updateFlag(element) {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const img = element.closest(".select-container").querySelector("img");

    if (img && countryCode) {
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
}