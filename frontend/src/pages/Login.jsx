import AuthFormLayout from '../components/AuthFormLayout';

function Login() {


  return (
    <AuthFormLayout>
      <div className="mt-2 flex flex-col gap-4">
        <input type="email" className="form-input" placeholder="Email" />
        <input type="password" className="form-input" placeholder="Password" />
      </div>

      <div className="my-8">
        <button className="btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </AuthFormLayout>
  );
}

export default Login;
