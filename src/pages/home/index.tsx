import { useEffect, useState } from "react";
import { http } from "../../services";
import { MiniModal } from "../../components/modal";
import { FaSearch } from "react-icons/fa";

interface WeatherItem {
  main: string;
  description: string;
  icon: string;
}

interface MainData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface WindData {
  speed: number;
}

interface WeatherResponse {
  weather: WeatherItem[];
  main: MainData;
  wind: WindData;
  name: string;
}

export const HomePage = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const API_KEY = "3b48b5e6fcd43b0ffc1ccc0849754763";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await http.get(
          `/weather?q=${
            localStorage.getItem("city")
              ? localStorage.getItem("city")
              : "Tashkent"
          }&appid=${API_KEY}&units=metric`
        );
        setWeatherData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error", err);
      }
    };
    fetchWeather();
  }, [refresh]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };

  const handleSubmit = () => {
    setRefresh((prev) => !prev);
    console.log(searchedValue);
    setSearchedValue("");
    localStorage.setItem("city", searchedValue);
  };

  const getBackgroundClass = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "from-blue-400 via-blue-500 to-blue-600";
      case "clouds":
        return "from-gray-400 via-gray-500 to-gray-600";
      case "rain":
        return "from-gray-600 via-blue-600 to-blue-700";
      case "snow":
        return "from-blue-200 via-blue-300 to-blue-400";
      default:
        return "from-blue-400 via-blue-500 to-blue-600";
    }
  };

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="flex items-center gap-4 text-white">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-xl font-medium">
              Ob-havo ma'lumotlari yuklanmoqda...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const weather = weatherData.weather[0];

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 border-b border-blue-700 shadow-sm">
        <div className="flex items-center w-[80%] sm:w-[94%] gap-4 px-4 py-2 border border-blue-300 rounded-lg bg-white">
          <input
            className="w-full text-gray-900 placeholder-gray-500 focus:outline-none"
            type="text"
            value={searchedValue}
            onChange={handleChange}
            placeholder="Search your country..."
          />

          <button
            onClick={handleSubmit}
            className="p-3 cursor-pointer bg-blue-500 text-white font-medium rounded-full hover:bg-blue-400 transition-colors flex items-center gap-2"
          >
            <FaSearch size={16} color="white" />
          </button>
        </div>

        <MiniModal title1="Light" title2="Dark" title3="Settings" />
      </nav>

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-200 to-blue-400 p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-md w-full">
          <div
            className={`relative bg-gradient-to-br ${getBackgroundClass(
              weather.main
            )} rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl`}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

            <div className="relative p-8 text-white">
              <div className="text-center mb-8 animate-fade-in">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <h1 className="text-3xl font-bold tracking-wide">
                    {weatherData.name}
                  </h1>
                </div>
                <p className="text-white/80 text-sm font-medium">
                  {new Date().toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="relative">
                  <div className="relative w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce-slow">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                      alt={weather.description}
                      className="w-16 h-16 filter drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative">
                    <p className="text-6xl font-bold mb-1 animate-slide-up">
                      {Math.round(weatherData.main.temp)}°
                    </p>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping" />
                  </div>
                  <p className="text-white/80 text-lg mb-2 animate-slide-up-delay">
                    Feels like {Math.round(weatherData.main.feels_like)}°C
                  </p>
                  <p className="capitalize text-white font-medium text-lg tracking-wide animate-fade-in-delay">
                    {weather.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "💧",
                    label: "Humidity",
                    value: `${weatherData.main.humidity}%`,
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    icon: "📊",
                    label: "Pressure",
                    value: `${weatherData.main.pressure} hPa`,
                    color: "from-green-400 to-green-600",
                  },
                  {
                    icon: "🌬️",
                    label: "Wind Speed",
                    value: `${weatherData.wind.speed} m/s`,
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    icon: "🌡️",
                    label: "Condition",
                    value: weather.main,
                    color: "from-orange-400 to-orange-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/25 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-lg shadow-lg`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white/70 text-xs font-medium uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-white font-bold text-lg">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
