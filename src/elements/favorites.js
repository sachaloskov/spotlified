const favorites = localStorage;

function addFavorite(id, song) {
    favorites.setItem(id, JSON.stringify(song))
}

function getFavorite(id) {
    return favorites.getItem(id) && JSON.parse(favorites.getItem(id))
}

function removeFavorite(id) {
    favorites.removeItem(id)
}

function getFavorites() {
    const favoriteSongs = []
    for (let i = 0; i < favorites.length; i++) {
        const key = favorites.key(i)
        const value = JSON.parse(favorites.getItem(key))
        favoriteSongs.push(value)
    }
    return favoriteSongs
}

export { addFavorite, removeFavorite, getFavorite, getFavorites }