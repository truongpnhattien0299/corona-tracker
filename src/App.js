import React, { useEffect, useState } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.scss';

import image from './images/image.png';

function App() {
  const [dataApi, setData] = useState({
    data: {},
    country: ''
  });

  useEffect(() => {
    const fetchAPI = async () => {
      setData({ data: await fetchData() });
    }
    fetchAPI();
  }, []);

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);

    setData({ data, country: country });
  }

  const { data, country } = dataApi;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;