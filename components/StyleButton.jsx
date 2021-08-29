import React from 'react'

function StyleButton({ icon }) {
    return (
        <div className='rounded flex items-center justify-center p-3 cursor-pointer hover:bg-editr-xl-grey mx-1'>
            { icon }
        </div>
    )
}

export default StyleButton
