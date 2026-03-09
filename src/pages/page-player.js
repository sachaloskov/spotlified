import { currentSong, currentSongs, previousSong, togglePlayPause, nextSong } from '../elements/player'
import formatTimestamp from '../lib/formatTimestamp'

customElements.define('page-player', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id='player'>
        <div id='player-thumbnail'>
          <!-- utiliser l'id de cet élément pour changer la cover de la chanson -->
          <img src='http://placecats.com/200/300' id='player-thumbnail-image' />
        </div>

        <div id='player-infos'>
          <div id='player-infos-song'>
            <span class='material-icons'>music_note</span>
            <!-- utiliser l'id de cet élément pour changer le titre de la chanson -->
            <span id='player-infos-song-title'>
              -
            </span>
          </div>

          <div id='player-infos-artist'>
            <span class='material-icons'>person</span>
            <!-- utiliser l'id de cet élément pour changer le nom de l'artiste -->
            <span id='player-infos-artist-name'>
              -
            </span>
          </div>
        </div>

        <div id='player-controls'>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur précédent -->
          <button type='button' class='player-control player-control-small' id='player-control-previous'>
            <span class='material-icons'>skip_previous</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur play/pause -->
          <button type='button' class='player-control' id='player-control-play'>
            <span class='material-icons'>play_arrow</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur suivant -->
          <button type='button' class='player-control player-control-small' id='player-control-next'>
            <span class='material-icons'>skip_next</span>
          </button>
        </div>

        <div id='player-progress'>
          <input type='range' id='player-progress-bar' />
          <div id='player-times'>
            <!-- utiliser l'id de cet élément pour changer le temps écoulé -->
            <span id='player-time-current'>--:--</span>
            <!-- utiliser l'id de cet élément pour changer la durée totale -->
            <span id='player-time-duration'>--:--</span>
          </div>
        </div>
      </div>
      `

    const audio = document.querySelector('#audio-player')
    const previousButton = document.querySelector('#player-control-previous')
    const playButton = document.querySelector('#player-control-play')
    const nextButton = document.querySelector('#player-control-next')
    const progressBar = document.querySelector('#player-progress-bar')

    function displayPlayer() {
      document.querySelector('#player-thumbnail-image').src = currentSong.artist.image_url
      document.querySelector('#player-infos-artist-name').textContent = currentSong.artist.name
      document.querySelector('#player-infos-song-title').textContent = currentSong.title
    }

    function changeIcon() {
      if (audio.paused) {
        playButton.innerHTML = `<span class='material-icons'>play_arrow</span>`
      } else {
        playButton.innerHTML = `<span class='material-icons'>pause</span>`
      }
    }

    displayPlayer()
    changeIcon()
    document.querySelector('#player-time-duration').textContent = formatTimestamp(audio.duration);

    previousButton.addEventListener('click', (e) => {
      previousSong(currentSong, currentSongs)
      displayPlayer()
    })

    playButton.addEventListener('click', togglePlayPause)

    nextButton.addEventListener('click', (e) => {
      nextSong(currentSong, currentSongs)
      displayPlayer()
    })

    audio.addEventListener('play', changeIcon)
    audio.addEventListener('pause', changeIcon)
    audio.addEventListener('ended', () => {
      nextSong(currentSong, currentSongs)
      displayPlayer()
    })

    audio.addEventListener('loadedmetadata', () => {
      document.querySelector('#player-time-duration').textContent = formatTimestamp(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      document.querySelector('#player-time-current').textContent = formatTimestamp(audio.currentTime);
      if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100
      }
    })
    progressBar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration
      }
    })
  }
})
