import React, {useState, useEffect} from "react";

function Currency(props) {

  const [currencyRate, setCurrencyRate] = useState();

  const BASE_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        let currentCurrency = data.find(item => item.cc === props.cc)
        setCurrencyRate(currentCurrency.rate)
      },
      err => console.log(err))
    }, [])

  return (
    <div>
        <h1>
          1 {props.cc} = {currencyRate} UAH
        </h1>
    </div>
  );
}

export default Currency;