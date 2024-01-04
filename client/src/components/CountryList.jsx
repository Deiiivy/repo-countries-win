import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../services/countryService.js';
import '../styles/countryList.css'

const CountryList = () => {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const countryData = await getAllCountries();
  
          const sanitizedData = countryData.map(country => ({
            ...country,
            continent: country.continent && country.continent ? { name: country.continent.name } : { name: 'Unknown' }
          }));
  
          setCountries(sanitizedData);
        } catch (error) {
          console.error(error);
        
        }
      };
  
      fetchData();
    }, []);
  
  return (
    <div className='container-list'>
      <h1>List of Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country.code}>
              <img src={`https://flagsapi.com/${country.code}/flat/64.png`} alt={country.name} />
            {country.name} - {country.continent.name}
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
