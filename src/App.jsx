import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(
        'https://economia.awesomeapi.com.br/last/USD-BRL',
      );
      const json = await response.json();
      setData(json.USDBRL.bid);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return (
      <p
        className="App"
        style={{
          marginTop: '5rem',
          justifyContent: 'center',
        }}
      >
        Carregando...
      </p>
    );
  }

  return (
    <div className="App">
      <h1 className="title">
        Cotação do Dólar:{' '}
        <span className="dolar">R$ {Number(data).toFixed(2)}</span>
      </h1>
      <form className="form">
        <label htmlFor="valor">Informe o valor</label>
        <input
          type="number"
          id="valor"
          name="valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {value !== '' && (
        <div className="result">
          <h1>
            <span className="dolar">
              {Number(data * value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default App;
