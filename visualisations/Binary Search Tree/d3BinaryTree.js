export const binaryTree = (selection, props) => {
  const { data, offset } = props;

  const g = selection.append("g").attr("transform", `translate(${offset}, 0)`);

  const links = g.selectAll("line").data(data.slice(1));
  links
    .enter()
    .append("line")
    .attr("x1", d => d.parent.x)
    .attr("x2", d => d.x)
    .attr("y1", d => d.parent.y)
    .attr("y2", d => d.y)
    .attr("stroke", "black");

  const circles = g.selectAll("circle").data(data);
  circles
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 15)
    .attr("stroke", "black")
    .attr("fill", "yellow");

  const labels = g.selectAll("text").data(data);
  labels
    .enter()
    .append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dy", "0.32em")
    .text(d => d.val);
};
