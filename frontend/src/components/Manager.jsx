import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid-random';



const Manager = () => {

  useEffect(() => {
    getPasswords();
  }, [])

  const getPasswords = async () => {
    try {
      let response = await fetch("http://localhost:3000/");
      let data = await response.json();
      setpasswordArray(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setpasswordArray([]);
    }
  }






  const [passwordArray, setpasswordArray] = useState([]);

  const [form, setForm] = useState({ "site": "", "username": "", "password": "" })
  const passwordRef = useRef(null);
  const showpassword = () => {
    // passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  }


  const savepassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert('Please fill all fields');
      return;
    }

    const newPassword = { id: uuid(), ...form };

    try {
      // Save to MongoDB via backend API
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword)
      });

      if (response.ok) {
        // Update local state
        setpasswordArray([...passwordArray, newPassword]);
        setForm({ "site": "", "username": "", "password": "" });
        toast.success('Password saved successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } else {
        throw new Error('Failed to save password');
      }
    } catch (error) {
      console.error('Error saving password:', error);
      alert('Failed to save password. Please try again.');
    }
  }

  const deletePassword = async (id) => {
    try {
      // Delete from MongoDB via backend API
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id })
      });

      if (response.ok) {
        // Update local state
        setpasswordArray(passwordArray.filter(item => item.id !== id));
        toast.success('Password deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } else {
        throw new Error('Failed to delete password');
      }
    } catch (error) {
      console.error('Error deleting password:', error);
      alert('Failed to delete password. Please try again.');
    }
  }

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });//
  }

  const copyPassword = (password) => {
    toast('Password Copied!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",

    });
    navigator.clipboard.writeText(password);
  }

  const editPassword = async (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    if (passwordToEdit) {
      // Remove the id from the form since we're editing
      const { id: passwordId, ...formData } = passwordToEdit;
      setForm(formData);

      // Delete the existing password first
      await deletePassword(id);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className=" fixed inset-0 -z-10 w-full min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="container mx-4 sm:mx-6 md:mx-auto rounded-xl relative z-10 mt-20 p-4 sm:p-6 md:p-8 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl backdrop-saturate-150 max-w-4xl w-full">
        <div className="space-y-6">
          {/* Website input - full width */}
          <div className="w-full">
            <input
              value={form.site}
              type="text"
              placeholder="Website"
              className="rounded-full w-full border border-white/30 px-6 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
              onChange={handlechange}
              name="site"
            />
          </div>

          {/* Username and Password - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={form.username

              }
              onChange={handlechange}
              name="username"
              type="text"
              placeholder="Username"
              className="rounded-full flex-1 border border-white/30 px-6 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
            />
            <input
              onChange={handlechange}
              name="password"
              value={form.password}
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="rounded-full flex-1 border border-white/30 px-6 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
            />
            <button className=' cursor-pointer flex justify-center items-center gap-2 px-4 py-3 text-white text-sm font-semibold shadow-lg hover:shadow-xl min-w-[100px]' onClick={showpassword}  >
              Show
              <lord-icon
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#ffffff"
                style={{ width: '18px', height: '18px' }}
              >
              </lord-icon>
            </button>
          </div>

          {/* Buttons - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
            <button className="border-black-2 bg-blue-950 rounded-full  w-40 h-13 text-white flex justify-center items-center gap-2 hover:bg-blue-900 transition-colors" onClick={savepassword}>
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
                colors="primary:#ffffff"
              >
              </lord-icon>
              Add
            </button>
            <button className="border-black-2 bg-blue-950 rounded-full  w-40 h-13 text-white flex justify-center items-center gap-2 hover:bg-blue-900 transition-colors" onClick={() => setForm({ "site": "", "username": "", "password": "" })}>
              <lord-icon
                src="https://cdn.lordicon.com/vgpkjbvw.json"
                trigger="hover"
                colors="primary:#ffffff"
              >
              </lord-icon>
              Cancel
            </button>
          </div>
        </div>

      </div>
      <div className="passwords flex flex-col items-center justify-center mt-10">
        <h2 className='text-white font-bold text-2xl mb-6'>Your Passwords</h2>
        {passwordArray.length === 0 && <p className='text-white text-lg'>No passwords saved yet.</p>}
        {passwordArray.length != 0 && (
          <div className="w-full max-w-4xl overflow-x-auto overflow-y-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/30 shadow-xl mx-4 sm:mx-0">
            <table className="table-auto text-white w-full ">
              <thead>
                <tr className='bg-white/20 backdrop-blur-sm border-b border-white/30'>
                  <th className='py-4 px-6 text-left font-semibold text-blue-200'>Site</th>
                  <th className='py-4 px-6 text-left font-semibold text-blue-200'>Username</th>
                  <th className='py-4 px-6 text-left font-semibold text-blue-200'>Password</th>
                  <th className='py-4 px-6 text-center font-semibold text-blue-200'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  passwordArray.map((item, index) => (
                    <tr key={index} className='hover:bg-white/10 transition-colors duration-200 border-b border-white/20'>
                      <td className='py-4 px-6 text-white'>
                        <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100">
                          {item.site}
                        </a>
                      </td>
                      <td className='py-4 px-6 text-white'>{item.username}</td>
                      <td className='py-4 px-6 text-white max-w-xs'>
                        <div className='flex items-center gap-3'>
                          <span
                            className="truncate max-w-[200px] font-mono text-sm"
                            title={item.password}
                          >
                            {item.password}
                          </span>
                          <button
                            className='cursor-pointer hover:scale-110 transition-transform text-blue-300 hover:text-blue-100 flex-shrink-0'
                            onClick={() => copyPassword(item.password)}
                            title="Copy password"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="copy-icon" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className='py-4 px-6 text-center'>
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => deletePassword(item.id)}
                            className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-full  text-sm font-medium flex items-center gap-2 cursor-pointer"
                            title="Delete password"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{ width: '20px', height: '20px' }}>
                            </lord-icon>
                            Delete
                          </button>
                          <button
                            onClick={() => editPassword(item.id)}
                            className="bg-blue-600/80 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium flex items-center gap-2 cursor-pointer"
                            title="Edit password"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/cbtlerlm.json"
                              trigger="hover"
                              stroke="bold"
                              state="hover-line"
                              colors="primary:#ffffff"
                              style={{ width: '20px', height: '20px' }}
                            >
                            </lord-icon>
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

    </>
  )
}

export default Manager
