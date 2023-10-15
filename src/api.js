import axios from 'axios'
import MD5 from 'crypto-js/md5'
import {key, privatekey} from './apisettings.js'

const ts = Date.now()
const hash = MD5(ts + privatekey + key).toString()

const api = axios.create({
    baseURL:'http://gateway.marvel.com/v1/public',
    params :{
        ts,
        apikey: key,
        hash
    }
})

export default api