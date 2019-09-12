import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { lineChart } from './lineChart.js';

const tooltip = new Tooltip('body');

// Initialize the g which will hold the vis
const vis = initVis('body', {
  maxWidth: 600,
  maxHeight: 400,
  margin: { top: 80, right: 50, bottom: 50, left: 50 },
});

// Render the visualization
function render(data, i) {
  lineChart({
    g: vis.g,
    data: data[i % data.length],
    width: vis.width,
    height: vis.height,
    margin: vis.margin,
    titleText: 'Line Chart',
    xValue: d => d.date,
    yValue: d => d.price,
    lineColor: 'lightblue',
    tooltip,
  });

  index += 1;
}

let index = 0;
d3.csv('./data.csv').then(loadedData => {
  // Parse Data
  const parseDate = d3.timeParse('%b %Y');
  loadedData.forEach(d => {
    d.date = parseDate(d.date);
    d.price = +d.price;
  });

  const data = [loadedData.slice(0, 40), loadedData.slice(80, 120)];

  render(data, index);
  setTimeout(() => render(data, index), 3000);

  // Add Events to Buttons
  document.getElementById('nextDataset').addEventListener('click', () => {
    render(data, index);
  });
});
