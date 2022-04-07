import Axios from 'axios'
const base_url="http://localhost:4000"
export function Login(username,password){
    return Axios.post(`${base_url}/account/login`,{
        email:username,
        password:password
    });
}
export async function Register(username, password, firstName,lastName){
    return Axios.post(`${base_url}/account/register`,{
        email:username,
        password:password,
        firstName:firstName,
        lastName:lastName
    });
}