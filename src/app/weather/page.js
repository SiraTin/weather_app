// 'use client'

// import React, { useEffect, useState } from 'react'
// import MapContent from '../components/MapContent'
// import { useSearchParams } from 'next/navigation';
// import 'leaflet/dist/leaflet.css';
// import axios from 'axios';


// export default function page() {
//   const searchParams = useSearchParams();
//   const province = searchParams.get('province');
//   const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     if (!province) return;
//     console.log('Fetching weather data for:', province);

//     axios.get(`/api/weather?province=${encodeURIComponent(province)}`)
//       .then(response => {
//         console.log('PI Response:', response.data);
//         setWeatherData(response.data);
//       })
//       .catch(error => console.error('Error fetching weather data:', error));
//   }, [province]);

//   let cond;
//   let detailCond = '';

//   if (weatherData !== '') {
//     cond = weatherData?.WeatherForecasts[0].forecasts[0].data.cond;
//     console.log(weatherData?.WeatherForecasts[0].forecasts[0].data.cond);
//   }

//   switch (cond) {
//     case 1:
//       detailCond = 'ท้องฟ้าแจ่มใส';
//       break;
//     case 2:
//       detailCond = 'มีเมฆบางส่วน';
//       break;

//     case 3:
//       detailCond = 'เมฆเป็นส่วนมาก';
//       break;

//     case 4:
//       detailCond = 'มีเมฆมาก';
//       break;

//     case 5:
//       detailCond = 'ฝนตกเล็กน้อย';
//       break;

//     case 6:
//       detailCond = 'ฝนปานกลาง';
//       break;

//     case 7:
//       detailCond = 'ฝนตกหนัก';
//       break;

//     case 8:
//       detailCond = 'ฝนฟ้าคะนอง';
//       break;

//     case 9:
//       detailCond = 'อากาศหนาวจัด';
//       break;

//     case 10:
//       detailCond = 'อากาศหนาว';
//       break;

//     case 11:
//       detailCond = 'อากาศเย็น';
//       break;

//     case 12:
//       detailCond = 'อากาศร้อนจัด';
//       break;

//   }

//   let elem = weatherData?.WeatherForecasts[0].forecasts;

//   // for(let i = 0; i< elem.length; i++){
//   //   console.log(elem[i]);
//   // }

//   // console.log(elem?.map(item => item.data.tc));

//   //day
//   function formatDateIntl(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("th-TH", {
//       weekday: "long",
//     });
//   }
//   //month
//   function formatMonthIntl(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("th-TH", {
//       month: "short",
//     });
//   }



//   console.log(weatherData?.WeatherForecasts[0]?.forecasts?.data?.tc);


//   return (
//     <div className='w-full min-h-screen '>
//       <div className='w-[90%] py-24 md:w-[100%] mx-auto flex flex-col md:pl-10 xl:px-20 md:flex-row md:justify-between gap-10'>
//         <div className='w-full md:w-9/12 flex flex-col justify-center md:flex md:justify-between gap-5 md:gap-10 '>
//           <div className='flex flex-col md:flex-row justify-between gap-5 md:gap-10'>
//             <div className='w-full md:w-6/12 h-96 rounded-[25px] bg-gray-400 bg-[url("/images/cloudy_2.png")] bg-no-repeat bg-center bg-cover'>
//               {weatherData ? (
//                 <div className='p-6'>
//                   <p className='text-5xl font-prompt text-black font-bold'>จังหวัด{weatherData?.WeatherForecasts[0].location.name}</p>
//                   <p className='text-4xl py-2 font-prompt text-black'>อุณหภูมิ: {Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc)}°C</p>

//                   <p className='text-2xl font-prompt text-black'>{detailCond}</p>
//                   <div className='flex gap-5 pt-5'>
//                     <div className='w-4/12 h-36 bg-slate-900 rounded-[25px] flex flex-col justify-center text-center'>
//                       <p className='font-prompt text-xl text-white'>อุณหภูมิเฉลี่ย</p>
//                       <p className='font-prompt text-white pt-2'>สูงสุด: {Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc_max)} °C</p>
//                       <div className='w-8/12 mx-auto my-2 h-1 bg-white rounded'></div>
//                       <p className='font-prompt text-white'>ต่ำสุด: {Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.tc_min)} °C</p>
//                     </div>
//                     <div className='w-4/12 h-36 bg-[#CBE16A] rounded-[25px] flex flex-col justify-center text-center'>
//                       <p className='text-xl font-prompt'>ความเร็วลม</p>
//                       <p className='text-2xl font-prompt font-bold'>{Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.ws10m)} m/s</p>
//                     </div>
//                     <div className='w-4/12 h-36 bg-white rounded-[25px] flex flex-col justify-center text-center'>
//                       <p className='text-xl font-prompt text-black '>ค่าความชื้น</p>
//                       <p className='text-4xl font-prompt text-black font-bold'>{Math.round(weatherData?.WeatherForecasts[0].forecasts[0].data.rh)}%</p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p>กำลังโหลดข้อมูล...</p>
//               )}
//             </div>
//             <div className='w-full md:w-6/12 h-96 overflow-x-scroll rounded-[25px] bg-[url("/images/cloud.png")] bg-no-repeat bg-center bg-cover'>
//               {weatherData ? (
//                 <div className='flex flex-col w-full h-full p-5'>
//                   <p className='text-3xl py-5 font-prompt font-medium'>พยากรณ์สภาพอากาศ 7 วัน</p>
//                   <div className='flex justify-center  gap-5 w-[300%]'>
//                     {elem?.map((item, index) => {
//                       return (
//                         <div key={index} className='text-center w-4/12 p-5 h-full bg-[rgba(255,255,255,0.75)] rounded-xl'>
//                           <p className='font-prompt text-black text-xl'>{formatDateIntl(item.time.slice(0, 10))}</p>
//                           <p className='font-prompt text-black text-xl'>{item.time.slice(8, 10)} {formatMonthIntl(item.time.slice(5, 7))}</p>
//                           <img src='/images/sun.png' className='w-16 mx-auto'/>
//                           <p className='font-prompt text-black pt-2 text-xl'>อุณหภูมิ</p>
//                           <p className='font-prompt text-black py-3 text-xl'>{Math.round(item.data.tc_max)}° / {Math.round(item.data.tc_min)}°</p>             
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </div>
//               ) : (
//                 <p>กำลังโหลดข้อมูล...</p>
//               )}
//             </div>
//           </div>

//           <div className='w-full h-96 rounded-[25px]'>
//           <h3 className='font-prompt p-4 text-2xl'>ข้อมูลพยากรณ์อากาศแผนที่ประเทศไทย (ข้อมูลจาก: กรมอุตุนิยมวิทยา)</h3>
//             <MapContent />
//           </div>
//         </div>
//         <div className='w-full md:w-3/12 min-h-screen bg-slate-300 rounded-[25px]'>

//         </div>
//       </div>

//     </div>
//   )
// }