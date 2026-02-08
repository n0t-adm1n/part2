import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country';

function App() {
  const [country, setCountry] = useState('')
  const [countryAll, setCountryAll] = useState([]);
  const [countryAllDetail, setCountryAllDetail] = useState([])
  const [countryIndex, setCountryIndex] = useState(null)
  const [weather, setWeather] = useState(null)
 
  //api key
  const api_key = import.meta.env.VITE_WEATHER_KEY

	const filteredCountries = country === "" ? [] : countryAll.filter(con => con.cname.toLowerCase().includes(country.toLowerCase()) 
														|| con.oname.toLowerCase().includes(country.toLowerCase()))

  const handleCountryChange = (e) => {
    setCountry(e.target.value)
  }

  const handleShowCountry = (con) => {
    setCountryIndex(con.index)
  } 


  // get the initial list of countries
  useEffect(()=> {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const compactData = response.data.map((country, index) => {
          return {
            cname: country.name.common, 
            oname: country.name.official, 
            index: index
          }; 
        })
        setCountryAllDetail(response.data)  
        
        setCountryAll(compactData)
      })
  }, [])

  
useEffect(()=> {
  if(filteredCountries.length === 1) {
    setCountryIndex(filteredCountries[0].index)
  } else if(filteredCountries.length === 0 || country === ''){
    setCountryIndex(null)
  }
}, [filteredCountries, country])  

  useEffect(() => {
    if(countryIndex === null) {
      setWeather(null)  
      return;
    }

    setWeather(null)

    const lat = countryAllDetail[countryIndex].capitalInfo.latlng[0]
    const lon = countryAllDetail[countryIndex].capitalInfo.latlng[1]

    console.log(lat, lon)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
        axios.get()
      })
  }, [countryIndex])

  const displayCountry = () => {

	if(filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>
	else if(filteredCountries.length <= 10 && filteredCountries.length > 1) {
		return (
			<>
				{filteredCountries.map(con => (
				<p key={con.cname}>{con.cname} <button onClick={() => {
          handleShowCountry(con)
        }}>show</button> </p>
				))}
      </>
		)
	}
	
	
  }


  return (
    <>
      Find countries<input value={country} onChange={handleCountryChange}></input>

	  {displayCountry()}

    {countryIndex === null || weather === null ? null : <Country country={countryAllDetail[countryIndex]} weather={weather} />}
    </>
  )
}

export default App
