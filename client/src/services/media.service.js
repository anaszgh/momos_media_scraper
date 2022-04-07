import Axios from 'axios'
const base_url="http://localhost:4000"

export function Search(type,keywords,page=1){
    const token = localStorage.getItem('token');
    return Axios.get(`${base_url}/media/search?type=${type}&keywords=${keywords}&page=${page}`,{
        headers:{
            authorization:`Basic ${token}`
        }
    })
}