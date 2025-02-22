import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthFormLayout from '../components/AuthFormLayout';
import { signUp } from '../store/slices/authSlice';

import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { isSigningUp } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm() && dispatch(signUp(formData));
  };

  return (
    <AuthFormLayout>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex flex-col gap-4">
          <input type="text" className="form-input"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
            }}
          />
          <input type="email" className="form-input" placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
          />
          <input type="password" className="form-input" placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
          />
        </div>

        <div className="my-8">
          <button className="btn-primary" type="submit" disabled={isSigningUp}>
            {
              isSigningUp ?
                <>
                  <LoaderCircle className="animate-spin" />
                  Signing Up...
                </>
                :
                'Sign Up'
            }
          </button>
        </div>
      </form>

      <div className='text-center'>
        <p className='text-sm text-gray-500'>
          Already have an account?{" "}
          <Link to="/login" className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </AuthFormLayout>
  );
}

export default Register;