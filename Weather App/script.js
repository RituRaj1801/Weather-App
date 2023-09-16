// replace this with your api key
let apiKey="Your Api Key";




//here this function is used to convert the millisecond to hour minute and second
//it accept an argument that is the data return by api 

function date(milisecond) {
  const date = new Date(milisecond);
 
  const hours = date.getHours();
  const hours1 = hours < 12 ? hours : hours - 12;
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  return `${hours1}:${minutes}:${second}`;
}

//this detailsVariable dynamically create the html tags, div that will show the data 
let degree = `<sup>o</sup>`;
let detailsVariable = `<p>humidity :    <span id="humidity"></p>
          <p>max_temp :  <span id="max_temp"></span></p>
          <p>min_temp :  <span id="min_temp"></span></p>
          <p>sunrise :  <span id="sunrise"></span></p>
          <p>sunset :  <span id="sunset"></span></p>
          <p>temp :  <span id="temp"></span></p>
          <p>wind_degrees :  <span id="wind_degrees"></span></p>
          <p>wind_speed:  <span id="wind_speed"></span></p>`;

//this function simpliy calling the api to fetch the data/
//it accept an argument name city which will replace the city in url to search the place          
weather = async (city) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  try {
    const getHead = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${apiKey}`,  //you can also replace your api key here
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    var response = await fetch(url, getHead);  //this creturn the promise thats is weather the api succesfully fetch the data or not
    const result = await response.json();      //this is converting the html file that is send by the api to json or say object so we can see the actual  data or info that we can display on window
    console.log(response);    
    console.log(result);       //here we can see the json format to pick up the data
    if (400==response.status) {          //just trying to see weather the response is collect or not
      if (!city == "") alert(`${city} is invalid name/city`);
      else alert(`Pease enter a city name`);
    } 
    else if(response.status==403){
      alert(result.message+"please use a proper API-KEY")
    }
    else {               //if response is succesful the we are collecting the data and displaying it 
      document.getElementById("theCityName").innerHTML = city.toUpperCase();
      document.getElementById("theCityDetails").innerHTML = detailsVariable;
      document.getElementById("max_temp").innerHTML = `${result.max_temp}°C`;
      document.getElementById("humidity").innerHTML = `${result.humidity}%`;
      document.getElementById("min_temp").innerHTML = `${result.min_temp}°C`;
      document.getElementById("sunrise").innerHTML = `${date(
        result.sunrise * 1000
      )} A.M`;
      document.getElementById("sunset").innerHTML = `${date(
        result.sunset * 1000
      )} P.M`;
      document.getElementById("temp").innerHTML = `${result.temp}°C`;
      document.getElementById(
        "wind_degrees"
      ).innerHTML = `${result.wind_degrees}°`;
      document.getElementById(
        "wind_speed"
      ).innerHTML = `${result.wind_speed}Kmph`;
    }
  } catch (error) {       //if we dont get the response then it well through the error
    console.log(error);
  }
};

//here whenever user hit enter on textbox it will call function weather and we will collect the city name and passed it to function
document.getElementById("cityBox").onkeyup = (event) => {
  if (event.keyCode == 13) {
    const city = document.getElementById("cityBox").value;
    weather(city);
  }
};

//we are doing the same work but this we are sing a button
document.getElementById("searchbtn").onclick = () => {
  const city = document.getElementById("cityBox").value;
  weather(city);
};
