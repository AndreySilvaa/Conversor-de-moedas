const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button")


// INSERINDO OS OPTIONS DENTRO DE CADA SELECT
for(let i=0; i < dropList.length; i++){
    for(currency_code in country_code){
        let selected 
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : ""
        }else if(i == 1){
            selected = currency_code == "BRL" ? "selected" : ""
        }

        let optionTag = `<option value=${currency_code} ${selected}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML(`beforeend`, optionTag)
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target)
    })
}

function loadFlag(el){
    for(code in country_code){
        if(code == el.value){
            el.previousElementSibling.src = `https://countryflagsapi.com/png/${country_code[code]}`
        }
    }
}

window.addEventListener("load", (e) =>{
    getExchangeRate()
})

getButton.addEventListener("click", (e) =>{
    e.preventDefault()
    getExchangeRate()
})

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = tempCode
    getExchangeRate()
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input")
    const exchangeRateTxt = document.querySelector(".exchange-rate")
    let amountVal = amount.value
    // SE O USUÁRIO NÃO INFORMAR NENHUM VALOR OU COLOCAR 0 O VALOR PADRÃO SERÁ 1
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1"
        amountVal = 1
    }

    exchangeRateTxt.innerText = "Getting exchange rate..."
    let url = `https://v6.exchangerate-api.com/v6/604f0210c8deba8790f02684/latest/${fromCurrency.value}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let exchangeRate = data.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal*exchangeRate).toFixed(2)
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    })
    .catch(() =>{
        exchangeRateTxt.innerText = "Algum erro ocorreu."
    })
}