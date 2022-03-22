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




function LoginPanel(props) {
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
    function onLogin(e) {
        props.modalCloseFunction();
        props.setUserLoggedIn(true);
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
        const newVisibility = (regVisibility === "showVisibilityCss") ? "hideVisibilityCss" : "showVisibilityCss";
        setregVisibility(newVisibility);
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
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    function logoutHandler(){
        setUserLoggedIn(false);
    }
    function bookshowHandler(){
        if(userLoggedIn===false){
            changeModalToTrue()
        }
        else{
            history.push("/bookshow/tybhtyh");
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
                        <Button variant="contained" color="primary" onClick={bookshowHandler}>Book Show</Button>
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