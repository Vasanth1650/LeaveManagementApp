import axios from 'axios'
const VIEW_BASE_URL = "http://localhost:9090/leave"

class ViewService{


    getByUserId(id){
        return axios.get(VIEW_BASE_URL+'/getByUserid/'+id)
    }


    getByIds(id){
        return axios.get(VIEW_BASE_URL+'/'+id)
    }


    deleteById(id){
        return axios.delete(VIEW_BASE_URL+'/'+id)
    }

}

export default new ViewService()