"use strict";

const form = document.querySelector("#search-form");
const input = document.querySelector("[name=search-field]");
const result = document.getElementById("result");

const doFetch = async (searchValue) => {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q= ${searchValue}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.length);
      console.log(data[0]);

      for (let i = 0; i < data.length; i++) {
        let header = document.createElement("header");
        let link = document.createElement("p");
        let figure = document.createElement("figure");
        let summary = document.createElement("p");
        let image = data[i].show.image;


        header.innerHTML = `<h4>${i + 1}- Name: ${data[i].show.name}</h4>`;
        link.innerHTML = `<a href="${data[i].show.officialSite}">Homepage</a>`;
        if(image === null){
            figure.innerHTML = `<img src = "https://placekitten.com/200/300"/>`;
        }else{
        figure.innerHTML = `<img src = "${image.medium}"/>`;
    }
        summary.innerHTML = `<p>${data[i].show.summary}</p>`;

        result.appendChild(header);
        result.appendChild(link);
        result.appendChild(figure);
        result.appendChild(summary);
      }
    } else {
      console.log("data cannot be accesed");
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputVal = input.value;
  doFetch(inputVal);
});
