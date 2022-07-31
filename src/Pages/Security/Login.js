//Dashboard Main Page UI Responsive For Every Devices

import React, { useEffect } from 'react'
import { useState } from 'react'
import './Styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { authenticate, authFailure, authSuccess } from '../../Redux/AuthAction'
import { Alert } from 'react-bootstrap';
import { userLogin } from '../../Api/AuthenticationService'
import { connect } from 'react-redux'
import { fetchUserData } from '../../Api/AuthenticationService'




const Login = ({loading,error, ...props})=> {
    const usenavigate = useNavigate();
    const [data,setData] = useState({})
    const [values, setValues] = useState({
        username:'',
        password:''
    });
    const[check,setCheck] = useState('')

    

    useEffect(() => {
        if (check) {
            usenavigate(-1)
        }
    }, [check])

    useEffect(()=>{
        setCheck(data.username)
    },[])

    React.useEffect(() => {
        fetchUserData().then((response) => {

            setData(response.data);
        }).catch((e) => {
            localStorage.clear();
        })
    }, [])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();
        userLogin(values).then((response) => {
            console.log("response", response);
            if (response.status === 200) {
                props.setUser(response.data);
                localStorage.setItem("Assign",true);

                usenavigate("/dashboard");
                
            }
            else {
                props.loginFailure('Something Wrong!Please Try Again');
            }
        }).catch((err) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again');
                }
            }
        });
        //console.log("Loading again",loading);
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    console.log("Loading ", loading);






    
      
    return (
        <div className='login'>
            <section>
                <div class="container">
                    <div class="user signinBx">
                        <div class="imgBx"><img src="https://www.hellokpop.com/wp-content/uploads/2020/03/2020030401000261100015281.jpg" alt="" /></div>
                        <div class="formBx">


                            <div >
                                <div >

                                    <div >
                                        <div >
                                            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="/" role="tab" aria-controls="home" aria-selected="true">Login</a>
                                                </li>
                                                
                                            </ul>
                                            <br></br>
                                            <h4 className="gradient">Login</h4>

                                            <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                                                <div className="gradient">
                                                    
                                                    <input id="username" type="email" minLength={5}
                                                       placeholder='Enter Email' value={values.username} onChange={handleChange} name="username" required />

                                                    <div className="invalid-feedback">
                                                        UserId is invalid
                                                    </div>



                                                </div>

                                                <div className="gradient">
                                                    <input id="password" type="password" 
                                                       placeholder='Enter Password' value={values.password} onChange={handleChange} name="password" required />
                                                    <div className="invalid-feedback">
                                                        Password is required
                                                    </div>
                                                </div>




                                                <div className="form-group m-0">
                                                    <button type="submit" className="btn btn-primary">

                                                        Login


                                                    </button>
                                                </div>
                                                <p class="signup">
                                                    Don't have an account ?
                                                    <a href="/signup" onclick="toggleForm();">Sign Up.</a>
                                                </p>
                                            </form>
                                            {error &&
                                                <Alert style={{ marginTop: '20px' }} variant="danger">
                                                    {error}
                                                </Alert>

                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



const mapStateToProps = ({ auth }) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);