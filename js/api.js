import { render } from "./main.js";
import { getRecentSearched } from "./recentSearch.js";


export async function getApi(apiKey, city, lastSearched) {
    console.log(city)
    let err = document.querySelector(".error")
    let section = document.querySelector("section");
    let cards = document.querySelector("#UpcomingDays");
    section.classList.add("loading");
    cards.classList.add("loading");

    err.textContent = "";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Invalid City Name:(`)
        }
        let data = await response.json();
        lastSearched = [...lastSearched, data.location.name];
        localStorage.setItem("lastSearched", JSON.stringify(lastSearched))
        getRecentSearched(lastSearched);
        render(data);
        return lastSearched;
    } catch (error) {
        console.log(error.message)
        err.textContent = error.message;


    }finally {
        section.classList.remove("loading"); 
        cards.classList.remove("loading"); 
    }

}