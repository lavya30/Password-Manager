import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-full shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-white text-xl font-semibold">
          <span>&lt;Password
          </span>
          <span className="text-blue-400">Manager/&gt;</span>
        </div>
        <span className='gap-4 flex'>
          <button ><a href="https://github.com/lavya30" target='_blank' rel='noreferrer'><lord-icon
            src="https://cdn.lordicon.com/ioihllwu.json"
            trigger="in"
            delay="1500"
            state="in-reveal"
            colors="primary:#ffffff"
            style={{ width: 40, height: 40 }}
          ></lord-icon></a></button>
          <button><a href="https://www.linkedin.com/in/lavya-goel-173a26295/"><lord-icon
            src="https://cdn.lordicon.com/kpoplnek.json"
            trigger="in"
            delay="1500"
            state="in-reveal"
            colors="primary:#ffffff,secondary:#4bb3fd"
            style={{ width: 40, height: 40 }}
          ></lord-icon></a></button></span>
      </div>
    </nav>
  )
}

export default Navbar
