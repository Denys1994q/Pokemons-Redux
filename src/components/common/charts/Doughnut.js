// хуки
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
// import { ArcElement } from "chart.js";
// import Chart from "chart.js/auto";

const BarChart = (props) => {
    const { stats } = props;

    const data = {
        labels: ["HP", "Attack", "Defense", "Special Attack", "Special Defence", "Speed"],
        datasets: [
            {
                data: [
                    stats[0].base_stat,
                    stats[1].base_stat,
                    stats[2].base_stat,
                    stats[3].base_stat,
                    stats[4].base_stat,
                    stats[5].base_stat,
                ],
                backgroundColor: ["#38E54D", "#FF6D28", "#E15FED", "#F7EC09", "#30AADD", "#43919B"],
                borderRadius: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                display: false,
                min: 0,
                max: 110,
            },
            x: {},
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className='chart'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
