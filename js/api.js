import { render } from "./main.js";
import { getLastFive, getRecentSearched } from "./recentSearch.js";


export async function getApi(apiKey, city) {
    let getitems = JSON.parse(localStorage.getItem("lastSearched")) ?? [];
    let lastSearched = Array.isArray(getitems) ? getitems : [];
    let err = document.querySelector(".error")
    let section = document.querySelector("section");
    let cards = document.querySelector("#UpcomingDays");
    let Last5Searches = document.querySelector("#Last5Searches");
    section.classList.add("loading");
    cards.classList.add("loading");
    Last5Searches.classList.add("loading");

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
        getLastFive();
        getRecentSearched(lastSearched);
        render(data);
    } catch (error) {
        console.log(error.message)
        err.textContent = error.message;

    } finally {
        section.classList.remove("loading");
        cards.classList.remove("loading");
         Last5Searches.classList.remove("loading");
    }

}