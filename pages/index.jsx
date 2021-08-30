import Head from 'next/head'
import Header from '../components/Header'
import StyleBar from '../components/StyleBar'
import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'


export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph. A line of text in a paragraph.\n\n' }],
    },
    {
      type: 'code',
      children: [{ text: 'console.log("Hello, world!");' }],
    },
  ])
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
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
            <Editable
              className='font-light font-rubik w-full'
              renderElement={renderElement}
              onKeyDown={event => {
                if (event.key === '`' && event.ctrlKey) {
                  event.preventDefault()
                  const [match] = Editor.nodes(editor, {
                    match: n => n.type === 'code',
                  })
                  Transforms.setNodes(
                    editor,
                    { type: match ? 'paragraph' : 'code' },
                    { match: n => Editor.isBlock(editor, n) }
                  )
                }
              }}
            />
          </Slate>
        </div>
      </div>
    </>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes} className='bg-editr-dark-blue'>
      <code className='whitespace-pre-wrap text-editr-white font-mono px-4 my-4'>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}