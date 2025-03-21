let cityInput=document.getElementById('cityInput');
let img=document.getElementById('img')

async function getWeather(){
    if(cityInput.value==""){alert('Input is empty');return}
    try{
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=e4fd5e2f44964a7e62097cc923266c3e`)
        let parse=await data.json()
        displayvalues(parse)
    }
    catch(error){
        console.log(error)
    }
}
async function displayvalues(n){
    try{
        let utc=n['dt']
        let local=new Date(utc*1000)
        let convert=n['main'].temp
        if (Math.round(convert-273.15) < 25) {img.src = "raining.png";} 
        else if (Math.round(convert-273.15) >= 30 && Math.round(convert-273.15)) {img.src = "cloudy.png";}
         else {img.src = "https://openweathermap.org/img/wn/01d.png";}
        document.querySelector('.location').textContent=n['name'];
        document.querySelector('.day').textContent=local
        document.querySelector('.temp').textContent=Math.round(convert-273.15) +`°C`
        document.querySelector('.condi').textContent=n['weather'][0]['main']
    }
    catch(error){
        console.log(error)
        alert('Could not fetch the details');
    }
}

