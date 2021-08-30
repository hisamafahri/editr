import React from 'react'
import StyleButton from '../components/StyleButton'
import { BoldIcon, ItalicIcon, UnderlineIcon, LeftAlignIcon, CenterAlignIcon, RightAlignIcon, H1Icon, H2Icon, InlineCodeIcon, CodeBlockIcon } from '../public/svg/StyleIcons'

function StyleBar() {
    return (
        <div className='flex flex-row items-center justify-center px-9 py-4 my-2 w-min'>
            <StyleButton icon={<BoldIcon />} />
            <StyleButton icon={<ItalicIcon />} />
            <StyleButton icon={<UnderlineIcon />} />
            <div className='mx-6 h-12 border-editr-light-grey border border-l-0.5'></div>
            <StyleButton icon={<LeftAlignIcon />} />
            <StyleButton icon={<CenterAlignIcon />} />
            <StyleButton icon={<RightAlignIcon />} />
            <div className='mx-6 h-12 border-editr-light-grey border border-l-0.5'></div>
            <StyleButton icon={<H1Icon />} />
            <StyleButton icon={<H2Icon />} />
            <div className='mx-6 h-12 border-editr-light-grey border border-l-0.5'></div>
            <StyleButton icon={<InlineCodeIcon />} />
            <StyleButton icon={<CodeBlockIcon />} />
        </div>
    )
}

export default StyleBar
