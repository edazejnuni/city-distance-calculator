const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());


const cityData = [
    {
      value: 'Paris',
      label: 'Paris',
      latitude: 48.856614,
      longitude: 2.352222
    },
    {
      value: 'Marseille',
      label: 'Marseille',
      latitude: 43.296482,
      longitude: 5.369780
    },
    {
      value: 'Lyon',
      label: 'Lyon',
      latitude: 45.764043,
      longitude: 4.835659
    },
    {
      value: 'Toulouse',
      label: 'Toulouse',
      latitude: 43.604652,
      longitude: 1.444209
    },
    {
      value: 'Nice',
      label: 'Nice',
      latitude: 43.710173,
      longitude: 7.261953
    },
    {
      value: 'Nantes',
      label: 'Nantes',
      latitude: 47.218371,
      longitude: -1.553621
    },
    {
      value: 'Strasbourg',
      label: 'Strasbourg',
      latitude: 48.573405,
      longitude: 7.752111
    },
    {
      value: 'Montpellier',
      label: 'Montpellier',
      latitude: 43.610769,
      longitude: 3.876716
    },
    {
      value: 'Bordeaux',
      label: 'Bordeaux',
      latitude: 44.837789,
      longitude: -0.579180
    },
    {
      value: 'Lille',
      label: 'Lille',
      latitude: 50.629250,
      longitude: 3.057256
    },
    {
      value: 'Rennes',
      label: 'Rennes',
      latitude: 48.117266,
      longitude: -1.677793
    },
    {
      value: 'Reims',
      label: 'Reims',
      latitude: 49.258329,
      longitude: 4.031696
    },
    {
      value: 'Le Havre',
      label: 'Le Havre',
      latitude: 49.494370,
      longitude: 0.107929
    },
    {
      value: 'Saint-Étienne',
      label: 'Saint-Étienne',
      latitude: 45.439695,
      longitude: 4.387178
    },
    {
      value: 'Toulon',
      label: 'Toulon',
      latitude: 43.124228,
      longitude: 5.928000
    },
    {
      value: 'Angers',
      label: 'Angers',
      latitude: 47.478419,
      longitude: -0.563166
    },
    {
      value: 'Grenoble',
      label: 'Grenoble',
      latitude: 45.188529,
      longitude: 5.724524
    },
    {
      value: 'Dijon',
      label: 'Dijon',
      latitude: 47.322047,
      longitude: 5.041480
    },
    {
      value: 'Nîmes',
      label: 'Nîmes',
      latitude: 43.836699,
      longitude: 4.360054
    },
    {
      value: 'Aix-en-Provence',
      label: 'Aix-en-Provence',
      latitude: 43.529742,
      longitude: 5.447427
    },
  ];
  
const uniqueCityData = cityData.reduce((acc, city) => {
  if (!acc.some(existingCity => existingCity.label === city.label)) {
    acc.push(city);
  }
  return acc;
}, []);

app.post('/searchCities', (req, res) => {
  const keyword = req.body.keyword.toLowerCase();
  const filteredCities = uniqueCityData.filter(city =>
    city.label.toLowerCase().includes(keyword)
  );
  res.json(filteredCities);
});

app.post('/calculateDistances', async (req, res) => {
  const citiesWithCoordinates = req.body.cities;

  try {
    const distancesArray = await calculateDistances(citiesWithCoordinates);
    res.json(distancesArray);
  } catch (error) {
    console.error('Error calculating distances:', error);
    res.status(500).json({ error: 'Error calculating distances' });
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Server is running on port 3001');
});