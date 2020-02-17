import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { heatMap } from './heatMap.js';
import { createGrid } from './createGrid.js';

const tooltip = new Tooltip('body');

// Initialize the g which will hold the vis
const vis = initVis('body', {
  maxWidth: 400,
  maxHeight: 400,
  margin: { top: 60, right: 40, bottom: 40, left: 40 },
});

// Render the visualization
function render(data) {
  heatMap({
    g: vis.g,
    data,
    width: vis.width,
    height: vis.height,
    margin: vis.margin,
    titleText: 'Heat Map',
    xValue: d => d.x,
    yValue: d => d.y,
    value: d => d.value,
    valueUnit: 'units',
    fillColor: d3.interpolateReds,
    tooltip,
  });
}

const columns = 10;
const rows = 6;
const data = createGrid(columns, rows);
render(data);

setTimeout(() => {
  const newData = createGrid(columns, rows);
  return render(newData);
}, 3000);

// Add Event to Button
document.getElementById('heatMap').addEventListener('click', () => {
  const newData = createGrid(columns, rows);
  render(newData);
});
