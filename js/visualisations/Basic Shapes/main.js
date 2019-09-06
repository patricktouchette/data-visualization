// BASIC SHAPES in D3.js
const width = 800;
const height = 500;

// Circle
const circleSvg = d3
  .select('#circle')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

circleSvg
  .append('circle')
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('r', 100)
  .attr('fill', 'indigo');

const circles = circleSvg.selectAll('.smallCircle').data([10, 22, 33, 11]);
circles
  .enter()
  .append('circle')
  .attr('cx', d => d * 10)
  .attr('cy', d => d * 10)
  .attr('r', d => d)
  .attr('fill', 'darkorange');

// Rectangle
const rectSvg = d3
  .select('#rect')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

rectSvg
  .append('rect')
  .attr('x', 10)
  .attr('y', width / 2)
  .attr('width', 200)
  .attr('height', 50)
  .attr('fill', 'indigo');

// Line
const lineSvg = d3
  .select('#line')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

lineSvg
  .append('line')
  .attr('x1', 210)
  .attr('y1', 210)
  .attr('x2', 400)
  .attr('y2', 400)
  .attr('stroke-width', 8)
  .attr('stroke', 'red');

// Path
const data = [
  { x: 0, y: 20 },
  { x: 150, y: 150 },
  { x: 300, y: 100 },
  { x: 450, y: 20 },
  { x: 600, y: 130 },
];
const lineGen = d3
  .line()
  .x(d => d.x)
  .y(d => d.y);
lineSvg
  .append('path')
  .attr('stroke', 'black')
  .attr('fill', 'none')
  .attr('d', lineGen(data));

// Curved Path
const curveGen = d3
  .line()
  .x(d => d.x)
  .y(d => d.y + 100)
  .curve(d3.curveBasis);

lineSvg
  .append('path')
  .attr('stroke', 'green')
  .attr('fill', 'none')
  .attr('d', curveGen(data));

// Area
const areaSvg = d3
  .select('#area')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const areaGen = d3
  .area()
  .x(d => d.x)
  .y1(d => d.y)
  .y0(height);

areaSvg
  .append('path')
  .attr('d', areaGen(data))
  .attr('stroke', 'black')
  .attr('fill', 'green');

// Arc
const arcSvg = d3
  .select('#arc')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const arc = d3
  .arc()
  .innerRadius(height / 2 - 100)
  .outerRadius(height / 2 - 30)
  .startAngle(3.14)
  .endAngle(6.28);

arcSvg
  .append('path')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)
  .attr('stroke', 'indigo')
  .attr('fill', 'darkorange')
  .attr('d', arc);
