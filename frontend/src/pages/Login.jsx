import { useState } from 'react';
import useAuthStore from '../store/useAuthStore.js';

const Login = () => {

    const handleLogin = useAuthStore((state) => state.handleLogin);
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formData.phone, formData.password);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='phone' placeholder='enter the number' value={formData.phone} onChange={handleOnChange}/>
            <input type="password" name='password' placeholder='enter the password' value={formData.password} onChange={handleOnChange}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login;