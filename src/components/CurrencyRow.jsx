import React from 'react'

export default function CurrencyRow(props) {

    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

  return (
    <div>
        <input type='number' className='input' value={amount} onChange={onChangeAmount}/>
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
            <option key={option.r030} value={option.cc}>{option.cc}</option>
            ))}
        </select>
    </div>
  )
}
