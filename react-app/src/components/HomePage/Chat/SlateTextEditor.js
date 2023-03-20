import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Transforms } from "slate";
import { useState, useCallback, useEffect } from "react";
import { Node } from "slate";
import { createUseStyles, useTheme } from "react-jss";
import CustomEditable from "./CustomEditable";
import "./SlateTextEditor.css";

const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

const useStyles = createUseStyles((theme) => ({}));

const SlateTextEditor = ({
  sendChat,
  editMessage,
  placeholder,
  chatInput,
  setChatInput,
  setHighlight,
  setShowEditor,
  errors,
}) => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: `${chatInput}` }],
    },
  ];
  useEffect(() => {
    Transforms.select(editor, { offset: 0, path: [0, 0] });
  }, []);

  const checkIfIncludes = () => {
    return chatInput.includes("https://" || "http://");
  };

  const renderElement = useCallback((props) => {
    return <DefaultElement {...props} />;
  }, []);

  const findUrlsInText = (text) => {
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

    const matches = text.match(urlRegex);

    return matches
      ? matches.map((m) => [m.trim(), text.indexOf(m.trim())])
      : [];
  };

  const myDecorator = ([node, path]) => {
    const nodeText = node.text;

    if (!nodeText) return [];

    const urls = findUrlsInText(nodeText);

    return urls.map(([url, index]) => {
      return {
        anchor: {
          path,
          offset: index,
        },
        focus: {
          path,
          offset: index + url.length,
        },
        decoration: "link",
      };
    });
  };

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.decoration === "link") {
      children = (
        <a
          style={{ cursor: "pointer" }}
          href={leaf.text}
          onClick={() => {
            window.open(leaf.text, "_blank", "noopener,noreferrer");
          }}
        >
          {children}
        </a>
      );
    }

    return <span {...attributes}>{children}</span>;
  };
  // const renderElement = useCallback(([...props]) => {
  //   switch (props.element.type) {
  //     case "link":
  //       return <LinkElement {...props} />;
  //     default:
  //       return <DefaultElement {...props} />;
  //   }
  // }, []);
  useEffect(() => {
    Transforms.select(editor, Editor.end(editor, []));
  }, []);

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
      <CustomEditable
        decorate={myDecorator}
        renderElement={renderElement}
        renderLeaf={Leaf}
        autoFocus={true}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await event.preventDefault();
           const sentChat = await sendChat();
            if (!sentChat.errors) {
              await Transforms.delete(editor, {
                at: [0],
              });
              editor.children = [
                {
                  type: "paragraph",
                  children: [{ text: "" }],
                },
              ];
            }
            await Transforms.select(editor, { offset: 0, path: [0, 0] });
            if (editMessage) {
             await setShowEditor(false);
            }
          }
        }}
      />
    </Slate>
  );
};

const DefaultElement = (props) => {
  return (
    <p className="slate-paragraph" {...props.attributes}>
      {props.children}
    </p>
  );
};

export default SlateTextEditor;
