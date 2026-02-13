/**
 * Preload images ke browser cache
 * @param {Array} imageUrls - Array of image URLs to preload
 * @returns {Promise} Resolves when all images are preloaded
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(url)
        img.onerror = () => reject(url)
        img.src = url
      })
    })
  )
}

/**
 * Preload images dengan silent error handling (tidak throw jika ada yang fail)
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImagesOptimistic = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

/**
 * Preload mixed assets (images + videos) without blocking
 * @param {Array} assetUrls - Array of asset URLs to preload
 */
export const preloadAssetsOptimistic = (assetUrls) => {
  assetUrls.forEach((url) => {
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.ogg')) {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.src = url
      video.load()
      return
    }
    const img = new Image()
    img.src = url
  })
}
