import { initVis } from '../components/initVis.js';
import { Tooltip } from '../components/Tooltip.js';
import { countryMap } from './countryMap.js';

export function renderCountryMap({ id, data, countryId, fillColor }) {
  const vis = initVis(id, {
    maxWidth: 500,
    maxHeight: 500,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    zoomable: false,
  });

  const tooltip = new Tooltip('body');
  const countryData = data.filter(c => c.id === countryId);

  countryMap({
    g: vis.g,
    id,
    data: countryData,
    width: vis.width,
    height: vis.height,
    margin: vis.margin,
    titleText: countryData[0].properties.name,
    fillColor,
    tooltip,
  });
}
