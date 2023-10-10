import React from 'react';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { uzbData } from '../../../pages/uzb';

function JPS() {
  const center = [40.12442709646927, 67.87769254689282];

  return (
    <MapContainer
      key={1}
      center={center}
      zoom={7}
      style={{
        width: '100vw',
        height: '100vh',
        borderRadius: '10px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <TileLayer
        key={2}
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Wnj1VB2TZlK2apMlLIne"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {uzbData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

        // eslint-disable-next-line react/jsx-key
        return <Polygon key={state.properties.ADM1_EN} positions={coordinates} />;
      })}
    </MapContainer>
  );
}

export default JPS;
