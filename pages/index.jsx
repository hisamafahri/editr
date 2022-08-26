import Head from 'next/head'
import Header from '../components/Header'
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

  isInlineCodeActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.inlineCode === true,
    })

    return !!match
  },

  isH1Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'h1',
    })

    return !!match
  },

  isH2Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'h2',
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

  toggleInlineCode(editor) {
    const isActive = CustomEditor.isInlineCodeActive(editor)
    Transforms.setNodes(
      editor,
      { inlineCode: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleH1(editor) {
    const isActive = CustomEditor.isH1Active(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'h1' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleH2(editor) {
    const isActive = CustomEditor.isH2Active(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'h2' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), [])

  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{ text: 'This is an H1. You can click Ctrl + 1.' }],
    },
    {
      type: 'h2',
      children: [{ text: 'This is an H2. You can click Ctrl + 2.\n' }],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'A line of text in a paragraph. ' },
        { text: 'And this is a bold text (Ctrl + B). ', bold: true },
        { text: 'A line of text in a paragraph. ' },
        { text: 'And this is an italic text (Ctrl + I). ', italic: true },
        { text: 'A line of text in a paragraph. ' },
        { text: 'And this is an underlined text (Ctrl + U). ', underline: true },
        { text: 'A line of text in a paragraph. ' },
        { text: 'And some codes here (Ctrl + Q).', inlineCode: true }
      ],
    },
    {
      type: 'leftAlign',
      children: [{ text: '\nThis is a left aligned text. You can click Ctrl + L.\n' }],
    },
    {
      type: 'centerAlign',
      children: [{ text: 'This is a center aligned text. You can click Ctrl + E.\n' }],
    },
    {
      type: 'rightAlign',
      children: [{ text: 'This is a right aligned text. You can click Ctrl + R.\n' }],
    },
    {
      type: 'code',
      children: [{ text: '\nconsole.log("Hello, world!"); // You can click Ctrl + `\n' }],
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
      case 'h1':
        return <H1Element {...props} />
      case 'h2':
        return <H2Element {...props} />
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
      <div className='flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-1/2'>

          <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <Editable
              className='font-light font-rubik w-full mt-14'
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={event => {
                if (!event.ctrlKey || !event.metaKey) {
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

                  case 'q': {
                    event.preventDefault()
                    CustomEditor.toggleInlineCode(editor)
                    break
                  }

                  case '1': {
                    event.preventDefault()
                    CustomEditor.toggleH1(editor)
                    break
                  }

                  case '2': {
                    event.preventDefault()
                    CustomEditor.toggleH2(editor)
                    break
                  }
                }
              }}
            />
          </Slate>
        </div>
      </div>
      <div className='h-56'></div>
    </>
  )
}

const Leaf = props => {
  return (
    <span {...props.attributes} style={{
      fontWeight: props.leaf.bold ? 'bold' : 'light',
      fontStyle: props.leaf.italic ? 'italic' : 'light',
      textDecoration: props.leaf.underline ? 'underline' : 'light',
    }}
      className={props.leaf.inlineCode ? 'font-mono bg-editr-dark-blue text-editr-white' : null}
    >
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

const H1Element = props => {
  return (
    <h1 {...props.attributes} className='text-4xl font-bold rounded'>
      {props.children}
    </h1>
  )
}

const H2Element = props => {
  return (
    <h2 {...props.attributes} className='text-2xl font-bold rounded'>
      {props.children}
    </h2>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes} className='bg-editr-dark-blue px-4'>
      <code className='whitespace-pre-wrap text-editr-white font-mono'>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}