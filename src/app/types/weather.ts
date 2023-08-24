declare type Weather = {
  current: {
    condition: {
      icon: string,
      text: string,
    },
    temp_c: string,
    feelslike_c: string,
    humidity: string,
  },
}

export default Weather