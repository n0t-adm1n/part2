import React from 'react'

const Country = ({country, weather}) => {
    console.log(weather.weather[0].icon)
    const languages = [];
    for(const lang in country.languages) {
        
        languages.push(country.languages[lang])
    }

    console.log(languages)
  return (
    <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>

        <h2>Languages</h2>
        <ul>
            {   languages.map((lang, index) => <li key={index}>{lang}</li>) }
        </ul>

        <img src={country.flags.png} />
        
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {weather.main.temp} celius</p>
        <img src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Country