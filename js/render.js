import { getdayName } from "./recentSearch.js";

export const weatherRender = (name, localtime, temp_c, humidity, wind_kph, icon) => {
  let heading = document.querySelector(".info h2");
  let loc = document.querySelector(".info p")
  let date = document.querySelector(".date");
  let mainIcon = document.querySelector(".iconDiv img");
  let humid = document.querySelector("#humidity")
  let wind = document.querySelector("#wind")
  let day = getdayName(localtime);

  heading.textContent = temp_c;
  loc.textContent = name;
  date.textContent = day;
  mainIcon.src = icon;
  humid.textContent = humidity;
  wind.textContent = wind_kph;
}





export const getRender = (arr) => {

  return arr.map((e) => {
    let day2 = getdayName(e.date)
    return `
         <div class="daysCard">
                <h3>${day2}</h3>
                <img src="${e.day.condition.icon}" alt="weather image">
                <h2>${e.day.avgtemp_c}</h2>
            </div>
        
        `
  }).join("");
}



export const getrenderRecent = (arr) => {
  let container = document.querySelector("#Last5Searches");

  if (Array.isArray(arr) && arr.length > 0) {
    container.innerHTML = arr.map((e) => {
      return `
        <div class="lastSearchCards">
          <h3>${e.location.name}</h3>
          <img src="${e.current.condition.icon}" alt="weather image">
          <h2>${e.current.temp_c}°C</h2>
        </div>
      `;
    }).join("");
  } else {
    container.innerHTML = "";
  }
};

