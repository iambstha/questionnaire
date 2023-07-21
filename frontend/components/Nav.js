import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <nav className=''>
        <ul className=' flex justify-center items-center gap-4 border border-slate-300 p-4 '>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/users'>All Users</Link></li>
            <li><Link href='/take-test'>Take Test</Link></li>
            <li><Link href='/profile'>My Profile</Link></li>
        </ul>
    </nav>
  )
}

export default Nav