import { title } from '../components/title.js';

export const areaChart = ({
  g,
  data,
  width,
  height,
  margin,
  titleText,
  xValue,
  yValue,
  fillColor,
  // tooltip,
}) => {
  // Title
  title({ g, text: titleText, x: width / 2, y: -margin.top / 2 });

  // Transition
  const t = d3.transition().duration(1500);

  // Scales
  const x = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([height, 0]);

  // Axes
  const xAxisCall = d3.axisBottom(x);
  const xAxis = g.selectAll('.x-axis').data([null]);
  xAxis.exit().remove();
  xAxis
    .enter()
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .merge(g.selectAll('.x-axis'))
    .transition(t)
    .call(xAxisCall);

  const yAxisCall = d3.axisLeft(y);
  const yAxis = g.selectAll('.y-axis').data([null]);
  yAxis.exit().remove();
  yAxis
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .merge(g.selectAll('.y-axis'))
    .transition(t)
    .call(yAxisCall);

  // Area Generator
  const area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x(d => x(xValue(d)))
    .y0(height)
    .y1(d => y(yValue(d)));

  // Area Path
  const path = g.selectAll('.area').data([data], xValue);
  path.exit().remove();

  path
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('fill', fillColor)
    .attr('stroke', 'rgba(0,0,0,0.5)')
    .merge(g.selectAll('.area'))
    .attr('d', d => area(d));
};
