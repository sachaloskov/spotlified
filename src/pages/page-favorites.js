import { playSong } from '../elements/player'
import { addFavorite, getFavorite, removeFavorite, getFavorites } from '../elements/favorites'

customElements.define('page-favorites', class extends HTMLElement {
    connectedCallback() {
        const favoriteSongs = getFavorites()
        this.innerHTML = `
          <h4>
            Favoris
          </h4>
 
          <div class='list'>
          </div>
        `
        const songList = this.querySelector('.list')

        favoriteSongs.forEach((song) => {
            const songItem = document.createElement('song-item')

            songItem.setAttribute('title', song.title)
            songItem.setAttribute('favorite', 'true')
            songList.append(songItem)

            songItem.addEventListener('play_click', () => {
                playSong(song, favoriteSongs);
            })

            songItem.addEventListener('favorite_click', () => {
                if (!getFavorite(song.id)) {
                    addFavorite(song.id)
                    window.dispatchEvent(new Event('hashchange'))
                } else {
                    removeFavorite(song.id, song)
                    window.dispatchEvent(new Event('hashchange'))
                }
            })
        })

    }
})