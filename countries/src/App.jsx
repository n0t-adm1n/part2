import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country';

function App() {
  const [country, setCountry] = useState('')
  const [countryAll, setCountryAll] = useState([]);
  const [countryAllDetail, setCountryAllDetail] = useState([])

	const filteredCountries = country === "" ? [] : countryAll.filter(con => con.cname.toLowerCase().includes(country.toLowerCase()) 
														|| con.oname.toLowerCase().includes(country.toLowerCase()))

  const handleCountryChange = (e) => {
    setCountry(e.target.value)
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

  const getMessage = () => {
	if(!displayMessage) return null

	return (
		<p>Too many matches, specify another filter</p>
	)
  }

  const displayCountryList = () => {
	if(countryList.length == 0) return null

	return (
		countryList.map(con => <li key={con.index}>{con.cname}</li>)
	)
	
  }

  const displayCountry = () => {

	if(filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>
	else if(filteredCountries.length <= 10 && filteredCountries.length > 1) {
		return (
			<ul>
				{filteredCountries.map(con => (
				<li key={con.cname}>{con.cname}</li>
				))}
          	</ul>
		)
	}
	else if(filteredCountries.length === 1){
    let con = countryAll.filter(c => c.index === filteredCountries[0].index)
		return <Country country={countryAllDetail[con[0].index]}/>
	}
	
  }


  return (
    <>
      Find countries<input value={country} onChange={handleCountryChange}></input>

	  {displayCountry()}
    </>
  )
}

export default App
