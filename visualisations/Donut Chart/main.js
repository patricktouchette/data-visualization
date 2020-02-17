import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { donutChart } from './donutChart.js';
import { allData } from './data.js';

const tooltip = new Tooltip('body');

// Initialize the g which will hold the vis
const vis = initVis('body', {
  maxWidth: 500,
  maxHeight: 400,
  margin: { top: 100, right: 100, bottom: 50, left: 100 },
});

// Render the visualization
function render(data, i) {
  donutChart({
    g: vis.g,
    data: data[i % data.length],
    width: vis.width,
    height: vis.height,
    margin: vis.margin,
    titleText: 'Donut Chart',
    value: d => d.value,
    label: d => d.label,
    fillColor: d3.scaleOrdinal(d3.schemeCategory10),
    tooltip,
    showLabels: true,
  });

  index += 1;
}

let index = 0;
render(allData, index);
setTimeout(() => render(allData, index), 3000);

// Add Event to Button
document.getElementById('donutChart').addEventListener('click', () => {
  render(allData, index);
});
