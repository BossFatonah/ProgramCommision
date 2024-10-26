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
    // ตรวจสอบว่าช่องมีค่าหรือไม่
    if (!locksInput || !stocksInput || !barrelsInput) {
      setErrorMessage('คุณยังไม่ได้กรอกข้อมูลในทุกช่อง');
      return;
    }

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

  // ฟังก์ชันสำหรับล้างข้อมูล
  const resetFields = () => {
    setLocksInput('');
    setStocksInput('');
    setBarrelsInput('');
    setTotalSales(0);
    setCommission(0);
    setErrorMessage('');
  };

  // ตรวจสอบว่าทุกช่องมีค่าหรือไม่
  const isFormValid = locksInput && stocksInput && barrelsInput;

  return (
    <div className="App">
      <h1>Commission Calculator</h1>

      <div className="card">
        <div>
          <label>Locks: (1-70)</label>
          <input
            type="number"
            value={locksInput}
            onChange={(e) => {
              setLocksInput(e.target.value);
              if (!e.target.value) {
                // ถ้าช่อง Locks ว่าง ให้ล้างช่อง Stocks และ Barrels
                setStocksInput('');
                setBarrelsInput('');
              }
            }}
          />
        </div>

        <div>
          <label>Stocks: (1-80)</label>
          <input
            type="number"
            value={stocksInput}
            onChange={(e) => {
              setStocksInput(e.target.value);
              if (!e.target.value) {
                // ถ้าช่อง Stocks ว่าง ให้ล้างช่อง Barrels
                setBarrelsInput('');
              }
            }}
            disabled={!locksInput} // ปิดการใช้งานถ้าไม่มีค่าในช่อง Locks
          />
        </div>

        <div>
          <label>Barrels: (1-90)</label>
          <input
            type="number"
            value={barrelsInput}
            onChange={(e) => setBarrelsInput(e.target.value)}
            disabled={!stocksInput} // ปิดการใช้งานถ้าไม่มีค่าในช่อง Stocks
          />
        </div>

        {/* ปิดการใช้งานปุ่มคำนวณถ้ายังไม่ได้กรอกข้อมูลครบ */}
        <button onClick={calculateCommission} disabled={!isFormValid}>
          Calculate
        </button>

        {/* ปุ่มล้างข้อมูล */}
        <button onClick={resetFields} style={{ marginTop: '10px', backgroundColor: '#dc3545' }}>
          Clear
        </button>

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