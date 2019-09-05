import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { verticalBarChart } from './verticalBarChart.js';

const data1 = [
  { label: 'one', value: 1 },
  { label: 'six', value: 6 },
  { label: 'twenty-two', value: 22 },
  { label: 'five', value: 6 },
  { label: 'eleven', value: 11 },
  { label: 'twelve', value: 11 },
  { label: 'thirteen', value: 11 },
  { label: 'ffff', value: 11 },
  { label: 'fsdfsdf', value: 11 },
  { label: 'asdfasdfff', value: 11 },
  { label: '2324234', value: 11 },
];

const data2 = [
  { label: 'one', value: 2 },
  { label: 'six', value: 12 },
  { label: 'twenty-two', value: 44 },
  { label: 'five', value: 50 },
  { label: 'eleven', value: 8 },
];

const allData = [data1, data2];
let index = 0;

const tooltip = new Tooltip('body');

const vis = initVis('body', {
  maxWidth: 400,
  maxHeight: 400,
  margin: { top: 50, right: 60, bottom: 20, left: 80 },
});

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

render(allData, index);
setTimeout(() => render(allData, index), 3000);

document.getElementById('barChart').addEventListener('click', () => {
  render(allData, index);
});
