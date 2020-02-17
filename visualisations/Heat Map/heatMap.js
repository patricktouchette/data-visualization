import { title } from '../components/title.js';

export const heatMap = ({
  g,
  data,
  width,
  height,
  margin,
  titleText,
  xValue,
  yValue,
  value,
  valueUnit,
  fillColor,
  tooltip,
}) => {
  // title
  title({ g, text: titleText, x: width / 2, y: -margin.top / 2 });

  // Rectangle Offsets
  const cols = d3.max(data, xValue) + 1;
  const rows = d3.max(data, yValue) + 1;
  const rectWidth = width / cols;
  const gap = 10;

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, width - rectWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([height - rectWidth, 0]);

  const colorScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, value)])
    .range([0, 1]);

  // Axes
  const xAxisCall = d3.axisBottom(xScale).ticks(cols);
  const xAxis = g.selectAll('.x-axis').data([null]);
  xAxis
    .enter()
    .append('g')
    .attr('class', 'x-axis')
    .merge(g.selectAll('.x-axis'))
    .attr('transform', `translate(0, ${height - gap})`)
    .call(xAxisCall);

  const yAxisCall = d3.axisLeft(yScale).ticks(rows);
  const yAxis = g.selectAll('.y-axis').data([null]);
  yAxis
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .merge(g.selectAll('.y-axis'))
    .attr('transform', `translate(0, ${rectWidth - gap})`)
    .call(yAxisCall);

  // Axes Ticks Format
  g.selectAll('.tick')
    .select('line')
    .remove();

  g.selectAll('.domain').remove();

  g.select('.x-axis')
    .selectAll('text')
    .attr('x', (rectWidth - gap) / 2);

  g.select('.y-axis')
    .selectAll('text')
    .attr('y', -(rectWidth - gap) / 2);

  // Rects
  const rects = g.selectAll('rect').data(data);
  rects.exit().remove();
  rects
    .enter()
    .append('rect')
    .attr('stroke', 'none')
    .merge(g.selectAll('rect'))
    .attr('x', d => xScale(xValue(d)))
    .attr('y', d => yScale(yValue(d)))
    .attr('width', rectWidth - 10)
    .attr('height', rectWidth - 10)
    .on('mouseover', () => tooltip.show())
    .on('mousemove', d => {
      tooltip.move(d, { value, valueUnit }, tooltipTemplate);
    })
    .on('mouseout', () => tooltip.hide())
    .transition()
    .duration(400)
    .attr('fill', d => fillColor(colorScale(value(d))));
};

function tooltipTemplate(d, { value, valueUnit }) {
  return `
    <div>
      <p>There are <strong>${value(d)} ${valueUnit}</strong></p>
    </div>
  `;
}
