import { renderCountryMap } from './renderCountryMap.js';

d3.json('./countries-110m.json').then(data => {
  console.log('data', data);

  const { features } = topojson.feature(data, data.objects.countries);
  console.log('features', features);

  renderCountryMap({
    id: '#countryMap',
    data: features,
    countryId: '124',
    fillColor: 'orange',
  });
  renderCountryMap({
    id: '#countryMap2',
    data: features,
    countryId: '840',
    fillColor: 'indigo',
  });
  renderCountryMap({
    id: '#countryMap3',
    data: features,
    countryId: '148',
    fillColor: 'purple',
  });
  renderCountryMap({
    id: '#countryMap4',
    data: features,
    countryId: '834',
    fillColor: 'steelblue',
  });
});
