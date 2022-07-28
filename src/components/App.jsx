import React, {useState, useEffect} from 'react';
import Header from "./Header"
import CurrencyRow from "./CurrencyRow";

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRateFrom, setExchangeRateFrom] = useState();
  const [exchangeRateTo, setExchangeRateTo] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
 
  let toAmount, fromAmount
  
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRateFrom / exchangeRateTo
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRateFrom * exchangeRateTo
  }

  const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([...data])
        setFromCurrency(data[0].cc)
        setToCurrency(data[0].cc)
        setExchangeRateFrom(data[0].rate)
        setExchangeRateTo(data[0].rate)
      },
      err => console.log(err))
    }, [])

    useEffect(() => {
      if (fromCurrency != null) {
        fetch(BASE_URL)
          .then(res => res.json())
          .then(date => {
            let currentCurrency = date.find(item => item.cc === fromCurrency)
            setExchangeRateFrom(currentCurrency.rate);
          })
      }
    }, [fromCurrency])

    useEffect(() => {
      if (toCurrency != null) {
        fetch(BASE_URL)
          .then(res => res.json())
          .then(date => {
            let currentCurrency = date.find(item => item.cc === toCurrency)
            setExchangeRateTo(currentCurrency.rate);
          })
      }
    }, [toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange (e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <Header />
      <div className='box'>
        <h1>Convert</h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className='equals'>=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </>
  );
}

export default App;
