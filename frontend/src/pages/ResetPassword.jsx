import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import useFetch from '../hooks/useFetch'
import validateManyFields from '../validations'
import Input from '../components/utils/Input'
import Loader from '../components/utils/Loader'

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Reset Password";
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateManyFields("resetPassword", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: `/auth/reset-password/${token}`, method: "post", data: formData };
    try {
      await fetchData(config, { showSuccessToast: true, showErrorToast: true });
      navigate('/login');
    }
    catch (err) {
      // error message already handled by useFetch toast
    }
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center mb-4'>Reset your password</h2>
              <div className="mb-4">
                <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">New Password</label>
                <Input type="password" name="password" id="password" value={formData.password} placeholder="Enter new password" onChange={handleChange} />
                {fieldError("password")}
              </div>

              <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Reset password</button>

              <div className='pt-4'>
                <Link to="/login" className='text-blue-400'>Back to Login</Link>
              </div>
            </>
          )}
        </form>
      </MainLayout>
    </>
  )
}

export default ResetPassword;
