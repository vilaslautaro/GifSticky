
// llamamos a la api que trae los GIFS
export function getGifs({keyword = 'bitcoin'} = {}) {

    const apiKey = 'l37MmYPXXkcLpKQ7gvfLYAyj4bGpIJVz';
    const apiGifURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=9&offset=0&rating=g&lang=es`;
    // luego pasar esto a async await
    return fetch(apiGifURL)
        .then(res => res.json())
        .then(response => {
            const { data } = response
            if (Array.isArray(data)) {
                const gifs = data.map(image => {
                    const { title, id} = image;
                    const {url} = image.images.downsized_medium;
                    return {title, id, url}
                    });
                return gifs;
            }
        });
}