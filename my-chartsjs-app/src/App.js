import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);



function App() {

  const options = {
    responsive: true,
    plugins: {

      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['Entire home/apt', 'Private room', 'Shared room', 'Hotel room'];

  const data = {
    labels,
    datasets: [
      {

        data: [1200, 840, 120, 200],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
      },
    ],
  };






  return (
    <div className="App" style={{ width: '1000px', height: '700px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default App;
