import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './App.jsx'

const onReserveFlight = (flight) => console.log(flight)
const onAvailableFlights = (availableFlights) => console.log(availableFlights)

const getSuggestionsFromServer = (callback) => console.log(callback)

ReactDOM.createRoot(document.getElementById('root')).render(

    <Form
        onReserveFlight ={onReserveFlight}
        onAvailableFlights = {onAvailableFlights}
        getSuggestionsFromServer = {getSuggestionsFromServer} // функция не работает
    />

)
