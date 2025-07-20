import React from 'react';
import './App.css';

function App() {
  const [urlValue, setUrlValue] = React.useState('');
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState({});

  console.log('data', data);
  console.log('error', error);

  function handleSendOriginalUrl(e) {
    e.preventDefault();

    fetch('http://localhost:3001/form-sent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: urlValue,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            setData(json);
          });
          setError({});
        } else {
          res.json().then((json) => {
            setError({ ...json, message: 'Error shortening URL' });
          });
          setData({});
        }
      })
      .catch((err) => {
        setError({ message: 'Error shortening URL', ...err });
      });
  }
  return (
    <>
      <div>
        <h1>Insert URL</h1>
        <form onSubmit={handleSendOriginalUrl}>
          <input
            type="text"
            onChange={(e) => setUrlValue(e.target.value)}
            value={urlValue}
            name="original-url"
            id="original-url"
          />
          <button type="submit">Transform</button>
        </form>
        <h2>Shortened URL is:</h2>
        {error?.message && <p>{error?.message}</p>}
        {error?.error && <p>{error?.error}</p>}

        {!error?.message && data?.shortUrl && (
          <a href={`http://localhost:3001/id/${data?.id}`} target="_blank">
            {data.shortUrl}
          </a>
        )}
      </div>
    </>
  );
}

export default App;
