'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Marker, Tooltip } from 'react-leaflet';

import L from 'leaflet';

const WeatherLayer = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        //code
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // ตรวจสอบก่อนว่า Timer ถูกเริ่มไปแล้วหรือยัง
            if (typeof console.timeEnd === 'function') {
                console.timeEnd('API Load Time'); // ปิด Timer ก่อนเริ่มใหม่ (ป้องกัน Error)
            }
            
            console.time('API Load Time'); // เริ่มจับเวลา
            const res = await axios.get('/api/proxy');
            console.timeEnd('API Load Time'); // แสดงเวลาที่ใช้โหลด API
            
            setData(res.data);
        } catch (err) {
            console.error('Error loading data:', err);
        }
    };


    const labelIcon = (temp) => {
        let iconColor = 'map-label-content';
        if(temp > 40){
            iconColor += ' red';
        }else if(temp > 30){
            iconColor += ' orange';
        }else if(temp > 25){
            iconColor += ' yellow';
        }

        return new L.divIcon({
            className: 'map-label',
            html:`<div class='map-label '><div class='map-label ${iconColor}'>${temp}</div></div>`
        });
    }

    console.log(data)


    return (
        <div>
            {data?.Stations?.Station?.map((item, index) => {
                console.log(item.Latitude);
            return <Marker key={item.WmoStationNumber} position={[item.Latitude, item.Longitude]} icon={labelIcon(item.Observation.Temperature)}>
                <Tooltip key={`tooltip-${item.WmoStationNumber}`} >
                    <p>Temperature: {item.Observation.Temperature}</p>
                    <p>City: {item.StationNameThai}</p>
                    {Object.entries(item.Observation).map(([key, value]) => {
                        if(typeof value === 'object'){
                            return null
                        }else{
                            return <div key={`obs-${item.WmoStationNumber}-${key}`}>
                                <b>{key}</b> : {value}
                            </div>
                        }
                    })}
                </Tooltip>
            </Marker>
            })

            }
        </div>
    )
}

export default WeatherLayer