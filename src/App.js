import React, { useState } from 'react';
import './App.css';

function App() {

  const [locksInput, setLocksInput] = useState('');
  const [stocksInput, setStocksInput] = useState('');
  const [barrelsInput, setBarrelsInput] = useState('');
  const [totalSales, setTotalSales] = useState(0);
  const [commission, setCommission] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');


  const lockPrice = 45.0;
  const stockPrice = 30.0;
  const barrelPrice = 25.0;


  const calculateCommission = () => {

    const locks = Number(locksInput) || 0;
    const stocks = Number(stocksInput) || 0;
    const barrels = Number(barrelsInput) || 0;


    if (locks < 1 || locks > 70) {
      setErrorMessage('Locks must be between 1 and 70');
      return;
    }
    if (stocks < 1 || stocks > 80) {
      setErrorMessage('Stocks must be between 1 and 80');
      return;
    }
    if (barrels < 1 || barrels > 90) {
      setErrorMessage('Barrels must be between 1 and 90');
      return;
    }


    setErrorMessage('');


    const lockSales = lockPrice * locks;
    const stockSales = stockPrice * stocks;
    const barrelSales = barrelPrice * barrels;
    const sales = lockSales + stockSales + barrelSales;


    let commission = 0.0;
    if (sales > 1800.0) {

      commission = 0.10 * 1000.0;
      commission += 0.15 * 800.0;
      commission += 0.20 * (sales - 1800.0);
    } else if (sales > 1000.0) {

      commission = 0.10 * 1000.0;
      commission += 0.15 * (sales - 1000.0);
    } else {

      commission = 0.10 * sales;
    }


    setTotalSales(sales);
    setCommission(commission);
  };

  return (
    <div className="App">
      <h1>Commission Calculator</h1>

      <div className="card">

        <div>
          <label>Locks: (1-70)</label>
          <input
            type="number"
            value={locksInput}
            onChange={(e) => setLocksInput(e.target.value)}
          />
        </div>


        <div>
          <label>Stocks: (1-80)</label>
          <input
            type="number"
            value={stocksInput}
            onChange={(e) => setStocksInput(e.target.value)}
          />
        </div>


        <div>
          <label>Barrels: (1-90)</label>
          <input
            type="number"
            value={barrelsInput}
            onChange={(e) => setBarrelsInput(e.target.value)}
          />
        </div>


        <button onClick={calculateCommission}>Calculate</button>


        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div className="card-results">
          <h2>Results</h2>
          <p>Total Sales: ${totalSales.toFixed(2)}</p>
          <p>Commission: ${commission.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
