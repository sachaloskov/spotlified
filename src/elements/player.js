let currentSong = null
let currentSongs = null

function playSong(song, songs) {
    const audio = document.querySelector('#audio-player')
    console.log(song, songs)

    audio.src = song.audio_url
    audio.play()

    currentSong = song
    currentSongs = songs
}

function previousSong(song, songs) {
    const index = songs.indexOf(song)
    if (index > 0) {
        song = songs[index - 1]
    } else {
        song = songs[songs.length - 1]
    }
    playSong(song, songs)
}

function togglePlayPause() {
    const audio = document.querySelector('#audio-player')

    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}

function nextSong(song, songs) {
    const index = songs.indexOf(song)
    if (index !== songs.length - 1) {
        song = songs[index + 1]
    } else {
        song = songs[0]
    }
    playSong(song, songs)
}

export { currentSong, currentSongs, playSong, previousSong, togglePlayPause, nextSong }