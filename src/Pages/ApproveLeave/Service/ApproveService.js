import axios from 'axios'
const VIEW_BASE_URL = "http://localhost:9090/leave"

class Approve{


    getByUserId(id){
        return axios.get(VIEW_BASE_URL+'/getByUserid/'+id)
    }


    getByIds(id){
        return axios.get(VIEW_BASE_URL+'/'+id)
    }


    deleteById(id){
        return axios.delete(VIEW_BASE_URL+'/'+id)
    }

    getBySuperVisor(supervisor){
        return axios.get(VIEW_BASE_URL+'/getBySuperVisor/'+supervisor)
    }

    getAllRequest(){
        return axios.get(VIEW_BASE_URL+'/getAllLeaves')
    }


    updateRequest(id,leaves){
        return axios.put(VIEW_BASE_URL+'/updateleave/'+id,leaves)
    }

}

export default new Approve()