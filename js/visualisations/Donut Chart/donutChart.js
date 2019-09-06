import { title } from '../components/title.js';

export const donutChart = ({
  g,
  data,
  width,
  height,
  margin,
  titleText,
  value,
  label,
  fillColor,
  tooltip,
  showLabels,
}) => {
  // Center the g
  g.attr(
    'transform',
    `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
  );

  // Add title
  title({ g, text: titleText, x: 0, y: -height / 2 - margin.top / 2 });

  const radius = Math.min(width, height) / 2;

  // Arc generator function
  const arc = d3
    .arc()
    .innerRadius(radius - radius / 2.5)
    .outerRadius(radius);

  // Pie Data
  const pie = d3
    .pie()
    .sort(label)
    .value(value)
    .padAngle(0.02);
  console.log(pie(data));

  // Transition
  const tDuration = d3.transition().duration(1500);
  const tDelay = d3
    .transition()
    .duration(0)
    .delay(1500);

  // Create the arcs
  const path = g.selectAll('path').data(pie(data), d => label(d.data));
  path.exit().remove();

  path
    .enter()
    .append('path')
    .on('mouseover', () => tooltip.show())
    .on('mousemove', d => {
      tooltip.move(d, { value, label }, tooltipTemplate);
    })
    .on('mouseout', () => tooltip.hide())
    .transition(tDuration)
    .attr('fill', (d, i) => fillColor(i))
    .attrTween('d', arcEnterTween);

  path
    .transition(tDuration)
    .attr('fill', (d, i) => fillColor(i))
    .attrTween('d', arcTween);

  // Enter Animation
  function arcEnterTween(d) {
    const interpolate = d3.interpolate(d.startAngle, d.endAngle);
    this._current = d;
    return tick => {
      d.endAngle = interpolate(tick);
      return arc(d);
    };
  }

  // Arc Tween and interpolator
  function arcTween(a) {
    const interpolate = d3.interpolate(this._current, a);
    this._current = interpolate(0);
    return time => arc(interpolate(time));
  }

  // Optional Labels
  if (!showLabels) return;

  // Add Polylines for labels
  const labelFactor = 1.05;
  const labelsArc = d3
    .arc()
    .innerRadius(radius * labelFactor)
    .outerRadius(radius * labelFactor);

  const lines = g.selectAll('polyline').data(pie(data), d => label(d.data));
  lines.exit().remove();

  lines
    .enter()
    .append('polyline')
    .merge(g.selectAll('polyline'))
    .attr('stroke', 'none')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('points', d => {
      const posA = arc.centroid(d);
      const posB = labelsArc.centroid(d);
      const posC = labelsArc.centroid(d);
      // Calculate if label should be on left or right
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      posC[0] = radius * labelFactor * (midangle < Math.PI ? 1 : -1);

      return [posA, posB, posC];
    })
    .transition(tDelay)
    .attr('stroke', 'rgba(0,0,0,0.5)');

  // Add Labels
  const labels = g.selectAll('.label').data(pie(data), d => label(d.data));
  labels.exit().remove();

  // Helper function for aligning the text
  function alignLeft(d) {
    const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return midAngle > Math.PI;
  }

  labels
    .enter()
    .append('text')
    .attr('class', 'label')

    .merge(g.selectAll('.label'))
    .attr('stroke', 'none')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('dy', '0.32em')
    .attr('x', d => (alignLeft(d) ? -10 : 10))
    .attr('text-anchor', d => {
      const anchor = alignLeft(d) ? 'end' : 'start';
      return anchor;
    })
    .attr('transform', d => {
      const pos = labelsArc.centroid(d);
      pos[0] = radius * labelFactor * (alignLeft(d) ? -1 : 1);
      return `translate(${pos})`;
    })
    .text(d => d.data.label)
    .transition(tDelay)
    .attr('fill', 'black');
};

function tooltipTemplate(d, { value, label }) {
  return `
    <div>
      <p><strong>${label(d.data)}</strong></p>
      <p>${value(d.data)}</p>
    </div>
  `;
}
