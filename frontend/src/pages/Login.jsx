import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthFormLayout from '../components/AuthFormLayout';
import { signIn } from '../store/slices/authSlice';

import toast from 'react-hot-toast';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isLoggingIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData));
  };

  return (
    <AuthFormLayout>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex flex-col gap-4">
          <input type="email" className="form-input" placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData, email: e.target.value
            })}
          />
          <input type="password" className="form-input" placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({
              ...formData, password: e.target.value
            })}
          />
        </div>

        <div className="my-8">
          <button className={`${isLoggingIn ? "btn-disabled" : "btn-primary"}`} disabled={isLoggingIn}>
            {isLoggingIn ? "Logging In..." : 'Login'}
          </button>
        </div>
      </form>

      <div className='text-center'>
        <p className='text-sm text-gray-500'>
          Don't have an account?{" "}
          <Link to="/register" className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </AuthFormLayout>
  );
}

export default Login;
