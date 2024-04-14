console.log('Hello from index.js')

const API_KEY = "https://api.weatherapi.com/v1/current.json?key=63e5f90a63d44af1836130142243003&q="

async function getWeather(city) {
    const uri = API_KEY + city;
    try {
        const response = await fetch(uri)

        if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        response.status(500).send(error)
    }
}

function inputHandler(){
    const input = document.getElementById('city')
    return input.value
}

async function getBtnHandler(){
    const city = inputHandler()
    const data = await getWeather(city)
    return data
}

const getBtn = document.getElementById('getBtn')
getBtn.addEventListener('click', getBtnHandler)