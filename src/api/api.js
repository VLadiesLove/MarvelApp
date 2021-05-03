import Axios from 'axios';
import md5 from 'md5'

const apiKey = "4523ef32bb835bc264b68b98073c432b"
const privateKey = "3d4906fbfa661b5464cb61dbba1772138ff44964"
const instance = Axios.create({
    baseURL: 'https://gateway.marvel.com/'
})

export const getCharacters = (offset) => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + apiKey)
    return instance.get(`v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}&limit=20&offset=${offset*20}`)
}

export const getComics = (id) => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + apiKey)
    return instance.get(`v1/public/characters/${id}/comics?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
}

export const getSeries = (id) => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + apiKey)
    return instance.get(`v1/public/characters/${id}/series?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
}

export const getEvents = (id) => {
    const ts = Date.now();
    const hash = md5(ts + privateKey + apiKey)
    return instance.get(`v1/public/characters/${id}/events?ts=${ts}&apikey=${apiKey}&hash=${hash}`)
}



