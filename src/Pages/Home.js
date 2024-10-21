import React, { useEffect, useState } from "react";
import { getData } from "../utils/api";
import { toast } from "react-toastify";
import {useSearchParams} from "react-router-dom";
import './styles.scss'
const Home = () => {
  const [data, setData] = useState({});
  const [position, setPosition] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const [todayData,setTodayData] = useState([])
  const [nowData,setNowData] = useState({})
  const [lastFiveDayData,setLastFiveDayData] = useState([])
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);
  useEffect(() => {
    if (position) {
      getData({ lat: position.latitude, lon: position.longitude })
        .then((res) => {
          setData(res?.data);
          const today = new Date();
          const todayDateString = today.toISOString().split("T")[0];
          const todayData = res?.data?.list?.filter((entry) =>
            entry.dt_txt.startsWith(todayDateString)
          );
          setTodayData(todayData)
          setTodayData(todayData);

          const now = Math.floor(Date.now() / 1000);

          const closest = todayData.reduce((prev, curr) =>
            Math.abs(new Date(curr.dt_txt).getTime() / 1000 - now) <
            Math.abs(new Date(prev.dt_txt).getTime() / 1000 - now)
              ? curr
              : prev
          );

          setNowData(closest);
          const uniqueWeatherData = Object.values(
            res?.data?.list?.reduce((acc, entry) => {
              const dateKey = entry.dt_txt.split(" ")[0]; // Получаем дату без времени
              if (!acc[dateKey]) {
                acc[dateKey] = entry; // Сохраняем только первую запись для этой даты
              }
              return acc;
            }, {})
          );
          setLastFiveDayData(uniqueWeatherData)
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
        if(searchParams.get('city')){
            getData({q:searchParams.get('city')})
        .then((res) => {
          setData(res?.data);
          const today = new Date();
          const todayDateString = today.toISOString().split("T")[0];
          const todayData = res?.data?.list?.filter((entry) =>
            entry.dt_txt.startsWith(todayDateString)
          );
          setTodayData(todayData)
          setTodayData(todayData);

          const now = Math.floor(Date.now() / 1000);

          const closest = todayData.reduce((prev, curr) =>
            Math.abs(new Date(curr.dt_txt).getTime() / 1000 - now) <
            Math.abs(new Date(prev.dt_txt).getTime() / 1000 - now)
              ? curr
              : prev
          );

          setNowData(closest);
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
        }
    }
    
  }, [position,searchParams]);
 console.log(lastFiveDayData)
  function handleGeoSuccess(pos) {
    const { latitude, longitude } = pos.coords;
    setPosition({ latitude, longitude });
  }

  function handleGeoError(error) {
    toast.error(`Failed to retrieve location: ${error.message}`);
  }

  return <div className="main">
         <div className="today-wrapper">
         <div className="city">
          <h2 className="city-name">
            <span>{data?.city?.name}</span>
            <sup>{data?.city?.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(nowData?.main?.temp-273.15)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${nowData.weather?.[0]?.icon}@2x.png`}
              alt={nowData?.weather?.[0]?.description}
            />
            <p>{nowData?.weather?.[0]?.description}</p>
          </div>
        </div>
        <div className="today-all-data">
              {todayData.map((i)=><div key={i?.dt}><span>{Math.round(i.main.temp - 273.15)} C</span> <span>{`${new Date(i?.dt_txt).getHours()}:${new Date(i?.dt_txt).getMinutes()}:${new Date(i?.dt_txt).getSeconds()}`}</span> <img src={`https://openweathermap.org/img/wn/${i.weather?.[0]?.icon}@2x.png`}
              alt={i?.weather?.[0]?.description}/></div>)}
        </div>
         </div>
         <div className="fiveday-container">
            {lastFiveDayData.map(i=>
                 <div key={i?.dt}>
                 <span>{`${new Date(i?.dt_txt)?.getDate()}/${new Date(i?.dt_txt)?.getMonth()+1}`}</span>
                 <div><span>{Math.round(i?.main?.temp-273.15)} C</span> <img 
                       src={`https://openweathermap.org/img/wn/${i.weather?.[0]?.icon}@2x.png`}
                       alt={i?.weather?.[0]?.description}
                 /></div>
             </div>
            )}
         </div>
  </div>;
};

export default Home;
