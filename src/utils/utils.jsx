import ConvertUnits from 'convert-units'

export const getCityCode = (city, countryCode) => `${city}-${countryCode}`

export const toCelsius = (temp) => Number(ConvertUnits(temp).from('K').to('C').toFixed(0))