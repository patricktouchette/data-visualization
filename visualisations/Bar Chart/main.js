import { renderVerticalBarChart } from './renderVerticalBarChart.js';
import { allData } from './data.js';

renderVerticalBarChart({
  id: '#barChart1',
  data: allData,
  interval: 3000,
  nextButtonId: 'barChart',
  fillColor: null,
});

renderVerticalBarChart({
  id: '#barChart2',
  data: allData,
  interval: 2000,
  nextButtonId: 'barChart',
  fillColor: null,
});
