export const worldMap = ({
  g,
  data,
  width,
  height,
  margin,
  titleText,
  fillColor,
  onCountryClick,
  countriesVisited,
  tooltip,
}) => {
  const projection = d3.geoMercator().center([0, 0]);
  const pathGenerator = d3.geoPath().projection(projection);

  const countryPaths = g.selectAll('.country').data(data);

  countryPaths
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('stroke', 'black');

  countryPaths
    .merge(g.selectAll('.country'))
    .attr('fill', d => (countriesVisited[d.id] ? fillColor : 'rgba(0,0,0,0.2)'))
    .attr('d', pathGenerator)
    .on('click', d => onCountryClick(d))
    .on('mouseenter', () => tooltip.show())
    .on('mousemove', d => {
      tooltip.move(d, { countriesVisited }, tooltipTemplate);
    })
    .on('mouseleave', () => tooltip.hide());

  // Resize to fit
  function resize() {
    const container = document.getElementById('worldMap');
    const newWidth = container.getBoundingClientRect().width;
    const scale = newWidth / 960;
    g.attr('transform', `scale(${scale})`);
  }

  resize();

  d3.select(window).on('resize', resize);
};

function tooltipTemplate(d, { countriesVisited }) {
  if (countriesVisited[d.id]) {
    return `You have been to <strong>${d.properties.name}</strong>!`;
  }

  return `<h4>${d.properties.name}</h4>`;
}
