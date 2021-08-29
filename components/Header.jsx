import React from 'react'
import Arrow from '../public/svg/Arrow'
import Logo from '../public/svg/Logo'

function Header() {
    return (
        <div>
        <div className='flex items-center justify-between pr-9 pl-6 py-2'>
          <div className='flex flex-row items-center justify-start'>
            <div className='cursor-pointer rounded bg-editr-white hover:bg-editr-light-grey p-3'>
              <Arrow />
            </div>
            <div className='ml-6 mr-9 h-14 border-editr-light-grey border border-l-0.5'></div>
            <Logo />
          </div>
          <div>
            <a href="https://github.com/hisamafahri/editr" target="_blank" rel="noopener noreferrer">
              <p className='font-rubik text-sm text-editr-dark-grey hover:underline cursor-pointer'>--- yet another simple Rich Text Editor</p>
            </a>
          </div>
        </div>
        <hr className='bg-editr-light-grey h-0.5' />
      </div>
    )
}

export default Header
