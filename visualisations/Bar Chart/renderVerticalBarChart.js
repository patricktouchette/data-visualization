import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { verticalBarChart } from './verticalBarChart.js';

export function renderVerticalBarChart({
  id,
  data,
  interval,
  fillColor,
  nextButtonId,
}) {
  // Initialize the g which will hold the vis
  const vis = initVis(id, {
    maxWidth: 400,
    maxHeight: 400,
    margin: { top: 50, right: 60, bottom: 20, left: 80 },
  });

  const tooltip = new Tooltip('body');

  let index = 0;

  // Render the visualization
  function render(i) {
    verticalBarChart({
      g: vis.g,
      data: data[i % data.length],
      id,
      width: vis.width,
      height: vis.height,
      margin: vis.margin,
      titleText: 'Vertical Bar Chart',
      xValue: d => d.value,
      yValue: d => d.label,
      xValueUnit: 'm',
      fillColor: fillColor || d3.scaleOrdinal(d3.schemeAccent),
      tooltip,
    });

    index += 1;
  }

  render(index);
  // setInterval(() => render(index), interval);

  // Add Event to Button
  if (nextButtonId) {
    document.getElementById(nextButtonId).addEventListener('click', () => {
      render(index);
    });
  }
}
