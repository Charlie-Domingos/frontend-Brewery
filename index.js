const perPage = 20
const maxPage = 3
let currentPage = 1

document.getElementById('backbutton').addEventListener('click', () => {
  window.location.href = '/index.html'
})

const fetchPage = () => {
  fetch(
    `https://api.openbrewerydb.org/v1/breweries?page=${currentPage}&per_page=${perPage}`
  )
    .then(res => res.json())
    .then(data => {
      const filterType = document.getElementById('filterType')
      const filteredType = filterType.value

      let filteredItens = data
      if (filteredType) {
        filteredItens = data.filter(item => item.brewery_type === filteredType)
      }

      const container = document.getElementById('gridItem')
      container.innerHTML = ''

      filteredItens.forEach(item => {
        const div = document.createElement('div')
        div.className = 'brewery-item'

        const name = document.createElement('h2')
        name.textContent = item.name
        div.appendChild(name)

        const address = document.createElement('p')
        address.textContent = `${item.address_1} - ${item.state_province} - ${item.postal_code} ${item.country}`
        div.appendChild(address)

        // TYPE CONFIG
        const typeStyles = {
          micro: {
            backgroundColor: '#00768d',
            color: '#fff',
            margin: '100px 0px 0px 0px',
            padding: '4px',
            width: '50px',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          },
          large: {
            backgroundColor: '#3d6f02',
            padding: '4px',
            margin: '100px 0px 0px 0px',
            width: '48px',
            color: '#fff',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          },
          brewpub: {
            backgroundColor: '#ffde60',
            padding: '4px',
            margin: '100px 0px 0px 0px',
            width: '70px',
            color: '#000',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          },
          closed: {
            backgroundColor: '',
            padding: '12px',
            margin: '100px 0px 0px 0px',
            width: '70px',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          },
          contract: {
            backgroundColor: '#ff6925',
            color: '#fff',
            padding: '4px',
            margin: '100px 0px 0px 0px',
            width: '70px',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          },
          proprietor: {
            backgroundColor: '#4836ab',
            color: '#fff',
            padding: '4px',
            margin: '100px 0px 0px 0px',
            width: '78px',
            border: '1px solid #ccc'
            // Adicione outros estilos conforme necessário
          }

          // Adicione outros tipos e estilos conforme necessário
        }

        const type = document.createElement('div')
        type.textContent = `${item.brewery_type}`
        type.className = 'typeItem'

        const styles = typeStyles[item.brewery_type]
        for (const property in styles) {
          type.style[property] = styles[property]
        }

        div.appendChild(type)

        console.log(item.brewery_type)

        let contentAdded = false

        // This function show more details about brewery, when you click on it
        function detailsBrewery() {
          div.addEventListener('click', () => {
            type.removeAttribute('style') // CSS TYPESTYLE REMOVE
            type.innerHTML = ''
            document.getElementById('pageNumbers').classList.add('hidden') // Add hidden pageNumbers
            if (!contentAdded) {
              gridItem.innerHTML = ''
              address.innerHTML = ''

              const type = document.createElement('p')
              type.textContent = `Type: ${item.brewery_type}`
              div.appendChild(type)

              // STREET CONFIG
              const street = document.createElement('p')
              street.textContent = `Street: ${item.street}`
              div.appendChild(street)

              // CITY CONFIG
              const city = document.createElement('p')
              city.textContent = `City: ${item.city}`
              div.appendChild(city)

              // STATE CONFIG
              const state = document.createElement('p')
              city.textContent = `State: ${item.state}`
              div.appendChild(state)

              // POSTALCODE CONFIG
              const postal_code = document.createElement('p')
              postal_code.textContent = `Postal code: ${item.postal_code}`
              div.appendChild(postal_code)

              // COUNTRY CONFIG
              const country = document.createElement('p')
              country.textContent = `Country: ${item.country}`
              div.appendChild(country)

              // WEBSITE CONFIG
              const website_url = document.createElement('a')
              website_url.href = item.website_url
              website_url.target = '_blank'

              const websiteText = document.createTextNode('Website: ')
              website_url.appendChild(websiteText)

              website_url.textContent = `${item.website_url}`
              div.appendChild(websiteText)
              div.appendChild(website_url)

              // PHONE CONFIG
              const phone = document.createElement('p')
              phone.textContent = `Phone: ${item.phone}`
              div.appendChild(phone)

              // LOCATE CONFIG
              const locate = document.createElement('a')
              locate.target = '_blank'

              const locateText = document.createTextNode('Open in maps: ')
              locate.appendChild(locateText)

              locate.href = `https://www.google.com.br/maps?q=${item.latitude},${item.longitude}`
              locate.textContent = `${item.latitude}, ${item.longitude}`
              div.appendChild(locateText)
              div.appendChild(locate)

              // REMOVE HIDDEN backButton
              document.getElementById('backbutton').classList.remove('hidden')
              // ADD HIDDEN FILTER IN DETAILS BREWERY
              document.querySelector('.filter').classList.add('hidden')

              container.appendChild(div)
              contentAdded = true
            }
          })
        }

        detailsBrewery()

        container.appendChild(div)
      })
    })
    .catch(error => alert('Erro ao carregar dados da API:', error))
}

// Page buttons pagination funcion
const updatePageButtons = () => {
  const pageNumbersDiv = document.getElementById('pageNumbers')
  document.getElementById('pageNumbers').classList.remove('hidden') // remove pageNumbers hidden
  pageNumbersDiv.innerHTML = '' // clean the previuos page

  for (let i = 1; i <= maxPage; i++) {
    const pageNumberButton = document.createElement('button')
    pageNumberButton.textContent = i
    pageNumberButton.classList.add('pageNumberButton')

    // If page number equals currentPage then add color on it
    if (i === currentPage) {
      pageNumberButton.classList.add('active')
    }

    pageNumberButton.addEventListener('click', () => {
      currentPage = i
      gridItem.innerHTML = ''

      fetchPage()
      updatePageButtons()
    })

    pageNumbersDiv.appendChild(pageNumberButton)
  }
}

// Load first page
fetchPage()
updatePageButtons()

const filterType = document.getElementById('filterType')
filterType.addEventListener('change', () => {
  currentPage = 1
  fetchPage()
})
