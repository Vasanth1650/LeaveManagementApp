import axios from 'axios'
const VIEW_BASE_URL = "http://localhost:9090/addnew"

class AuthService{

    updateAuthority(id,authority){
        return axios.put(VIEW_BASE_URL+'/updateAuthority/'+id,authority)
    }

    getAllUsers(){
        return axios.get(VIEW_BASE_URL+'/getAllUsers')
    }

    getById(id){
        return axios.get(VIEW_BASE_URL+'/getAuthority/'+id)
    }
    

}

export default new AuthService()