import Axios from 'axios'
const base_url="http://localhost:4000"
export default function SubmitURLs(urls){
    const token = localStorage.getItem('token');
    return Axios.post(`${base_url}/scrap`,urls,{
        headers:{
            authorization:`Basic ${token}`
        }
    })
}