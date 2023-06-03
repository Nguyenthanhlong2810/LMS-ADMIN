import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import { TextHelper } from 'components/Layout/Layout';
import { cloneDeep } from 'lodash';
import ImageUploader from 'quill-image-uploader';
import { UserAPI } from 'apis/User';

Quill.register('modules/imageUploader', ImageUploader);

/*
 * Simple editor component that takes placeholder text as a prop
 */
const imageUploader = {
  upload: (file) => {
    return new Promise((resolve, reject) => {
      const body = new FormData();

      body.append('file', file);
      body.append('fileType', 'OTHER');
      UserAPI.uploadSingleFile(body)
        .then((res) => {
          resolve(`${process.env.REACT_APP_MEDIA_URL}/${res.data.previewUrl}`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
export default class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.quillRef = null; // Quill instance
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  componentDidMount() {
    this.attachQuillRefs();
    this.forceUpdate();
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  handleChange(html) {
    const quill = this.quillRef;
    if (quill && this.props.maxLength) {
      const limit = this.props.maxLength;
      quill.on('text-change', function () {
        const txt = quill.getText();

        if (txt.length > limit) {
          quill.deleteText(limit, quill.getLength());
        }
      });
    }
    if (this.props.onChange) {
      const quillRef = this.quillRef || this.reactQuillRef?.getEditor();
      const length = this.getTextLength();
      this.props.onChange(html, length, quillRef?.getText());
    }
  }

  //get text length without space
  getTextLength = () => {
    const quillRef = this.quillRef || this.reactQuillRef?.getEditor();
    if (quillRef) {
      const text = quillRef.getLength();
      return text > 0 ? text - 1 : 0; //minus default \n
    }
    return 0;
  };

  render() {
    const txtLength = this.getTextLength();
    const modules = cloneDeep(QuillEditor.modules);
    if (this.props.allowImage) {
      modules.toolbar[3].push('image');
      modules.imageUploader = imageUploader;
    }
    const formats = this.props.allowImage
      ? [...QuillEditor.formats, 'image', 'imageBlot']
      : QuillEditor.formats;

    return (
      <div style={{ backgroundColor: 'white' }}>
        <ReactQuill
          theme="snow"
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          onChange={this.handleChange}
          value={this.props.value}
          modules={modules}
          formats={formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
          readOnly={this.props.disabled}
        />
        {txtLength >= 0 && this.props.maxLength > 0 && (
          <TextHelper>
            {txtLength}/{this.props.maxLength ?? 0}
          </TextHelper>
        )}
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link']
    // ['clean']
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
QuillEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  // 'blockquote',
  // 'list',
  // 'bullet',
  'indent',
  'link'
  // 'image',
  // 'video'
];

/*
 * PropType validation
 */
QuillEditor.propTypes = {
  placeholder: PropTypes.string
};
