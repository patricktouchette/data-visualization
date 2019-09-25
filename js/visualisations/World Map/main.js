import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { worldMap } from './worldMap.js';

const vis = initVis('#worldMap', {
  maxWidth: 960,
  maxHeight: 500,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

const tooltip = new Tooltip('body');

// State
const countriesVisited = {};
let mapData;

d3.json('./countries-110m.json').then(data => {
  console.log('data', data);

  const { features } = topojson.feature(data, data.objects.countries);
  mapData = features;
  console.log('features', features);

  renderWorldMap();
});

function renderWorldMap() {
  worldMap({
    g: vis.g,
    data: mapData,
    width: vis.width,
    height: vis.height,
    margin: vis.margin,
    fillColor: 'orange',
    countriesVisited,
    onCountryClick,
    tooltip,
  });
}

function onCountryClick(d) {
  const toRemove = countriesVisited[d.id];

  if (!toRemove) {
    // Add a country on first click
    countriesVisited[d.id] = d.properties.name;
  } else {
    // Remove a country on second click
    delete countriesVisited[d.id];
  }

  // Re-render the map
  renderWorldMap();

  // Show a list of countries visited
  countriesHTML();
}

function countriesHTML() {
  const countries = Object.values(countriesVisited);
  const list = countries.map(country => `<p>${country}</p>`).join('');
  const total = countries.length;

  const html = `
    <div class='output'>
      <h2>List of countries visited</h2>
      <h4>Total visited: ${total}</h4>
      ${list}
    </div>`;

  const output = document.querySelector('#worldMap');
  if (output.querySelector('.output')) {
    output.querySelector('.output').remove();
  }
  // output.innerHTML = '';
  output.insertAdjacentHTML('beforeend', html);
}
