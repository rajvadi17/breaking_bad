import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



window.localStorage.setItem('users', JSON.stringify([]))


function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [msg, setMsg] = useState('');
    const [err, errMsg] = useState('');


    useEffect(() => {
        const timer = setTimeout(() => {
            setMsg('');
            errMsg('');
        }, 1000);
        return () => {
           
            clearTimeout(timer);
        }
      }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            let users = JSON.parse(window.localStorage.getItem('users'));
            if(!users.filter(obj => obj.username == user.username).length){
                users.push(user);
                window.localStorage.removeItem('users');
                window.localStorage.setItem("users", JSON.stringify(users));
                setMsg('User registered successfully');
                setTimeout(() =>history.push('/login'), 2000);
            } else {
                errMsg('User already exist');
            }
            
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>User Register</h2>
            <form name="form" onSubmit={handleSubmit}>
            {msg.length ? <div className="alert alert-success" role="alert">
                {msg}
                </div> : null}
                {err.length ? <div className="alert alert-danger" role="alert">
                {err}
                </div> : null}
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };