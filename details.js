// riprendiamo gli stessi parametri per poterci spostare sulla pagina dettagli di ogni pordotto
//tramite l'id univoco
// andiamo poi a creare un box che contiene sia l'immagine che il restante contenuto
//aggiungendo poi un bottone per ritornare all'home page

const params = new URLSearchParams(window.location.search)
const id = params.get("appId")
console.log(params)
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id

const container = document.querySelector(".container")
window.addEventListener("DOMContentLoaded", () => {
  console.log("RESOURCE ID: " + id)

  fetch(URL, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWNmNTdmMzA0NjAwMWFlNTlmNmYiLCJpYXQiOjE3MTI5MDk1NTcsImV4cCI6MTcxNDExOTE1N30.K04dk3uKhthE1EpEbOaOjkq8Eo4_5tIQGqyMbSeIqcU",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json()
      } else {
        throw new Error("Errore nella fetch")
      }
    })
    .then((data) => {
      console.log(data)
      const { name, description, brand, price, imageUrl } = data

      document.getElementById("name").innerText = name
      document.getElementById("description").innerText = description
      document.getElementById("brand").innerText = brand
      document.getElementById("imageUrl").src = imageUrl
      document.getElementById("price").innerText = price + "€"
    })
    .catch((err) => console.log(err))
})
