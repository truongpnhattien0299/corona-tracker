import React, { useEffect, useState } from 'react';
import { fetchDailyData } from '../../api';

import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.scss';

function Chart({ data: { confirmed, recovered, deaths }, country }) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);
    const lineChart = (
        dailyData[0]
            ? (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Bị Nhiễm',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Tử vong',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );


    const barChar = (
        confirmed
            ? (<Bar
                data={{
                    labels: ['Bị nhiếm', 'Khỏi bệnh', 'Tử vong'],
                    datasets: [{
                        label: 'Người',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state ${country}` }
                }}
            />) : null
    );

    // console.log(confirmed);
    return (
        <div className={styles.container}>
            {country ? barChar : lineChart}
        </div>
    );
}

export default Chart;