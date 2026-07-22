import { getApi } from "./api.js";
import { clearAll } from "./deletehistory.js";
import { getdayName } from "./recentSearch.js";
import { getRender, getrenderRecent } from "./render.js";
import { gettoogle } from "./toogle.js";

const apiKey = "527dd915fabe40979c2141828262107";
const input = document.querySelector("header input");
let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
let lastSearched =  Array.isArray(getitems) ? getitems : [];


let city = getitems[getitems.length -1] ?? "Naushera"
getApi(apiKey, city , lastSearched)





// GET USER INPUT
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

    let day = getdayName(localtime);

    heading.textContent = temp_c;
    loc.textContent = name;
    date.textContent = day;
    mainIcon.src = icon;
    humid.textContent = humidity;
    wind.textContent = wind_kph;

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


h1.addEventListener("click",(e)=>{
    let value = e.target.textContent;
    getApi(apiKey, value , lastSearched)
})

let clear = document.querySelector(".textee");

clear.addEventListener("click", ()=>{
clearAll();
})