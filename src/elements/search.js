import { searchSongs } from '../api.js'

const searchButton = document.querySelector('#search-trigger')
const searchInput = document.querySelector('#search-input')

searchButton.addEventListener('click', () => {
    searchInput.classList.add('active')
    searchInput.focus()
})

searchInput.addEventListener('change', () => {
    window.location.hash = '#search/' + encodeURIComponent(searchInput.value)
})