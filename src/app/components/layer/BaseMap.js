'use client'

import React from 'react'
import { LayerGroup, LayersControl, TileLayer } from 'react-leaflet'
import WeatherLayer from './WeatherLayer'

function BaseMap() {
    return (
        <LayersControl>
            <LayersControl.BaseLayer name="Street view" checked>
                <LayerGroup>
                    <WeatherLayer />
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                </LayerGroup>
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}
export default BaseMap
