const brewerieTittle = document.getElementById("brewerieName");
const brewerieminDescr = document.getElementById("brewerieDescription");
const btnBrewerie = document.getElementById("btt");

const fetchApi = (value) => {
  const result = fetch(`https://api.openbrewerydb.org/v1/breweries/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return data;
    });
  return result;
};


// TRAZ TODOS OS ITEMS DO ARRAY

// btnBrewerie.addEventListener("click", async (event) => {
//   event.preventDefault();
//   try {
//     const result = await fetchApi(btnBrewerie.value);
//     gridItem.textContent = JSON.stringify(result, null, 2);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

//   // const result = fetchApi(btnBrewerie.value)
//   // gridItem.innerHTML = result
// });


// FILTRA PELO NAME DO PRIMEIRO ITEM DO ARRAY
btnBrewerie.addEventListener("click", async (event) => {
  event.preventDefault();
  
  try {
    const result = await fetchApi(btnBrewerie.value);
    
    if (result.length > 0) {
      const breweryName = result[0].name;
      brewerieTittle.textContent = breweryName;
    } else {
      brewerieTittle.textContent = "Brewery not found";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});