import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import useFetch from '../hooks/useFetch'
import validateManyFields from '../validations'
import Input from '../components/utils/Input'
import Loader from '../components/utils/Loader'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState({});
  const [resetLink, setResetLink] = useState("");
  const [fetchData, { loading }] = useFetch();

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateManyFields("forgotPassword", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/forgot-password", method: "post", data: formData };
    try {
      const data = await fetchData(config, { showSuccessToast: true, showErrorToast: true });
      if (data?.resetUrl) setResetLink(data.resetUrl);
    }
    catch (err) {
      setResetLink("");
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
              <h2 className='text-center mb-4'>Forgot your password?</h2>
              <div className="mb-4">
                <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
                <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
                {fieldError("email")}
              </div>

              <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Send reset link</button>

              {resetLink && (
                <div className='mt-4 p-4 bg-green-50 border border-green-200 text-sm'>
                  Reset link created:
                  <a href={resetLink} className='block text-blue-600 break-all' target='_blank' rel='noreferrer'>{resetLink}</a>
                </div>
              )}

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

export default ForgotPassword;
