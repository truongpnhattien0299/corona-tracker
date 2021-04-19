import React, { useEffect, useState } from 'react';
import { Cards, Chart, CountryPicker } from './components';

import { fetchData } from './api';
import styles from './App.module.scss';

function App() {
    const [dataApi, setData] = useState({
        data: {},
        country: ''
    });

    useEffect(() => {
        const fetchAPI = async () => {
            setData({ ...dataApi, data: await fetchData() });
        }
        fetchAPI();
        return () => {

        }
    }, []);

    const handleCountryChange = async (country) => {
        // console.log(country);
        const fetchAPI = await fetchData(country);
        setData({data:fetchAPI, country:country});
        // console.log(fetchAPI);
    }

    return (
        <div className={styles.container}>
            <Cards data={dataApi.data} />
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart data={dataApi.data} country={dataApi.country} />
        </div>
    );
}

export default App;