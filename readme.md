# Workshop Charts.js 
In deze workshop gaan we een bar chart van Chart.js implementeren om de top 5 meest voorkomende property types van alle AirBnbs te tonen en per neighbourhood te kunnen filteren.

>**Documentatie**
In deze workshop wordt chart.js en de wrapper voor React gebruikt. Er zijn ook wrappers voor Angular en Vue en Blazor en meer: <br>
**React:**  https://react-chartjs-2.js.org/ <br>
**Vue:**  https://vue-chartjs.org/ <br>
**Angular:** https://github.com/valor-software/ng2-charts <br>
**Blazor:** https://github.com/erossini/BlazorChartjs <br>
**MVC:** https://www.nuget.org/packages/ChartJSCore <br>
[Alle mogelijke integraties](https://github.com/chartjs/awesome?tab=readme-ov-file#integrations) <br>

Natuurlijk kun je ook gewoon de plain javascript charts.js gebruiken: <br>
https://www.chartjs.org/docs/latest/

***
## 1. Simpele bar chart toevoegen.

###  Installeren van de packages 
Voer dit uit in de terminal:
```
npm install 
```

### 1.1 Importeer de benodigde dependencies
Open het bestand `App.js` in de `/src/App.js` en plaats de imports bij `stap 1 in de code.`

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
### 1.2 Registreer de chartsJs grafiek
Registreer de chart onder alle imports bij `stap 2 in de code.`
```jsx
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);
```

### 1.3 Verwerk de JSON data om de juiste labels en hun waardes te verkrijgen
Deze code leest de JSON data uit, en slaat de top 5 property types en hun aantallen op.

Plaats deze methode bij `stap 3 in de code`.
```js
  const processData = () => {
    const propertyCounts = {};
    jsonData.forEach(item => {
      const { propertyType } = item;
      propertyCounts[propertyType] = (propertyCounts[propertyType] || 0) + 1;
    });

    const sortedCounts = Object.entries(propertyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedCounts.map(entry => entry[0]);
    const dataValues = sortedCounts.map(entry => entry[1]);

    return { labels, dataValues };
  };

   const { labels, dataValues } = processData();

```

### 1.4 Definieer het data object voor de grafiek
Plaats dit bij `stap 4 in de code.`
Voeg eventueel je eigen styling toe.

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
        borderWidth: 1.5, 
      },
    ],
  };
  ```

  ### 1.5 Voeg de bar chart toe aan de app
Plaats dit bij `stap 5 in de code.`
  ```jsx

    <Bar data={data}  />

  ```

   ### Run de app en kijk of alles is gelukt
  ```
   npm run start
  ```
***
## 2. Grafiek beter leesbaar maken.
In deze stap gaan we zorgen dat de chart beter leesbaar wordt.

  ### 2.1 Tooltip en omschrijving voor grafiek toevoegen
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

en update het huidige register statement:
```js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
);
```
Als je de grafiek nu opent, kun je zien dat de tooltip al werkt. Hover hiervoor over de bars in de grafiek. Om de titel te tonen, moeten we naar de volgende stap.

   ### 2.2 Maak een nieuw object voor de chart options
  
   Aan een chart.js grafiek kun je verschillende 'options' meegeven. Voeg onderstaande code toe om een titel en beschrijving van de x en y-assen toe te voegen.

   Plaats dit bij `stap 6 in de code.`
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
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Listings',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };
  ```
  ***


  ### 2.3 Voeg de options toe aan de grafiek
Update het huidige Bar component en voeg de options toe die je bij de stap 2.2 heb gedefinieerd.
  ```jsx
<Bar data={data} options={options}  />
  ```

### Run de applicatie en als alles goed is kun je nu de titel en namen voor x-as en y-as zien zien.

 ## 3.Data filteren en grafiek updaten

 ### 3.1 Import Dropdown button
 Plaats dit bij `stap 7 in de code.`
 ```js
import { Dropdown } from 'react-bootstrap';
 ```

 ### Haal alle neighbourhood namen op uit de JSON
Plaats dit bij `stap 8 in de code.`

```js
  const neighbourhoodNames = ['All', ...new Set(jsonData.map(item => item.neighbourhood))];
```

 ### Houdt de state bij voor het geselecteerde filter
 Plaats dit bij `stap 9 in de code.`
 ```js
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState('All'); 
```

### Voeg de dropdown met de neighbourhoods toe aan de app:
Vervang het hele return statement
```jsx
  return (
    <div className="App" style={{ width: '1000px', height: '700px' }} >
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
Plaats dit bij `stap 10 in de code.`
```js
  const handleNeighbourhoodClick = (neighbourhood) => {
    setSelectedNeighbourhood(neighbourhood);
  };
```

## Update de processData methode om te kunnen filteren op neighbourhoods
Vervang je huidige processData versie met deze code.
```jsx
  const processData = (neighbourhood = 'All') => {
    const propertyCounts = {};
    jsonData.forEach(item => {
      if (neighbourhood === 'All' || item.neighbourhood === neighbourhood) { // Filter by selected neighborhood
        const { propertyType } = item;
        propertyCounts[propertyType] = (propertyCounts[propertyType] || 0) + 1;
      }
    });

    const sortedCounts = Object.entries(propertyCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const labels = sortedCounts.map(entry => entry[0]);
    const dataValues = sortedCounts.map(entry => entry[1]);

    return { labels, dataValues };
  };
```

### Zorg ervoor dat de data wordt geupdate met filter
Update dit statement ``const { labels, dataValues } = processData(); ``
Met onderstaande code, zodat als er gefilterd wordt op buurt, de data geupdate wordt.
```js
  const { labels, dataValues } = processData(selectedNeighbourhood);
```

### Voeg de onclick methode toe aan de dropdown items
```jsx
       <Dropdown.Item
              className='text-dark'
              key={index}
              onClick={() => handleNeighbourhoodClick(neighbourhood)}
            >
              {neighbourhood}
            </Dropdown.Item>

```

Nu kun je filteren en wordt de grafiek geupdate.

## Verder experimenteren?
Voor elke chart kun je [hier,](https://www.chartjs.org/docs/latest/) onder het kopje **Chart types** alle charts vinden en hun properties.





