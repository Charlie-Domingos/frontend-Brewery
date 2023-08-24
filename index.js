fetch(`https://api.openbrewerydb.org/v1/breweries/`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('gridItem')

    data.forEach(item => {
      const div = document.createElement('div')
      div.className = 'brewery-item'

      const name = document.createElement('h2')
      name.textContent = item.name
      div.appendChild(name)

      const address = document.createElement('p')
      address.textContent = `${item.address_1} - ${item.state_province} - ${item.postal_code} ${item.country}`

      div.appendChild(address)

      let contentAdded = false

      // DIV BREWERY-ITEM CLICAVEL
      div.addEventListener('click', () => {
        if (!contentAdded) {
          gridItem.innerHTML = ''
          address.innerHTML = ''

          const type = document.createElement('p')
          type.textContent = `Type: ${item.brewery_type}`
          div.appendChild(type)

          const street = document.createElement('p')
          street.textContent = `Street: ${item.street}`
          div.appendChild(street)

          const city = document.createElement('p')
          city.textContent = `City: ${item.city}`
          div.appendChild(city)

          const state = document.createElement('p')
          city.textContent = `State: ${item.state}`
          div.appendChild(state)

          const postal_code = document.createElement('p')
          postal_code.textContent = `Postal code: ${item.postal_code}`
          div.appendChild(postal_code)

          const country = document.createElement('p')
          country.textContent = `Country: ${item.country}`
          div.appendChild(country)

          const website_url = document.createElement('p')
          website_url.textContent = `WebSite: ${item.website_url}`
          div.appendChild(website_url)

          const phone = document.createElement('p')
          phone.textContent = `Phone: ${item.phone}`
          div.appendChild(phone)

          const locate = document.createElement('p')
          locate.textContent = `Open in maps: ${item.latitude}`
          div.appendChild(locate)

          document
            .getElementById('backbutton')
            .addEventListener('click', () => {
              window.location.href = `/index.html`
            })

          container.appendChild(div)
          contentAdded = true
        }
      })

      container.appendChild(div)
    })
  })
  .catch(error => console.error('Erro ao carregar dados da API:', error))
