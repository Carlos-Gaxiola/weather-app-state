import React from 'react'
import { render } from '@testing-library/react'
import ForecastItem from './ForecastItem'

test('ForecastItem render', async () => {
    //Tarea, se deben renderizar los diferentes textos

    const { findByText } = render(<ForecastItem weekDay="Viernes" hour={10} state="clear" temperature={15}/>)

    const weekDay = await findByText(/Viernes/)
    const hour = await findByText(/10/)
    const temperature = await findByText(/15/)

    expect(weekDay).toHaveTextContent("Viernes")
    expect(hour).toHaveTextContent("10")
    expect(temperature).toHaveTextContent("15")

})