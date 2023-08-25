const perPage = 20
const maxPage = 3
let currentPage = 1


document.getElementById("backbutton").addEventListener("click", () => {
  window.location.href = "/index.html";
});

const fetchPage = () => {
  fetch(`https://api.openbrewerydb.org/v1/breweries?page=${currentPage}&per_page=${perPage}`)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("gridItem");
    console.log(data);

    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "brewery-item";

      const name = document.createElement("h2");
      name.textContent = item.name;
      div.appendChild(name);

      const address = document.createElement("p");
      address.textContent = `${item.address_1} - ${item.state_province} - ${item.postal_code} ${item.country}`;

      div.appendChild(address);

      let contentAdded = false;

      // This function show more details about brewery, when you click on it
      function detailsBrewery(){
        div.addEventListener("click", () => {
          if (!contentAdded) {
            gridItem.innerHTML = "";
            address.innerHTML = "";
  
            // TYPE CONFIG
            const type = document.createElement("p");
            type.textContent = `Type: ${item.brewery_type}`;
            div.appendChild(type);
  
            // STREET CONFIG
            const street = document.createElement("p");
            street.textContent = `Street: ${item.street}`;
            div.appendChild(street);
  
            // CITY CONFIG
            const city = document.createElement("p");
            city.textContent = `City: ${item.city}`;
            div.appendChild(city);
  
            // STATE CONFIG
            const state = document.createElement("p");
            city.textContent = `State: ${item.state}`;
            div.appendChild(state);
  
            // POSTALCODE CONFIG
            const postal_code = document.createElement("p");
            postal_code.textContent = `Postal code: ${item.postal_code}`;
            div.appendChild(postal_code);
  
            // COUNTRY CONFIG
            const country = document.createElement("p");
            country.textContent = `Country: ${item.country}`;
            div.appendChild(country);
  
            // WEBSITE CONFIG
            const website_url = document.createElement("a");
            website_url.href = item.website_url;
            website_url.target = "_blank";
  
            const websiteText = document.createTextNode("Website: ");
            website_url.appendChild(websiteText);
  
            website_url.textContent = `${item.website_url}`;
            div.appendChild(websiteText);
            div.appendChild(website_url);
  
            // PHONE CONFIG
            const phone = document.createElement("p");
            phone.textContent = `Phone: ${item.phone}`;
            div.appendChild(phone);
  
            // LOCATE CONFIG
            const locate = document.createElement("a");
            locate.target = "_blank";
  
            const locateText = document.createTextNode("Open in maps: ");
            locate.appendChild(locateText);
  
            locate.href = `https://www.google.com.br/maps?q=${item.latitude},${item.longitude}`;
            locate.textContent = `${item.latitude}, ${item.longitude}`;
            div.appendChild(locateText);
            div.appendChild(locate);
  
            // BUTTON BACK
            document.getElementById("backbutton").classList.remove("hidden");
  
            container.appendChild(div);
            contentAdded = true;
          }
        });
      }

      detailsBrewery()

      container.appendChild(div);
    });
  })
  .catch((error) => alert("Erro ao carregar dados da API:", error));
}

document.getElementById("nextButton").addEventListener("click", () => {
  if(currentPage < maxPage) {
    currentPage++
    gridItem.innerHTML = "";
    fetchPage()
  }
});

// Evento de clique no botão "Página Anterior"
document.getElementById("prevButton").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage --;
    gridItem.innerHTML = "";
    fetchPage();
  }
});

// Inicialmente, carregue a primeira página de resultados
fetchPage();