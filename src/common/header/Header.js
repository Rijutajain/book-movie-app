import React from "react"
import "./Header.css"
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import { Tab, Tabs, AppBar } from "@material-ui/core"
import { FormControl } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { Link, useHistory } from 'react-router-dom';
import { ContactSupportOutlined } from "@material-ui/icons";




function LoginPanel(props) {
    const history = useHistory();
    async function LoginHandler() {
        const param = window.btoa(addLoginForm.username + ":" + addLoginForm.password);
        console.log(param);
        try {
            const rawresponse = await fetch('http://localhost:8085/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json;charset=UTF-8",
                        "authorization": "Basic "+param,
                        
                    }
                })
            if (rawresponse.ok) {
                const response = await rawresponse.json();
                window.sessionStorage.setItem("access-token" , rawresponse.headers.get('access-token'));
                return true;
            }
            else {
                const errorback = await rawresponse.json();
                const error = new Error(errorback.message);
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }
        return false;
    }
    const { value, index } = props;
    const [addLoginForm, setAddLoginForm] = React.useState({
        username: '',
        password: ''

    });

    const inputChangedHandler = (e) => {
        const state = addLoginForm;
        state[e.target.name] = e.target.value;

        setAddLoginForm({ ...state })

    }
    async function onLogin(e) {
        var loggin = await LoginHandler();
        if(loggin===false){
           console.log("Relogin");
        }
        else{
        props.modalCloseFunction();
        props.setUserLoggedIn(true);
        sessionStorage.setItem("isUserLoggedInStorage", "true")
        history.push("/");

        }
        
    }
    return (
        <div>{value === index &&
            (<ValidatorForm className="loginform" onSubmit={onLogin}>
                <div>
                    <TextValidator label="UserName" id="username" type="text" name="username" value={addLoginForm.username} onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                    <TextValidator label="Password" id="password" type="password" name="password" value={addLoginForm.password} onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                </div>
                <Button type="submit" className="lAndRButton" variant="contained" color="primary">Login</Button>
            </ValidatorForm>)
        }
        </div>
    )

}
function RegisterPanel(props) {
    async function RegisterHandler() {
        const param = {email_address : addRegisterForm.email,
                      first_name : addRegisterForm.firstname,
                      last_name : addRegisterForm.lastname,
                      mobile_number : addRegisterForm.contact,
                      password : addRegisterForm.password}
        try {
            const rawresponse = await fetch('http://localhost:8085/api/v1/signup',
                {
                    body : JSON.stringify(param),
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type":"application/json;charset=UTF-8"
                        }
                })
            if (rawresponse.ok) {
                const response = await rawresponse.json();
                setregVisibility(true);
                return true;
            }
            else {
                const errorback = await rawresponse.json();
                const error = new Error(errorback.message);
                throw error;
            }
        } catch (e) {
            alert(e.message);
        }
        return false;
    }
    const [addRegisterForm, setAddRegisterForm] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        contact: ''
    });
    const inputChangedHandler = (e) => {
        const state = addRegisterForm;
        state[e.target.name] = e.target.value;

        setAddRegisterForm({ ...state })

    }

    const { value, index } = props;
    const [regVisibility, setregVisibility] = React.useState("hideVisibilityCss");
    function onRegister(e) {
        e.preventDefault();
        var registered=RegisterHandler();
        // const newVisibility = (regVisibility === "showVisibilityCss") ? "hideVisibilityCss" : "showVisibilityCss";
        // setregVisibility(newVisibility);
    }

    return (
        <div>{value === index &&
            (<ValidatorForm className="registerform" onSubmit={onRegister} >
                <div>
                    <TextValidator label="First Name" id="firstname" type="text" value={addRegisterForm.firstname} name="firstname" onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                    <TextValidator label="Last Name" id="lastname" type="text" value={addRegisterForm.lastname} name="lastname" onChange={inputChangedHandler} align="center" validators={['required']} errorMessages={['Required']}></TextValidator>
                    <TextValidator label="Email" id="email" type="text" value={addRegisterForm.email} name="email" onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                    <TextValidator label="Password" id="password" type="password" value={addRegisterForm.password} name="password" onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                    <TextValidator label="Contact no." id="contact" type="text" value={addRegisterForm.contact} name="contact" onChange={inputChangedHandler} validators={['required']} errorMessages={['Required']}></TextValidator>
                </div>
                <div className={regVisibility}>Registration Successful. Please Login!</div>
                <Button type="submit" className="lAndRButton" variant="contained" color="primary" >Register</Button>
            </ValidatorForm>)
        }
        </div>
    )

}

const Header = (props) => {
    const history = useHistory();
    const [userLoggedIn, setUserLoggedIn] = React.useState(sessionStorage.getItem("isUserLoggedInStorage")==="true");
    function logoutHandler() {
        sessionStorage.setItem("isUserLoggedInStorage", "false");
        setUserLoggedIn(false);
        sessionStorage.removeItem("access-token");
    }
    function bookshowHandler() {
        if (userLoggedIn === false) {
            changeModalToTrue()
        }
        else {
            history.push("/bookshow/"+props.bookshowid);
        }
    }
    function changeModalToTrue() {
        setModal(true);
    }
    function changeModalToFalse() {
        setModal(false);
    }
    const [openModal, setModal] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleTabs = (e, val) => {

        setValue(val);
    }
    return (
        <div className="outerDiv">
            <div className="header">
                <img className="logo" src={logo} alt="logo" />
                <div className="buttonsContainer">
                    {
                        userLoggedIn === false
                            ?
                            <div className="singlebuttonContainer">
                                <Button variant="contained" color="default" name="Login" onClick={changeModalToTrue}>Login</Button>
                            </div>
                            :
                            <div className="singlebuttonContainer">
                                <Button variant="contained" color="default" name="Logout" onClick={logoutHandler}>Logout</Button>
                            </div>
                    }


                    <div className="singlebuttonContainer">
                        {
                        props.showbookshow === "true"
                        ?
                        <Button classname ="bookshowVisibility" variant="contained" color="primary" onClick={bookshowHandler}>Book Show</Button>
                        :
                        console.log("No book show handler")
                        }
                    </div>
                   
                </div>
            </div>
            <Modal className="modalClass"
                isOpen={openModal}
                onRequestClose={changeModalToFalse}>

                <Tabs value={value} onChange={handleTabs}>
                    <Tab label="Login" />

                    <Tab label="Register" />
                </Tabs>

                <LoginPanel setUserLoggedIn={setUserLoggedIn} modalCloseFunction={changeModalToFalse} value={value} index={0}></LoginPanel>
                <RegisterPanel value={value} index={1}></RegisterPanel>
            </Modal>
        </div>
    );
}
export default Header;