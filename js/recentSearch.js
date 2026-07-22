export const  getRecentSearched = (lastSearched)=> {
    console.log(lastSearched[lastSearched.length-2])
    let h2 = document.querySelector("#lastSearched")
    let latest = lastSearched[lastSearched.length - 2] ?? "";
    h2.textContent = latest
}


// get day 


export function getdayName(date) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long"
    });
}
