async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const API = 'http://localhost:3003/api/weather'

  const weatherWidget = document.querySelector('#weatherWidget')
  const citySelector = document.querySelector('#citySelect')
  const userFeedback = document.querySelector('.info')
  const todayTemp = document.querySelector('#apparentTemp').lastElementChild
  const todayDescription = document.querySelector('#todayDescription')
  const todayMinMax = document.querySelector('#todayStats div:first-child')
  const todayPrecip = document.querySelector('#todayStats div:nth-child(2)')
  const todayHumidity = document.querySelector('#todayStats div:nth-child(3)')
  const todayWind = document.querySelector('#todayStats div:last-child')
  const nextDayCards = document.querySelectorAll('.next-day')
  const locationCity = document.querySelector('#location div:first-child')
  const locationCountry = document.querySelector('#location div:last-child')
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  weatherWidget.style.display = 'none' // widget is hidden upon initial page load

  citySelector.addEventListener('change', e => {
    disableWeatherWidget()
    axios.get(getWeatherDataURLfor(e.target.value))
    .then(res => {
      updateWeatherWidgetWith(res.data)
      disableWeatherWidget(false)
    })
    .catch(err => {
      console.log(err.message)
    })
  })

  function disableWeatherWidget(disabled = true) {
    weatherWidget.style.display = disabled ? 'none' : 'block'
    citySelector.disabled = disabled
    userFeedback.textContent = disabled ? 'Fetching weather data...' : ''
  }

  function updateWeatherWidgetWith({current, forecast, location}) {
    updateTodayWith(current)
    nextDayCards.forEach((card, idx) => updateDailyForecast(card, forecast.daily[idx]))
    locationCity.textContent = location.city
    locationCountry.textContent = location.country
  }

  function updateTodayWith ({
    weather_description: desc,
    apparent_temperature: temp,
    temperature_min: min,
    temperature_max: max,
    precipitation_probability: precip,
    humidity,
    wind_speed: wind
  }) {
    todayTemp.textContent = `${temp}°`
    todayDescription.textContent = `${getEmojiFor(desc)}`
    todayMinMax.textContent = `${min}°/${max}°`
    todayPrecip.textContent = `Precipitation: ${precip * 100}%`
    todayHumidity.textContent = `Humidity: ${humidity}%`
    todayWind.textContent = `Wind: ${wind}m/s`
  }

  // this function can be used for each of the 3 forecast days
  function updateDailyForecast (card, {
    date,
    weather_description: desc,
    temperature_min: min,
    temperature_max: max,
    precipitation_probability: precip
  }) {
    card.querySelector('div:first-child').textContent = daysOfWeek[new Date(date).getDay()]
    card.querySelector('div:nth-child(2)').textContent = `${getEmojiFor(desc)}`
    card.querySelector('div:nth-child(3)').textContent = `${min}°/${max}°`
    card.querySelector('div:last-child').textContent = `Precipitation: ${precip * 100}%`
  }

  function getWeatherDataURLfor(city) {
    city = city.replace(' ', '+')
    return `${API}?city=${city}`
  }

  function getEmojiFor(description) {
    return (descriptions.find(d => d[0] === description))[1]
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
