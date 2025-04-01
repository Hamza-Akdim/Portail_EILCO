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
    let icon = (
        <WiDaySunny className="text-yellow-300 drop-shadow-glow w-16 h-16 sm:w-20 sm:h-20" />
    );
    let name = "Ciel clair";
    let textColor = "text-black";

    if ([1, 2, 3].includes(code)) {
      icon = <WiCloudy className="text-gray-700 w-16 h-16 sm:w-20 sm:h-20" />;
      name = "Nuageux";
    } else if ([45, 48].includes(code)) {
      icon = <WiFog className="text-gray-700 w-16 h-16 sm:w-20 sm:h-20" />;
      name = "Brouillard";
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      icon = <WiRain className="text-gray-700 w-16 h-16 sm:w-20 sm:h-20" />;
      name = "Pluvieux";
    } else if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
      icon = <WiSnow className="text-gray-700 w-16 h-16 sm:w-20 sm:h-20" />;
      name = "Neigeux";
    } else if ([95, 96, 99].includes(code)) {
      icon = (
          <WiThunderstorm className="text-yellow-600 w-16 h-16 sm:w-20 sm:h-20" />
      );
      name = "Orage";
    }

    return { icon, name, textColor };
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
                  setError("Erreur lors de la récupération des données météo.");
                  setLoading(false);
                });
          },
          (err) => {
            console.error("Erreur de géolocalisation :", err);
            setError(err.message || "Impossible de récupérer votre position.");
            setLoading(false);
          }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-32 w-full">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <span className="ml-2">Chargement des données météo...</span>
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
        <div className="relative overflow-hidden rounded-md w-full">
          <div className="">
            <div className="flex flex-row lg:flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center flex-1 border-r border-black/10 pr-4  lg:border-r-0 lg:pr-0">
                <div className="transform transition-transform hover:scale-105">
                  {theme.icon}
                </div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${theme.textColor}`}>
                  {theme.name}
                </h2>
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${theme.textColor}`}>
                  {Math.round(temperature)}°C
                </div>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 pl-4">
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm w-full">
                  <div className="bg-white/40 rounded-lg p-2 backdrop-blur-sm">
                    <div className="font-semibold flex items-center justify-center gap-1">
                      <WiStrongWind size={20} />
                      Vitesse du vent
                    </div>
                    <div>{Math.round(windspeed)} km/h</div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <WiWindDeg size={20} />
                      Direction
                    </div>
                    <div>{Math.round(winddirection)}°</div>
                  </div>
                </div>
                <div className="mt-2 text-xs opacity-75">
                  Dernière mise à jour : {new Date(time).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="h-32 flex items-center justify-center w-full">
        Aucune donnée météo disponible.
      </div>
  );
};

export default Weather;