import { getApi } from "./api.js";
import { clearAll } from "./deletehistory.js";
import { getdayName } from "./recentSearch.js";
import { getRender, getrenderRecent, weatherRender } from "./render.js";
import { showSuggestion } from "./Suggestion.js";
import { gettoogle } from "./toogle.js";

const apiKey = "527dd915fabe40979c2141828262107";
const input = document.querySelector("header input");
let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
let lastSearched = Array.isArray(getitems) ? getitems : [];


// Fetch Last searched city weather
let city = getitems[getitems.length - 1] ?? "Naushera"
getApi(apiKey, city, lastSearched)





// GET USER INPUT and fetch weather
input.addEventListener('keydown', async (e) => {
    if (e.key == 'Enter') {
        city = e.target.value;
        lastSearched = await getApi(apiKey, city, lastSearched) ?? lastSearched;
    }
})





// GET LAST SEARCHED
async function get() {
    lastSearched = await getApi(apiKey, city, lastSearched);
}
get()





// RENDER CODE 
let heading = document.querySelector(".info h2");
let loc = document.querySelector(".info p")
let date = document.querySelector(".date");
let mainIcon = document.querySelector(".iconDiv img");
let humid = document.querySelector("#humidity")
let wind = document.querySelector("#wind")

export const render = (data) => {
    const { name, localtime } = data.location;
    const { temp_c, humidity, wind_kph } = data.current;
    const { icon } = data.current.condition;

    weatherRender(name, localtime, temp_c, humidity, wind_kph, icon)

    let arr = data.forecast.forecastday;
    let nextdays = document.querySelector("#UpcomingDays")
    nextdays.innerHTML = getRender(arr)

}



// TOOGLE CODE
let toogleBtn = document.querySelector("#toogle-btn");
toogleBtn.addEventListener("click", () => {
    gettoogle()
})




let h1 = document.querySelector("#lastSearched");


h1.addEventListener("click", (e) => {
    console.log(h1)
    let value = e.target.textContent;
    getApi(apiKey, value, lastSearched)
})

let clear = document.querySelector(".textee");

clear.addEventListener("click", () => {
    clearAll();
})



// API FOR SUGGESTION

let suggestionList = document.querySelector("#suggestionList");
let loadingText = document.querySelector("#loadingText");
let errorText = document.querySelector("#errorText");
let searchBar = document.querySelector("#searchBar")
let timer;
searchBar.addEventListener("input", (e) => {

    clearTimeout(timer)

    let re = e.target.value;
    if (re.length > 2 ) {
        timer = setTimeout(() => {
            showSuggestion(re ,apiKey);
        }, 1000);
    }

})


// CLICK ON LI OF SEARCH

suggestionList.addEventListener("click",(e)=>{
   const val =  e.target.innerHTML
   
   getApi(apiKey , val , lastSearched)
   searchBar.textContent = val;
   loadingText.textContent = "";
   errorText.textContent ="";
    suggestionList.innerHTML = "";
})
