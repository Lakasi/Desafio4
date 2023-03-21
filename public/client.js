//@ts-ignore
const serverSocket = io('http://localhost:8080/')


serverSocket.on('updateProducts', products => {
  const divProducts = document.querySelector('#productsDiv')
  let productos = ''
  products.forEach(element => {
    productos+=`
    <hr>
    <h3>Title</h3>
    <p>${element.title}</p>
    <h3>Description</h3>
    <p>${element.description}</p>
    <h3>Code</h3>
    <p>${element.code}</p>
    <h3>Price</h3>
    <p>${element.price}</p>
    <h3>Status</h3>
    <p>${element.status}</p>
    <h3>Stock</h3>
    <p>${element.stock}</p>
    `
  });
  if (divProducts) {
    divProducts.innerHTML = productos
  }
})