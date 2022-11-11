import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/common/createMenu.js";
import { getToken } from "./utils/storage.js";
const container = document.querySelector(".product-container");

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const myfile = document.querySelector("#myfile").files;
const featured = document.querySelector("#featured");
const myCheckbox = document.querySelector("#checkbox");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featured = myCheckbox.checked;

  console.log("priceValue", priceValue);
  console.log(featured);
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }
  addProduct(titleValue, priceValue, descriptionValue, featured, myfile);
}
async function addProduct(title, price, description, featured, myfile) {
  const url = `${baseUrl}products` + "?populate=*";
  console.log(myfile);
  const formData = new FormData();

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
  });

  formData.append("files.image", myfile[0]);
  formData.append("data", data);

  const token = getToken();

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.created_at) {
      const apiImage = json.data.attributes.image.data;
      console.log(apiImage);
      var image = "image/50cent.png";
      if (apiImage) {
        image = json.data.attributes.image.data;
      }

      container.innerHTML += `<section class="content" href="detail.html?id=${json.data.attributes.id}"></div>
      
 
      
      <div class="box one">
  
  <div class="box-img" style="background-image: url(http://localhost:1337${image}">  </div>
  <h4>${json.data.attributes.title}</h4>
                                     
  <p>$ ${json.data.attributes.price}</p>
        
        </div>`;
      displayMessage("success", "Product created", ".message-container");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
