export const initVis = (
  selection,
  { maxWidth, maxHeight, margin = { top: 20, right: 20, bottom: 20, left: 20 } }
) => {
  const width = maxWidth - margin.left - margin.right;
  const height = maxHeight - margin.top - margin.bottom;

  const svg = d3
    .select(selection)
    .append('svg')
    .attr('width', maxWidth)
    .attr('height', maxHeight);

  const topG = svg.append('g');

  const g = topG
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const zoomed = () => topG.attr('transform', d3.event.transform);
  svg.call(d3.zoom().on('zoom', zoomed));

  return { g, width, height, margin };
};
