import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between bg-indigo-900 text-white py-3 px-7'>
        <div className="log">
          <span className='font-bold text-xl'><a href="./index.html">iTask</a></span>
        </div>
        <div>
          <ul className='flex gap-5'>
            <li className='cursor-pointer hover:font-bold transition-all' >Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar