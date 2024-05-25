import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import jsonData from './data/data.json';
import React, { useState } from 'react'; // Import React and useState
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Dropdown } from 'react-bootstrap'; // Import Dropdown from react-bootstrap

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);

function App() {
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('All'); // State to store selected neighborhood

  // Extract unique neighbourhood names from JSON data
  const neighbourhoodNames = ['All', ...new Set(jsonData.map(item => item.neighbourhood))];


  // Process JSON data to count listings for each property type in the selected neighborhood
  const processData = (neighborhood = 'All') => {
    const propertyCounts = {};
    jsonData.forEach(item => {
      if (neighborhood === 'All' || item.neighbourhood === neighborhood) { // Filter by selected neighborhood
        const { propertyType } = item;
        propertyCounts[propertyType] = (propertyCounts[propertyType] || 0) + 1;
      }
    });

    // Sort the property counts
    const sortedCounts = Object.entries(propertyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Get top 5

    // Extract labels and dataValues from sortedCounts
    const labels = sortedCounts.map(entry => entry[0]);
    const dataValues = sortedCounts.map(entry => entry[1]);

    return { labels, dataValues };
  };

  const handleNeighbourhoodClick = (neighbourhood) => {
    setSelectedNeighbourhood(neighbourhood);
  };

  const { labels, dataValues } = processData(selectedNeighbourhood);

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Top 5 Property Types${selectedNeighbourhood !== 'All' ? ` in ${selectedNeighbourhood}` : ' in Paris'}`, // Update chart title based on selected neighborhood
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Property Type',
            font: {
              weight: 'bold', // Maak de titel van de X-as vetgedrukt
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Listings',
            font: {
              weight: 'bold', // Maak de titel van de Y-as vetgedrukt
            },
          },
        },
      },

    }
  };



  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1.5, // Add border width
      },
    ],
  };


  return (
    <div className="App" style={{ width: '1000px', height: '700px' }} >

      {/* Dropdown button with Bootstrap classes */}
      <Dropdown Dropdown className='p-2' >
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {selectedNeighbourhood}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {neighbourhoodNames.map((neighbourhood, index) => (
            <Dropdown.Item
              className='text-dark'
              key={index}
              onClick={() => handleNeighbourhoodClick(neighbourhood)}
            >
              {neighbourhood}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown >
      <Bar data={data} options={options} />
    </div >
  );
}

export default App;
