import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Button from "../button/button.component";
import { EditorContainer } from "./editor-text.styles";
interface IEditor {
  onSubmit: (text: string) => void;
  onCancel: () => void;
  textContent: string;
}

const EditorText = ({ onSubmit, onCancel, textContent }: IEditor) => {
  const [content, setContent] = useState(textContent);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const setContentForEditor = (text: string) => {
    const contentBlock = htmlToDraft(text);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const _editorState = EditorState.createWithContent(contentState);
    setEditorState(_editorState);
    setContent(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
  };

  const handleSubmitEditor = async () => {
    await onSubmit(content);
    setContentForEditor("");
  };

  const handdleCancel = () => {
    onCancel();
    setContentForEditor("");
  };

  //get default text and show in text editor
  useEffect(() => {
    setContentForEditor(textContent);
  }, [textContent]);

  return (
    <EditorContainer>
      <Editor
        editorState={editorState}
        wrapperClassName="card"
        editorClassName="card-body"
        onEditorStateChange={(newState) => {
          setEditorState(newState);
          setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
        }}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "embedded",
            "emoji",
            "image",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
      <div>
        <Button onClickHandler={handleSubmitEditor} label="Save" />
        <Button onClickHandler={handdleCancel} label="Cancel" />
      </div>
    </EditorContainer>
  );
};

export default EditorText;
