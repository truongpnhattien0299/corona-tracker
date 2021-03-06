import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.scss';
import { fetchCountries } from '../../api';

function CountryPicker({ handleCountryChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries());
        };
        fetchAPI();
    }, []);

    // console.log(countries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event) => handleCountryChange(event.target.value)}>
                <option value="">Global</option>
                {countries.map((country, i) =>
                    <option key={i} value={country}>{country}</option>)
                }
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;