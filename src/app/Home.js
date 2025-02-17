'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

//ใช้ Dynamic Import เพื่อป้องกัน `window is not defined`
const MapContent = dynamic(() => import('./components/MapContent'), { ssr: false });

export default function Home() {
  const searchParams = useSearchParams();
  const province = searchParams.get('province') || 'กรุงเทพมหานคร'; //ป้องกันค่า null
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!province) return; //ป้องกัน province เป็น null

    console.log('Fetching weather data for:', province);
    
    axios.get(`/api/weather?province=${encodeURIComponent(province)}`)
      .then(response => {
        console.log('API Response:', response.data);
        setWeatherData(response.data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, [province]);

  let cond;
  let detailCond = '';

  if (weatherData) {
    cond = weatherData?.daily?.WeatherForecasts[0]?.forecasts[0]?.data?.cond;
  }
  
  switch (cond) {
    case 1: detailCond = 'ท้องฟ้าแจ่มใส'; break;
    case 2: detailCond = 'มีเมฆบางส่วน'; break;
    case 3: detailCond = 'เมฆเป็นส่วนมาก'; break;
    case 4: detailCond = 'มีเมฆมาก'; break;
    case 5: detailCond = 'ฝนตกเล็กน้อย'; break;
    case 6: detailCond = 'ฝนปานกลาง'; break;
    case 7: detailCond = 'ฝนตกหนัก'; break;
    case 8: detailCond = 'ฝนฟ้าคะนอง'; break;
    case 9: detailCond = 'อากาศหนาวจัด'; break;
    case 10: detailCond = 'อากาศหนาว'; break;
    case 11: detailCond = 'อากาศเย็น'; break;
    case 12: detailCond = 'อากาศร้อนจัด'; break;
  }

  let elemDay = weatherData?.daily?.WeatherForecasts[0]?.forecasts;
  let elemHour = weatherData?.hourly?.WeatherForecasts[0]?.forecasts;

  function formatDateIntl(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", { weekday: "long" });
  }

  function formatMonthIntl(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", { month: "short" });
  }
  
  return (
    <div className='w-full min-h-screen'>
      <div className='w-[90%] py-24  mx-auto flex flex-col md:w-[100%] md:px-10 md:justify-between xl:px-20 2xl:flex-row gap-10'>
        <div className='w-full 2xl:w-9/12 flex flex-col justify-center xl:flex xl:justify-between gap-5 xl:gap-10'>
          <div className='flex flex-col xl:flex-row justify-between gap-5 md:gap-10'>
            <div className='w-full xl:w-full overflow-x-scroll 2xl:w-6/12 h-96 rounded-[25px] bg-[url("/images/cloudy_2.png")] bg-no-repeat bg-center bg-cover'>
              {weatherData ? (
                <div className='p-6'>
                  <p className='text-4xl xl:text-5xl font-prompt text-black font-bold'>จังหวัด{weatherData?.daily?.WeatherForecasts[0]?.location?.name}</p>
                  <p className='text-3xl xl:text-4xl py-2 font-prompt text-black'>อุณหภูมิ {Math.round(weatherData?.daily?.WeatherForecasts[0]?.forecasts[0]?.data?.tc)}°C</p>
                    <p className='xxl:text-2xl font-prompt text-black'>{detailCond}</p>
                  
                  <div className='flex flex-col md:flex-row gap-5 pt-5'>
                    <div className='md:w-4/12 h-36 bg-slate-900 rounded-[25px] flex flex-col justify-center text-center'>
                      <p className='text-sm xl:text-xl font-prompt  text-white'>อุณหภูมิ</p>
                      <p className='text-sm xl:text-xl font-prompt text-white pt-2'>สูงสุด: {Math.round(weatherData?.daily?.WeatherForecasts[0].forecasts[0].data?.tc_max)} °C</p>
                      <div className='w-8/12 mx-auto my-2 h-1 bg-white rounded'></div>
                      <p className='text-sm xl:text-xl font-prompt text-white'>ต่ำสุด: {Math.round(weatherData?.daily?.WeatherForecasts[0].forecasts[0].data?.tc_min)} °C</p>
                    </div>
                    <div className='md:w-4/12 h-36 bg-[#CBE16A] rounded-[25px] flex flex-col justify-center text-center'>
                      <p className='text-xl font-prompt'>ความเร็วลม</p>
                      <p className='text-2xl font-prompt font-bold'>{Math.round(weatherData?.daily?.WeatherForecasts[0].forecasts[0].data?.ws10m)} m/s</p>
                    </div>
                    <div className='md:w-4/12 h-36 bg-white rounded-[25px] flex flex-col justify-center text-center'>
                      <p className='text-xl font-prompt text-black '>ค่าความชื้น</p>
                      <p className='text-4xl font-prompt text-black font-bold'>{Math.round(weatherData?.daily?.WeatherForecasts[0].forecasts[0].data?.rh)}%</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>กำลังโหลดข้อมูล...</p>
              )}
            </div>
            <div className='w-full xl:w-6/12 h-96 overflow-x-scroll rounded-[25px] bg-[url("/images/cloud.png")] bg-no-repeat bg-center bg-cover'>
              {weatherData ? (
                <div className='flex flex-col w-full h-full p-5'>
                  <p className='text-2xl xxl:text-5xl py-5 font-prompt font-medium'>พยากรณ์สภาพอากาศ 7 วัน</p>
                  <div className='flex justify-center gap-5 w-[300%]'>
                    {elemDay?.map((item, index) => (
                      <div key={index} className='text-center w-4/12 p-5  h-full bg-[rgba(255,255,255,0.75)] rounded-xl'>
                        <p className='font-prompt text-sm text-black xxl:text-xl'>{formatDateIntl(item.time.slice(0, 10))}</p>
                        <p className='font-prompt text-sm text-black xxl:text-xl'>{item.time.slice(8, 10)} {formatMonthIntl(item.time.slice(5, 7))}</p>
                        <img src='/images/sun.png' className='w-10 xxl:w-16 mx-auto'/>
                        <p className='font-prompt text-sm text-black pt-2 xxl:text-xl'>อุณหภูมิ</p>
                        <p className='font-prompt text-sm text-black py-3 x xl:text-xl'>{Math.round(item.data.tc_max)}° / {Math.round(item.data.tc_min)}°</p>             
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>
          <div className='w-full h-96 rounded-[25px] mb-14 relative z-0'>
            <h3 className='font-prompt p-4 text-2xl'>ข้อมูลพยากรณ์อากาศแผนที่ประเทศไทย (ข้อมูลจาก: กรมอุตุนิยมวิทยา)</h3>
            <MapContent />
          </div>
        </div>
        <div className='w-full h-96 overflow-y-scroll py-5 mt-20 rounded-[25px] 2xl:w-3/12 2xl:min-h-screen bg-blue-900 2xl:mt-0'>
              <h2 className='text-center text-white text-xl py-4 font-prompt'>พยากรณ์สภาพอากาศรายชั่วโมง<br/>(24 ชั่วโมง)</h2>
              {elemHour?.map((item, index) => (
                <div key={index} className='flex mx-5 justify-between text-center p-2 items-center'>
                    
                    {(item.time.slice(11, 13) <= 5 || item.time.slice(11, 13) >= 19) ? <img src='/images/moon.png' className='w-6'/> : <img src='/images/day.png' className='w-8'/>}
                  <p className='text-lg py-2 font-prompt text-white'>{item.time.slice(11, 16)} น.</p>
                  <p className='text-lg font-prompt text-white'>{Math.round(item.data.tc)}°</p>
                </div>
              ))}
        
        </div>
      </div>
    </div>
  )
}
