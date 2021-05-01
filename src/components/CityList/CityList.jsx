import React from 'react'
import PropTypes from 'prop-types'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import useCityList from './../../hooks/useCityList'
import CityInfo from './../CityInfo'
import Weather from './../Weather'
import { getCityCode } from './../../utils/utils'

// li: es un item de una lista en html
// renderCityAndCountry se va a convertir en una función que retorna otra función
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const { city, countryCode, country } = cityAndCountry
    //const { temperature, state } = weather
    return (
        <ListItem
            button
            key={getCityCode(city, countryCode)}
            onClick={() => eventOnClickCity(city, countryCode)}>
            <Grid container
                justify="center"
                alignItems="center"
            >
                <Grid item
                    md={9}
                    xs={12}>
                    <CityInfo city={city} country={country} />
                </Grid>
                <Grid item
                    md={3}
                    xs={12}>
                    <Weather
                        temperature={weather && weather.temperature}
                        state={weather && weather.state} />
                </Grid>
            </Grid>
        </ListItem>
    )
}


// cities: es un array, y en cada uno de los items tiene que tener la ciudad, pero tambien el country
// ul: tag html para listas no ordenadas
const CityList = ({ cities, onClickCity, actions, data }) => {
    const { allWeather } = data
    const { onSetAllWeather } = actions
    
    const { error, setError } = useCityList(cities, allWeather, onSetAllWeather)
    return (
        <div>
            {
                error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            }
            <List>
                {
                    cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)]))
                }
            </List>
        </div>
    )
}

//¿Cómo podemos mejorar esta validación?
CityList.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape({
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired
    })).isRequired,
    onClickCity: PropTypes.func.isRequired
}

export default CityList
