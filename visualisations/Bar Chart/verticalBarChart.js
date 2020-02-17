import { title } from '../components/title.js';

export const verticalBarChart = ({
  g,
  data,
  id,
  width,
  height,
  margin,
  titleText,
  xValue,
  yValue,
  xValueUnit,
  fillColor,
  tooltip,
}) => {
  // Scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, height])
    .padding(0.3);

  // Axes
  const yAxis = d3.axisLeft(yScale);
  yAxis(g);

  // Transitions
  const enterT = d3
    .transition()
    .duration(1500)
    .delay(300);

  const exitT = d3.transition().duration(300);

  // Rects
  const rects = g.selectAll('rect').data(data);
  rects
    .exit()
    .transition(exitT)
    .attr('x', 0)
    .attr('height', 0)
    .remove();

  rects
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('height', yScale.bandwidth)
    .on('mouseover', () => tooltip.show())
    .on('mousemove', d => {
      tooltip.move(d, { xValue, yValue, xValueUnit }, tooltipTemplate);
    })
    .on('mouseout', () => tooltip.hide())

    .merge(g.selectAll('rect'))
    .transition(enterT)
    .attr('x', 0)
    .attr('y', d => yScale(yValue(d)))
    .attr('height', yScale.bandwidth)
    .attr('width', d => xScale(xValue(d)))
    .attr('fill', (d, i) => fillColor(i) || d);

  // Values Text
  const valuesText = g.selectAll('.valueText').data(data);
  valuesText.exit().remove();

  valuesText
    .enter()
    .append('text')
    .attr('class', 'valueText')
    .attr('y', d => yScale(yValue(d)) + yScale.bandwidth(d) / 2)

    .merge(g.selectAll('.valueText'))
    .transition(enterT)
    .attr('x', d => xScale(xValue(d)) + 10)
    .attr('y', d => yScale(yValue(d)) + yScale.bandwidth(d) / 2)
    .attr('text-anchor', 'start')
    .attr('font-size', '12px')
    .attr('dy', '0.32rem')
    .attr('fill', 'indigo')
    .text(d => xValue(d) + xValueUnit);

  // Title Text
  title({ g, text: titleText, x: width / 2, y: -10 });

  // Resize to fit
  function resize() {
    const container = document.querySelector(id);
    const newWidth = container.getBoundingClientRect().width;
    const newHeight = container.getBoundingClientRect().height;
    const topG = d3.select(`${id} .topG`).data([null]);
    console.log('topG', topG);
    console.log('width', width);
    console.log('newWidth', newWidth);
    const scaleX = newWidth / (width + margin.right + margin.left);
    const scaleY = newHeight / (height + margin.top + margin.bottom);
    console.log('scaleX', scaleX);
    console.log('scaleY', scaleY);
    topG.attr('transform', `scale(${scaleX})`);
  }

  resize();

  window.addEventListener('resize', resize);
};

function tooltipTemplate(d, { xValue, yValue, xValueUnit }) {
  return `
    <div>
      <p><strong>${yValue(d)}</strong></p>
      <p>${xValue(d)}${xValueUnit}</p>
    </div>
  `;
}
