import Head from 'next/head'
import Header from '../components/Header'
import StyleBar from '../components/StyleBar'
import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'


export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. ' }],
    },
  ])
  return (
    <>
      <Head>
        <title>Editr. - yet another simple Rich Text Editor</title>
      </Head>
      <Header />
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-min'>
          <StyleBar />
          <hr className='bg-editr-light-grey h-0.5 w-full mt-2 mb-12' />
          <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <Editable className='font-light font-rubik w-full' />
          </Slate>
        </div>
      </div>
    </>
  )
}
