const params = new URLSearchParams(window.location.search)
const id = params.get("appId")

const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/"
const method = id ? "PUT" : "POST"

const mainBtn = document.getElementById("mainBtn")
const removeBtn = document.getElementById("deleteBtn")
const subtitle = document.querySelector("h4")
window.addEventListener("DOMContentLoaded", () => {
  console.log("RESOURCE ID: " + id)

  if (id) {
    subtitle.innerText = "Modifica Prodotto"
    mainBtn.classList.remove("btn-primary")
    mainBtn.classList.add("btn-success")
    mainBtn.innerText = "Modifica"

    removeBtn.addEventListener("click", handleDelete)
    removeBtn.classList.remove("d-none")
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI4OTdmMzA0NjAwMWFlNTlmOGIiLCJpYXQiOjE3MTI5MTA5ODUsImV4cCI6MTcxNDEyMDU4NX0.G6XbH7qEVOXRob109rwdNsbfdgdY1HI5hvhW8Lkfg6Y",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella fetch")
        }
      })
      .then((objToModify) => {
        const { name, description, brand, price, imageUrl } = objToModify

        document.getElementById("name").value = name
        document.getElementById("description").value = description
        document.getElementById("brand").value = brand
        document.getElementById("imageUrl").value = imageUrl
        document.getElementById("price").value = price
      })
      .catch((err) => console.log(err))
  }
  window.onload = () => {
    const form = document.querySelector("form")
    form.addEventListener("submit", handleSubmit)
  }

  const handleSubmit = (event) => {
    console.log("EVENT", event)
    event.preventDefault()
    const newProduct = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    }

    fetch(URL, {
      method: method,
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",

        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI4OTdmMzA0NjAwMWFlNTlmOGIiLCJpYXQiOjE3MTI5MTA5ODUsImV4cCI6MTcxNDEyMDU4NX0.G6XbH7qEVOXRob109rwdNsbfdgdY1HI5hvhW8Lkfg6Y",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Errore nella fetch")
        }
      })
      .then((createdCard) => {
        alert("Risorsa con id: " + createdCard._id + " creata con successo!")

        event.target.reset()
      })
      .catch((err) => console.log(err))
  }
})
const handleDelete = () => {
  const hasConfirmed = confirm(
    "Sicuro di voler eliminare il prodotto dal catalogo?"
  )

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjI4OTdmMzA0NjAwMWFlNTlmOGIiLCJpYXQiOjE3MTI5MTA5ODUsImV4cCI6MTcxNDEyMDU4NX0.G6XbH7qEVOXRob109rwdNsbfdgdY1HI5hvhW8Lkfg6Y",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error("Errore nella fetch")
        }
      })
      .then((deletedObj) => {
        alert("Risorsa: " + deletedObj.name + " Eliminata con successo!")

        window.location.assign("./index.html")
      })
      .catch((err) => console.log(err))
  }
}
