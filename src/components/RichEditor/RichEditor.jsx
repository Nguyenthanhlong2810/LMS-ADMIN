import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.scss';
import { UserAPI } from 'apis/User';

function RichEditor({ value, onChange, onBlur, onFocus, ...editorProps }) {
  const editorRef = useRef(null);
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append('file', file);
            body.append('fileType', 'OTHER');
            UserAPI.uploadSingleFile(body)
              .then((res) => {
                resolve({
                  default: `${process.env.REACT_APP_MEDIA_URL}/${res.data.previewUrl}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const handleReady = (editor) => {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
    editorRef.current = editor;
  };

  const handleError = ({ willEditorRestart }) => {
    // This is why you need to remove the older toolbar.
    if (willEditorRestart) {
      editorRef.current?.ui.view.toolbar.element.remove();
    }
  };

  const handleChange = (_, editor) => {
    const data = editor.getData();
    if (onChange) {
      onChange(data);
    }
  };

  const handleBlur = (_, editor) => {
    if (onBlur) {
      onBlur(editor);
    }
  };

  const handleFocus = (_, editor) => {
    if (onFocus) {
      onFocus(editor);
    }
  };

  return (
    <CKEditor
      onReady={handleReady}
      onError={handleError}
      onChange={handleChange}
      // editor={DecoupledEditor}
      editor={ClassicEditor}
      // id="editor"
      data={value}
      config={{
        extraPlugins: [uploadPlugin],
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            // 'subscript',
            // 'superscript',
            '|',
            'alignment',
            '|',
            // 'fontfamily',
            // 'fontsize',
            // '|',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            'insertTable',
            '|',
            'imageUpload',
            'undo',
            'redo'
          ]
        }
      }}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...editorProps}
    />
  );
}

RichEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default RichEditor;
