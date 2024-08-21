import React, { useEffect, useState } from 'react';

const ApiTest = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      {data ? <p>Backend'den gelen mesaj: {data.message}</p> : <p>Yükleniyor...</p>}
    </div>
  );
};

export default ApiTest;
