import { get } from 'jquery'
import ServerActions from './Actions/ServerActions'

let API = {
    fetchLinks() {
        console.log("1. Inside the API")
        get('/data').done(resp => {
            ServerActions.recieveLinks(resp)
            console.log(resp)
        })
    }
};

export default API;