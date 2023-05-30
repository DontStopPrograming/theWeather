import './App.css'
import React, {useState} from 'react'
import { LoadingButton } from '@mui/lab'
import { Container, Typography, Box, TextField } from '@mui/material'

import WeatherDisplay from './WeatherDisplay'

export default function App({ apiKey }) {
  const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error: false,
    message: '',
  })

  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temp: '',
    condition: '',
    icon: '',
    conditionText: '',
  })

  const onSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    setError({
      error: false,
      message: '',
    })
    try{
      if(!city.trim()) throw { message:'No hay ciudad, llenar campo obligatorio'}
      
      const response = await fetch(`${API_WEATHER}${city}`)
      const data = await response.json()

      if(data.error) throw { message: data.error.message}
      
        setWeather({
          city: data.location.name,
          country: data.location.country,
          temp: data.current.temp_c,
          condition: data.current.condition.code,
          icon: data.current.condition.icon,
          conditionText: data.current.condition.text,
        })

      
    } catch(error) {
        setError({
          error: true,
          message: error.message,
        })
      } finally {
        setLoading(false)
      }
  }

  return (
    <>
      <Container
        maxWidth = 'xs'
        sx = {{mt: 2}}
      >
        <Typography
          variant = 'h3'
          component = 'h1'
          align = 'center'
          gutterBottom
        > WEATHER
        </Typography>
        <Box
          sx = {{display: 'grid', gap: 2}}
          component = 'form'
          autoComplete = 'off'
          onSubmit = {onSubmit}
        >

          <TextField
            id = 'city'
            label = 'Ciudad'
            variant = 'outlined'
            sise = 'small'
            required
            fullWidth
            value = {city}
            onChange = {(e) => 
              setCity(e.target.value)
            }
            error = {error.error}
            helperText = {error.message}
          />

          <LoadingButton 
            type = 'submit'
            variant = 'contained'
            loading = {loading}
            loadingIndicator = 'Cargando...'
          >
            Buscar
          </LoadingButton>  
        </Box>

        {weather.city && <WeatherDisplay weather= { weather} /> }

        <Typography
          textAlign = 'center'
          sx = {{ mt:2, fontSize: '10px'}}
        >

        Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a>
        </Typography>
      </Container>
      
</>
  )
}
