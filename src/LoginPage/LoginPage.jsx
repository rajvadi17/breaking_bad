import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



function LoginPage() {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const location = useLocation();


    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            let users = JSON.parse(window.localStorage.getItem('users'));
            if(users.filter(obj => obj.username == username).length && users[0].password == password){
                const { from } = location.state || { from: { pathname: "/home" } };
                window.localStorage.setItem('logged_in_user',JSON.stringify(users[0]));
                debugger;
                history.push('/home');
            } else {
                alert('User not registered !!! Please Register');
            }
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2 className="col-md-6">Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group col-md-6">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group col-md-6">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group col-md-6">
                    <button className="btn btn-primary">
                        Login
                    </button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    );
}

export { LoginPage };