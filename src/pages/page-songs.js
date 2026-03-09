import { getSongs } from '../api.js'
import { playSong } from '../elements/player.js'
import { addFavorite, getFavorite, removeFavorite } from '../elements/favorites'


customElements.define('page-artist-songs', class extends HTMLElement {
  connectedCallback() {
    const artistId = this.getAttribute('artist-id')

    getSongs(artistId)
      .then((songs) => {
        this.innerHTML = `
          <h4>
            Artistes > ${songs[0].artist.name}
          </h4>

          <div class='list'>
          </div>
        `
        const songList = this.querySelector('.list')

        songs.forEach((song) => {
          const songItem = document.createElement('song-item')

          songItem.setAttribute('title', song.title)
          songItem.setAttribute('favorite', getFavorite(song.id) ? 'true' : 'false')
          songList.append(songItem)

          songItem.addEventListener('play_click', () => {
            playSong(song, songs)
          })

          songItem.addEventListener('favorite_click', () => {
            if (!getFavorite(song.id)) {
              addFavorite(song.id, song)
              songItem.setAttribute('favorite', 'true')
            } else {
              removeFavorite(song.id)
              songItem.setAttribute('favorite', 'false')
            }
          })

        })
      })
  }
})
