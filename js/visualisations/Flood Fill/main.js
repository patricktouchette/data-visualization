import { initVis } from '../components/initVis.js';
import { Grid } from './Grid.js';
import { floodFill } from './floodFill.js';
import { floodFillChart } from './floodFillChart.js';

// Circular Flood Fill
const vis1 = initVis('body', {
  maxWidth: 600,
  maxHeight: 600,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  zoomable: false,
});

const grid1 = new Grid({ step: 20, rows: 20, cols: 20, size: 600 / 20 });
const grid1Render = () => {
  floodFillChart(vis1.g, {
    data: grid1.data.flat(),
    size: grid1.size,
    step: grid1.step,
  });
};
grid1Render();

floodFill({
  grid: grid1,
  render: grid1Render,
  targetColor: 'white',
  replacementColor: 'red',
  type: 'circular',
});

// Linear Flood Fill

// floodFill({
//   grid: grid2,
//   render: grid2Render,
//   targetColor: 'white',
//   replacementColor: 'indigo',
//   type: 'line',
// });
