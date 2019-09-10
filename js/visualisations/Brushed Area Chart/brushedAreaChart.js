import { title } from '../components/title.js';

export const brushedAreaChart = ({
  g,
  data,
  width,
  height,
  margin,
  titleText,
  xValue,
  yValue,
  fillColor,
  tooltip,
}) => {
  // Title
  title({ g, text: titleText, x: width / 2, y: -margin.top / 2 });

  // Transition
  const t = d3.transition().duration(1500);

  // Set heights
  const height1 = (height * 3) / 4;
  const height2 = (height * 1) / 8;

  // ---------------------
  // Focus (Big Chart)
  // ---------------------
  const focus = g.selectAll('.focus').data([null]);
  focus.exit().remove();
  const focusG = focus
    .enter()
    .append('g')
    .attr('class', 'focus')
    .merge(g.selectAll('.focus'));

  // Scales
  const x1 = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, width]);

  const y1 = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([height1, 0]);

  // Axes
  const xAxisCall = d3.axisBottom(x1);
  const xAxis = focusG.selectAll('.x-axis').data([null]);
  xAxis.exit().remove();
  xAxis
    .enter()
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height1})`)
    .merge(focusG.selectAll('.x-axis'))
    .transition(t)
    .call(xAxisCall);

  const yAxisCall = d3.axisLeft(y1);
  const yAxis = focusG.selectAll('.y-axis').data([null]);
  yAxis.exit().remove();
  yAxis
    .enter()
    .append('g')
    .attr('class', 'y-axis')
    .merge(focusG.selectAll('.y-axis'))
    .transition(t)
    .call(yAxisCall);

  // Area Generator
  const areaGen = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x(d => x1(xValue(d)))
    .y0(height1)
    .y1(d => y1(yValue(d)));

  // Area Path
  const area = focusG.selectAll('.area').data([data]);
  area.exit().remove();

  area
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('fill', fillColor)
    .attr('clip-path', 'url(#clip)')
    .attr('stroke', 'rgba(0,0,0,0.5)')
    .merge(focusG.selectAll('.area'))
    .attr('d', d => areaGen(d));

  // ---------------------
  // Context (Small Chart)
  // ---------------------

  const context = g.selectAll('.context').data([null]);
  context.exit().remove();
  const contextG = context
    .enter()
    .append('g')
    .attr('class', 'context')
    .merge(g.selectAll('.context'))
    .attr('transform', `translate(0, ${height1 + height2})`);

  // Scales
  const x2 = d3
    .scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, width]);

  const y2 = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([height2, 0]);

  // Axes
  const xAxisCall2 = d3.axisBottom(x2);
  const xAxis2 = contextG.selectAll('.x-axis').data([null]);
  xAxis2.exit().remove();
  xAxis2
    .enter()
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height2})`)
    .merge(contextG.selectAll('.x-axis'))
    .transition(t)
    .call(xAxisCall2);

  // Area Generator
  const areaGen2 = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x(d => x2(xValue(d)))
    .y0(height2)
    .y1(d => y2(yValue(d)));

  // Area
  const contextArea = contextG.selectAll('.area').data([data]);
  contextArea.exit().remove();

  contextArea
    .enter()
    .append('path')
    .attr('class', 'area')
    .attr('fill', fillColor)
    .attr('stroke', 'rgba(0,0,0,0.5)')
    .merge(contextG.selectAll('.area'))
    .attr('d', d => areaGen2(d));

  // ---------------------
  // Brush and Zoom
  // ---------------------

  const brush = d3
    .brushX()
    .extent([[0, 0], [width, height2]])
    .on('brush end', brushed);

  const zoom = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height1]])
    .extent([[0, 0], [width, height1]])
    .on('zoom', zoomed);

  const defs = g.selectAll('defs').data([null]);
  defs.exit().remove();
  defs
    .enter()
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height);

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return; // ignore brush-by-zoom
    const s = d3.event.selection || x2.range();
    x1.domain(s.map(x2.invert, x2));

    focusG.select('.area').attr('d', () => areaGen(data));
    focusG.select('.x-axis').call(xAxisCall);

    g.select('.zoom').call(
      zoom.transform,
      d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
    );
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return; // ignore zoom-by-brush
    const t2 = d3.event.transform;
    x1.domain(t2.rescaleX(x2).domain());

    focusG.select('.area').attr('d', () => areaGen(data));
    focusG.select('.x-axis').call(xAxisCall);
    contextG.select('.brush').call(brush.move, x1.range().map(t2.invertX, t2));
  }

  const brushG = contextG.selectAll('.brush').data([null]);
  brushG.exit().remove();
  brushG
    .enter()
    .append('g')
    .attr('class', 'brush')
    .merge(contextG.selectAll('.brush'))
    .call(brush)
    .call(brush.move, x1.range());

  const zoomG = g.selectAll('.zoom').data([null]);
  zoomG.exit().remove();
  zoomG
    .enter()
    .append('rect')
    .attr('class', 'zoom')
    .attr('cursor', 'move')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .merge(g.selectAll('.zoom'))
    .attr('width', width)
    .attr('height', height1)
    .call(zoom);
};
