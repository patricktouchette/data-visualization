import { title } from '../components/title.js';

export const countryMap = ({
  g,
  id,
  data,
  width,
  height,
  titleText,
  fillColor,
  tooltip,
}) => {
  const projection = d3.geoMercator();
  const pathGenerator = d3.geoPath().projection(projection);

  // Create country path
  const countryPaths = g.selectAll('.country').data(data);

  countryPaths
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('stroke', 'black')
    .attr('d', pathGenerator)
    .each(d => centerCountry(d, id, width, height))
    .attr('transform', d => d.translate);

  countryPaths
    .merge(g.selectAll('.country'))
    .attr('fill', fillColor)
    .attr('d', pathGenerator)
    .on('mouseenter', () => tooltip.show())
    .on('mousemove', d => {
      tooltip.move(d, {}, tooltipTemplate);
    })
    .on('mouseleave', () => tooltip.hide());

  // Add title
  title({
    g,
    text: titleText,
    x: width / 2,
    y: height / 2,
    fontSize: '30px',
  });

  // Resize to fit
  function resize() {
    const container = document.querySelector(id);
    const newWidth = container.getBoundingClientRect().width;
    const scale = newWidth / width;
    g.attr('transform', `scale(${scale})`);
  }

  resize();

  window.addEventListener('resize', resize);
};

function tooltipTemplate(d) {
  return `<h4>${d.properties.name}</h4>`;
}

function centerCountry(selection, id, width, height) {
  const margin = 100;
  const containerWidth = width - margin;
  const containerHeight = height - margin;

  const country = document.querySelector(`${id} .country`);
  const box = country.getBBox();
  const scale =
    containerWidth >= containerHeight
      ? containerHeight / box.height
      : containerWidth / box.width;

  const x0 = -box.x * scale;
  const y0 = -box.y * scale;
  const xOffset = (containerWidth - box.width * scale) / 2 + margin / 2;
  const yOffset = (containerHeight - box.height * scale) / 2 + margin / 2;

  selection.translate = `translate(${x0 + xOffset},${y0 +
    yOffset}) scale(${scale})`;
}
