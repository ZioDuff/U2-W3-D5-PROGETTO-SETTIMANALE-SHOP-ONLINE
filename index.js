const URL = "https://striveschool-api.herokuapp.com/api/product/"
const row = document.querySelector(".row")
// una volta presa la nostra API andiamo a creare la nostra promise
const generateCard = (event) => {
  fetch(URL, {
    method: "GET",

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
    .then((data) => {
      console.log(data)
      data.forEach((obj) => {
        const img = obj.imageUrl
        const name = obj.name
        const description = obj.description
        const price = obj.price
        const _id = obj._id
        const col = document.createElement("col")
        col.classList.add("col-md-4", "mb-2")
        // una volta richiamate tutte le proprieta dell'oggetto che ci servono andiamo a creare la card
        //lo facciamo avvenire ad ogni sigola card creata
        col.innerHTML = `<div class="card shadow-lg">
        <img src=${img} class="card-img-top" style="aspect-ratio: 4/3 ; object-fit: contain" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description} </p>
          <p>${price + "€"} </p>
          <a href="./details.html?appId=${_id}" class="btn btn-primary mb-md-2 mb-xl-0">Scopri di più</a>
          <a href="./backoffice.html?appId=${_id}" class="btn btn-danger">Modifica</a>
        </div>
      </div> `
        row.appendChild(col)
      })
    })
    .catch((err) => console.log(err))
}

window.onload = () => {
  generateCard()
}
