import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyInfo from './currency';

const API_URL = ('https://api.exchangerate-api.com/v4/latest/USD');


function App() {
  /*states*/
  const [currencies, setCurrencies] = useState([])
  const [baseCurrency, setBaseCurrency] = useState()
  const [newCurrency, setNewCurrency] = useState()
  const [baseAmount, setBaseAmount] = useState(100)
  const [changeCurrency, setChangeCurrency] = useState(true)
  const [rate, setRate] = useState()

  /*new Amounts values*/
  let newAmount, oldAmount;
  if (changeCurrency) {
    oldAmount = baseAmount
    newAmount = baseAmount * rate
  } else {
    newAmount = baseAmount
    oldAmount = baseAmount / rate
  }

  /*get api*/
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        /* get rates from api, set to base currency and new currency*/
        setCurrencies([data.base, ...Object.keys(data.rates)])
        setBaseCurrency(data.base)
        setNewCurrency()
        setRate(data.rates)
      })
  }, []);

  /*get new rates set to new currency*/
  useEffect(() => {
    if (baseCurrency != null && newCurrency != null) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setRate(data.rates[newCurrency]))
    }
  }, [baseCurrency, newCurrency]);


  /*converted currency*/
  function handleBaseAmount(e) {
    setBaseAmount(e.target.value)
    setChangeCurrency(true)
  }

  function handleNewAmount(e) {
    setBaseAmount(e.target.value)
    setChangeCurrency(false)
  }


  return (
    <div className="App container mt-5">
      <h4>Currency Calculator</h4>
      <p>Convert the currency</p>

      <div className="Numbers mt-5">
        <input className='currency-name' value={baseAmount} onChange={handleBaseAmount} type='number' />
        <CurrencyInfo
          currency={currencies}
          onChangeCurrency={e => setBaseCurrency(e.target.value)}
          baseAmount={oldAmount}
        />

        <h3 className='convert'>convert to:</h3>

        <CurrencyInfo
          currency={currencies}
          selected={newCurrency}
          onChangeCurrency={e => setNewCurrency(e.target.value)}
        />

        <button type="button" class="btn btn-primary"
          onClick={handleBaseAmount}
          onHandle={handleNewAmount}
        >Convert</button>
      </div>

      <div className='result' onChange={handleNewAmount}>

        {oldAmount} {baseCurrency} =  {newAmount} {newCurrency}.

      </div>
    </div>
  );
};

export default App;

