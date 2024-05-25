# Workshop Charts.js 
In deze workshop gaan we een bar chart van Chart.js implementeren om de aantallen verschillende property types van alle airBNBS te tonen en per buurt te kunnen filteren.

>**Documentatie**
In deze workshop wordt chart.js en de wrapper voor React gebruikt. Er zijn ook wrappers voor Angular en Vue en Blazor: <br>
**React:**  https://react-chartjs-2.js.org/ <br>
**Vue:**  https://vue-chartjs.org/ <br>
**Angular:** https://github.com/valor-software/ng2-charts <br>
**Blazor:** https://github.com/erossini/BlazorChartjs <br>
[Alle mogelijke integraties](https://github.com/chartjs/awesome?tab=readme-ov-file#integrations)

***
## 1. Simpele bar chart toevoegen.

### Installeer de dependencies 
De benodigde packages:
```json
"chart.js": "^4.4.3",
"react-chartjs-2": "^5.2.0",
```

Voer dit uit in de terminal:
```
npm install 
```

### Importeer de benodigde dependencies

```js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import jsonData from './data/data.json';
```
### Registreer de chartsJs grafiek
```jsx
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);
```

### Verwerk de JSON data om de juiste labels en hun waardes te verkrijgen
```js
  // Process JSON data to count listings for each property type
  const processData = () => {
    const propertyCounts = {};
    jsonData.forEach(item => {
      const { propertyType } = item;
      propertyCounts[propertyType] = (propertyCounts[propertyType] || 0) + 1;
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

```

### Definieer het data object voor de grafiek
```js
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
  ```

  ### Voeg de bar chart toe aan de app
  ```jsx
   return (
    <Bar data={data}  />
   );
  ```

   ### Run de app en kijk of alles is gelukt
  ```
   npm run start
  ```
***
## 2. Grafiek beter leesbaar maken.
In deze stap gaan we zorgen dat de chart beter leesbaar wordt en ook reageert op filteren op verschillende buurten.

  ### Tooltip en titel toevoegen
  Voeg aan het import statement de Tooltip en Title toe:
  ```js
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';
  ```

en update het register statement:
```js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);
```
Als je de grafiek nu opent kun je zien dat de tooltip al werkt, voor de titel moeten we naar de volgende stap.

   ### Maak een nieuw object voor de chart options
   Aan een chart.js grafiek kun je verschillende 'options' meegeven. Voeg onderstaande code toe om een title en beschrijving van de x en y-assen toe te voegen.
  ```js
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Top 5 AirBNB property types in Paris'
      },
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
  };
  ```
  ***
 ## 3.Data filteren en grafiek updaten

 ### Import Dropdown button
 ```js
import { Dropdown } from 'react-bootstrap';
 ```

 ### Haal alle neighbourhood namen op uit de JSON
```js
  const neighbourhoodNames = ['All', ...new Set(jsonData.map(item => item.neighbourhood))];
```

 ### Houdt de state bij van geselecteerde filter
 ```js
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('All'); 
```

### Voeg de dropdown met de neighbourhoods toe aan de app:
```jsx
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
            >
              {neighbourhood}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Bar data={data} options={options} />
    </div >
  );
```

## Voeg onclick implementatie toe voor het filteren
```js
  const handleNeighbourhoodClick = (neighbourhood) => {
    setSelectedNeighbourhood(neighbourhood);
  };
```

## Update de processData methode om te kunnen filteren op neighbourhoods
```jsx
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
```

## Verder experimenteren?
Voor elke chart kun je [hier,](https://www.chartjs.org/docs/latest/) onder het kopje **Chart types** alle charts vinden en hun properties.





