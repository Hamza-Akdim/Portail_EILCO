import React, { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiStrongWind,
  WiWindDeg,
} from "react-icons/wi";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeatherTheme = (code) => {
    if (code === 0) {
      return {
        bgClass:
          "bg-gradient-to-br from-yellow-400 to-blue-400 " +
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)] " +
          "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.3)_0%,rgba(255,215,0,0)_60%)]",
        icon: (
          <WiDaySunny className="text-yellow-300 drop-shadow-glow w-16 h-16 sm:w-20 sm:h-20" />
        ),
        textColor: "text-white",
        name: "Clear Sky",
      };
    } else if ([1, 2, 3].includes(code)) {
      return {
        bgClass:
          "bg-gradient-to-br from-gray-300 to-gray-500 " +
          "before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_60%)]",
        icon: <WiCloudy className="text-white w-16 h-16 sm:w-20 sm:h-20" />,
        textColor: "text-white",
        name: "Cloudy",
      };
    } else if ([45, 48].includes(code)) {
      return {
        bgClass:
          "bg-gradient-to-br from-gray-400 to-gray-600 " +
          "before:absolute before:inset-0 before:bg-[linear-gradient(0deg,rgba(255,255,255,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.1)_2px,transparent_2px)] " +
          "before:bg-[length:50px_50px]",
        icon: <WiFog className="text-gray-200 w-16 h-16 sm:w-20 sm:h-20" />,
        textColor: "text-white",
        name: "Foggy",
      };
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      return {
        bgClass: "bg-gradient-to-b from-blue-400 to-blue-600",
        icon: <WiRain className="text-white w-16 h-16 sm:w-20 sm:h-20" />,
        textColor: "text-white",
        name: "Rainy",
      };
    } else if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
      return {
        bgClass:
          "bg-gradient-to-br from-blue-100 to-blue-300 " +
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_2px_at_50%_50%,rgba(255,255,255,0.8),transparent)] " +
          "before:bg-[length:20px_20px]",
        icon: <WiSnow className="text-white w-16 h-16 sm:w-20 sm:h-20" />,
        textColor: "text-gray-800",
        name: "Snowy",
      };
    } else if ([95, 96, 99].includes(code)) {
      return {
        bgClass:
          "bg-gradient-to-br from-gray-800 to-gray-900 " +
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,0,0.1)_0%,transparent_60%)] " +
          "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_100%,rgba(128,0,128,0.2)_0%,transparent_60%)]",
        icon: (
          <WiThunderstorm className="text-yellow-300 w-16 h-16 sm:w-20 sm:h-20" />
        ),
        textColor: "text-white",
        name: "Thunderstorm",
      };
    }
    return {
      bgClass: "bg-gradient-to-br from-blue-100 to-blue-200",
      icon: (
        <WiDaySunny className="text-yellow-500 w-16 h-16 sm:w-20 sm:h-20" />
      ),
      textColor: "text-gray-800",
      name: "Clear",
    };
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          )
            .then((res) => res.json())
            .then((data) => {
              setWeatherData(data);
              setLoading(false);
            })
            .catch(() => {
              setError("Error fetching weather data.");
              setLoading(false);
            });
        },
        (err) => {
          console.error("Erreur de géolocalisation :", err);
          setError(err.message || "Unable to retrieve your location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 w-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading weather data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4 w-full h-32 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (weatherData?.current_weather) {
    const { temperature, windspeed, winddirection, weathercode, time } =
      weatherData.current_weather;
    const theme = getWeatherTheme(weathercode);

    return (
      <div
        className={`relative  overflow-hidden rounded-md ${theme.bgClass} w-full`}
      >
        <div className="w-full !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! bg-white/10 backdrop-blur-md rounded-md shadow-2xl p-2 sm:p-4">
          <div className="flex flex-row lg:flex-col items-center justify-center">
            {/* Left column: icon and temperature */}
            <div className="flex flex-col items-center justify-center flex-1 border-r border-white/20 pr-2">
              <div className="transform transition-transform hover:scale-105 animate-float">
                {theme.icon}
              </div>
              <h2
                className={`text-xl sm:text-2xl font-bold mb-1 ${theme.textColor}`}
              >
                {theme.name}
              </h2>
              <div
                className={`text-2xl sm:text-3xl font-bold mb-2 ${theme.textColor}`}
              >
                {Math.round(temperature)}°C
              </div>
            </div>
            {/* Right column: additional information */}
            <div className="flex flex-col items-center justify-center flex-1 pl-2">
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm w-full">
                <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                  <div className="font-semibold flex items-center justify-center gap-1">
                    <WiStrongWind size={20} />
                    Wind Speed
                  </div>
                  <div>{Math.round(windspeed)} km/h</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <WiWindDeg size={20} />
                    Direction
                  </div>
                  <div>{Math.round(winddirection)}°</div>
                </div>
              </div>
              <div className="mt-2 text-xs opacity-75">
                Last updated: {new Date(time).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-32 flex items-center justify-center w-full">
      No weather data available.
    </div>
  );
};

export default Weather;
