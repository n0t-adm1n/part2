import React from 'react'

const Country = ({country}) => {
    console.log(country)
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
    </>
  )
}

export default Country