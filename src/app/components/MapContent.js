'use client'

import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import BaseMap from './layer/BaseMap';


function MapContent() {
  return (
    <MapContainer
        style={{width:'100%', height: '100%', borderRadius: '25px'}}
        center={[13, 100]}
        zoom={6}
        scrollWheelZoom={true}
    >
        <BaseMap/>
    </MapContainer>
  )
}

export default MapContent