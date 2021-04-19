import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeUrl = url;

    if(country)
    {
        changeUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeUrl);
        return { confirmed, recovered, deaths, lastUpdate }
        // console.log(modifyData);
        // return modifyData;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDailyData = async () => {
    try {
        const data = await axios.get(`${url}/daily`);
        // console.log(data);
        const modifyData = data.data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifyData;
        // return modifyData;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCountries = async()=>{
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        // const modifyData = countries.data.countries.map((country)=>({
        //     name: country.name
        // }));
        // return modifyData;
        return countries.map((country)=>country.name);
    } catch (error) {
        console.log(error.message);
    }
}
