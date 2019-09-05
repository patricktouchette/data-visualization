export const title = ({ g, text, x, y }) => {
  const titleText = g.selectAll('.titleText').data([null]);
  titleText.exit().remove();
  titleText
    .enter()
    .append('text')
    .attr('class', 'titleText')
    .merge(g.selectAll('.titleText'))
    .attr('x', x)
    .attr('y', y)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('fill', 'black')
    .text(text);
};
