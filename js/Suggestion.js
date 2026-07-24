export async function showSuggestion(re , apiKey) {

let suggestionList = document.querySelector("#suggestionList");
let loadingText = document.querySelector("#loadingText");
let errorText = document.querySelector("#errorText");

    loadingText.textContent = "Searching....";
    errorText.textContent = "";

    let url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${re}`;
    try {
        let respone = await fetch(url);
        if (!respone.ok) {
            throw new Error("Not Found");
        }
        let data = await respone.json();
        suggestionList.innerHTML = data.map(element => {
            return `<li class="li-of-suggestion">${element.name}, ${element.country}</li>`;
        }).join("");
        loadingText.textContent = "";
    } catch (error) {
        loadingText.textContent = "";
        errorText.textContent = error.message;
    }
}