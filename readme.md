1. Installeer de charts.js en react-chartsjs-2 libraries
   ( is a React wrapper for Chart.js 2.0 and 3.0, letting us use Chart.js elements as React components.)
    npm install chart.js react-chartjs-2
2. 
3. Haal je data op.


## REACT
1. Installeer de charts.js en react-chartsjs-2 libraries
2. Import de benodigde components voor de bar chart -> 
        import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
3. Zet je data klaar:
   const labels = ['Entire home/apt', 'Private room', 'Shared room', 'Hotel room'];

  const data = {
    labels,
    datasets: [
      {

        data: [12008, 8520, 120, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  4. Voeg tooltip toe: voeg Tooltip toe aan de imports van chartsJS. Nu kun je automatisch de data van elke label uitlezen en pakt de naam van de labels array.
  5. options voor charts toevoegen zoals title: maak options object en voeg bij de options object het volgende toe:
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    Geef hierna aan de <Bar /> de prop options={options} mee

    ## VUE.JS

    ## ANGULAR


.. Verder experimenteren: Voor elke chart kun je hier de properties vinden:https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties
    

