import Head from 'next/head'
import Header from '../components/Header'
import StyleBar from '../components/StyleBar'
import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    })

    return !!match
  },

  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.underline === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  isAlignLeftActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'leftAlign',
    })

    return !!match
  },

  isAlignCenterActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'centerAlign',
    })

    return !!match
  },

  isAlignRightActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'rightAlign',
    })

    return !!match
  },

  // BORDER =================================================================================================================

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },


  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },


  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleAlignLeft(editor) {
    const isActive = CustomEditor.isAlignLeftActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'leftAlign' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleAlignCenter(editor) {
    const isActive = CustomEditor.isAlignCenterActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'centerAlign' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleAlignRight(editor) {
    const isActive = CustomEditor.isAlignRightActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'rightAlign' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

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

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'leftAlign':
        return <LeftAlignElement {...props} />
      case 'centerAlign':
        return <CenterAlignElement {...props} />
      case 'rightAlign':
        return <RightAlignElement {...props} />
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
              renderLeaf={renderLeaf}
              onKeyDown={event => {
                if (!event.ctrlKey) {
                  return
                }

                switch (event.key) {
                  case '`': {
                    event.preventDefault()
                    CustomEditor.toggleCodeBlock(editor)
                    break
                  }

                  case 'b': {
                    event.preventDefault()
                    CustomEditor.toggleBoldMark(editor)
                    break
                  }

                  case 'u': {
                    event.preventDefault()
                    CustomEditor.toggleUnderlineMark(editor)
                    break
                  }

                  case 'i': {
                    event.preventDefault()
                    CustomEditor.toggleItalicMark(editor)
                    break
                  }

                  case 'l': {
                    event.preventDefault()
                    CustomEditor.toggleAlignLeft(editor)
                    break
                  }

                  case 'e': {
                    event.preventDefault()
                    CustomEditor.toggleAlignCenter(editor)
                    break
                  }

                  case 'r': {
                    event.preventDefault()
                    CustomEditor.toggleAlignRight(editor)
                    break
                  }
                }
              }}
            />
          </Slate>
        </div>
      </div>
    </>
  )
}

const Leaf = props => {
  return (
    <span {...props.attributes} style={{
      fontWeight: props.leaf.bold ? 'bold' : 'light',
      fontStyle: props.leaf.italic ? 'italic' : 'light',
      textDecoration: props.leaf.underline ? 'underline' : 'light'
    }} >
      {props.children}
    </span>
  )
}

const LeftAlignElement = props => {
  return (
    <div {...props.attributes} className='text-left'>
      {props.children}
    </div>
  )
}

const CenterAlignElement = props => {
  return (
    <div {...props.attributes} className='text-center'>
      {props.children}
    </div>
  )
}

const RightAlignElement = props => {
  return (
    <div {...props.attributes} className='text-right'>
      {props.children}
    </div>
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