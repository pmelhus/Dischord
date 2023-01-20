import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Transforms } from "slate";
import { useState, useCallback, useEffect } from "react";
import { Node } from "slate";

const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];



const SlateTextEditor = ({
  sendChat,
  placeholder,
  chatInput,
  setChatInput,
}) => {
  const [editor] = useState(() => withReact(createEditor()));
  // console.log(editor);

  useEffect(() => {
    Transforms.select(editor, { offset: 0, path: [0, 0] });
  }, [])

  const checkIfIncludes = () => {
    return chatInput.includes("https://" || "http://");
  };


  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'link':
        return <LinkElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])



  const checkForLink = () => {
if (checkIfIncludes()) {
  let httpsIndex = chatInput.indexOf("https://");
  let httpIndex = chatInput.indexOf("http://");
  let selectedUrlHttps = chatInput.substring(httpsIndex).split(' ')[0]
  let selectedUrlHttp = chatInput.substring(httpIndex).split(' ')[0]


  Transforms.setNodes(
    editor,
    { type: 'link' },
    { match: n => Editor.isBlock(editor, n) }
  )
}
// console.log(editor)
// console.log(


  }

  // const renderElement = useCallback(([...props]) => {
  //   switch (props.element.type) {
  //     case "link":
  //       return <LinkElement {...props} />;
  //     default:
  //       return <DefaultElement {...props} />;
  //   }
  // }, []);

  return (
    // Add a toolbar with buttons that call the same methods.
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to state value
          setChatInput(serialize(value));

        }
      }}
    >
      <Editable
        renderElement={renderElement}
        onChange={checkForLink()}
        autoFocus={true}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            sendChat();
            Transforms.delete(editor, {
              at: [0],
            });
            editor.children = [
              {
                type: "paragraph",
                children: [{ text: "" }],
              },
            ];
          }

        }}
      />
    </Slate>
  );
};

const Leaf = (props) => {
  return <span {...props.attributes}>{props.children}</span>;
};

const LinkElement = (props) => {
 console.log(props.children[0].props.text.text)
  return (
   <a {...props.attributes} href={props.children}>

     {props.children}
   </a>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default SlateTextEditor;
