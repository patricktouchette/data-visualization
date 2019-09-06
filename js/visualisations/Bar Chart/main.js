import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { verticalBarChart } from './verticalBarChart.js';
import { allData } from './data.js';

const tooltip = new Tooltip('body');

// Initialize the g which will hold the vis
const vis = initVis('body', {
  maxWidth: 400,
  maxHeight: 400,
  margin: { top: 50, right: 60, bottom: 20, left: 80 },
});

// Render the visualization
function render(data, i) {
  verticalBarChart({
    g: vis.g,
    data: data[i % data.length],
    width: vis.width,
    height: vis.height,
    titleText: 'Vertical Bar Chart',
    xValue: d => d.value,
    yValue: d => d.label,
    xValueUnit: 'm',
    fillColor: d3.scaleOrdinal(d3.schemeAccent),
    tooltip,
  });

  index += 1;
}

let index = 0;
render(allData, index);
setTimeout(() => render(allData, index), 3000);

// Add Event to Button
document.getElementById('barChart').addEventListener('click', () => {
  render(allData, index);
});
