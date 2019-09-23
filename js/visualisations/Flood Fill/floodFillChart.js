export const floodFillChart = (selection, props) => {
  const { data, size, step } = props;

  const rects = selection.selectAll('rect').data(data, d => d.id);

  rects.exit().remove();

  rects
    .transition()
    .duration(step)
    .attr('fill', d => d.color);

  rects
    .enter()
    .append('rect')
    .attr('id', d => d.id)
    .attr('x', d => d.x * size)
    .attr('y', d => d.y * size)
    .attr('width', size)
    .attr('height', size)
    .attr('stroke', 'black')
    .attr('fill', d => d.color)
    .append('title')
    .text(d => d.id);
};
