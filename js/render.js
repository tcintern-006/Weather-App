import { getdayName } from "./recentSearch.js";

export const getRender = (arr)=>{
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