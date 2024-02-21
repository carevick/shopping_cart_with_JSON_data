export const findItems = async () => {
  try {
    const response = await fetch("data.json");
    const jsonResponse = await response.json();

    const ulElement = document.querySelector("ul");

    //create <li> elements from catalog.js
    jsonResponse.listItems.forEach(
      ({ image, name, description, quantity, currency, price }, liIndex) => {
        const liElement = document.createElement("li");

        const imageElement = document.createElement("img");
        imageElement.className = "li-img";
        imageElement.src = image;
        imageElement.alt = name;
        liElement.appendChild(imageElement);

        const headerElement = document.createElement("h3");
        headerElement.innerText = name;
        liElement.appendChild(headerElement);

        const paragraphElement = document.createElement("p");
        liElement.appendChild(paragraphElement);
        if (description.color) {
          paragraphElement.innerText = `Brand: ${description.brand}
        Color: ${description.color}`;
        } else if (description.size) {
          paragraphElement.innerText = `Brand: ${description.brand}
        Size: ${description.size}`;
        } else if (description.type) {
          paragraphElement.innerText = `Brand: ${description.brand}
        Type: ${description.type}`;
        }

        const paragraphElementPrice = document.createElement("p");
        paragraphElementPrice.className = "price";
        paragraphElementPrice.innerText = `${quantity} x ${currency} ${price}`;
        liElement.appendChild(paragraphElementPrice);

        ulElement.appendChild(liElement);
      },
    );

    //create <h2> element on top of cart-items container with number of items in list
    const cartItems = document.querySelector(".cart-items");
    const header = document.createElement("h2");
    cartItems.insertBefore(header, cartItems.firstChild);

    const listItem = document.querySelectorAll("li");
    const numberOfItems = listItem.length;

    header.innerHTML = `My Cart (${numberOfItems} items)`;
  } catch (error) {
    console.log(error);
  }
};
