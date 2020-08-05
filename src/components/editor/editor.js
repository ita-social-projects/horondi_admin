import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import PropTypes from 'prop-types';
import Clipboard from './clipboard';
import ImageBlot from './image-blot';
import VideoBlot from './video-blot';
import FileBlot from './file-blot';
import PollBlot from './poll-blot';
import 'react-quill/dist/quill.snow.css';

Quill.debug('error');

Quill.register('modules/clipboard', Clipboard, true);
Quill.register(ImageBlot);
Quill.register(VideoBlot);
Quill.register(FileBlot);
Quill.register(PollBlot);

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';

class Editor extends React.Component {
  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
        insertPoll: this.pollHandler
      }
    }
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'image',
    'video',
    'file',
    'link',
    'code-block',
    'video',
    'blockquote',
    'clean',
    'list',
    'align',
    'color'
  ];

  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      editorHtml: value,
      files: []
    };

    this.reactQuillRef = null;

    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    const { onEditorChange } = this.props;
    const { editorHtml } = this.state;
    this.setState(
      {
        editorHtml: html
      },
      () => {
        onEditorChange(editorHtml);
      }
    );
  };

  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click();
  };

  fileHandler = () => {
    this.inputOpenFileRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      const formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };
      formData.append('file', file);

      axios.post('/api/blog/uploadfiles', formData, config).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          const range = quill.getSelection();
          const position = range ? range.index : 0;

          quill.insertEmbed(position, 'image', {
            src: `http://localhost:5000/${response.data.url}`,
            alt: response.data.fileName
          });
          quill.setSelection(position + 1);

          if (this._isMounted) {
            const { files } = this.state;
            const { onFilesChange } = this.props;
            this.setState(
              {
                files: [...files, file]
              },
              () => {
                onFilesChange(files);
              }
            );
          }
        } else {
          return alert('failed to upload file');
        }
      });
    }
  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      const formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };
      formData.append('file', file);

      axios.post('/api/blog/uploadfiles', formData, config).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          const range = quill.getSelection();
          const position = range ? range.index : 0;
          quill.insertEmbed(position, 'video', {
            src: `http://localhost:5000/${response.data.url}`,
            title: response.data.fileName
          });
          quill.setSelection(position + 1);

          if (this._isMounted) {
            const { files } = this.state;
            const { onFilesChange } = this.props;
            this.setState(
              {
                files: [...files, file]
              },
              () => {
                onFilesChange(files);
              }
            );
          }
        } else {
          return alert('failed to upload file');
        }
      });
    }
  };

  insertFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const file = e.currentTarget.files[0];

      const formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };
      formData.append('file', file);
      axios.post('/api/blog/uploadfiles', formData, config).then((response) => {
        if (response.data.success) {
          const quill = this.reactQuillRef.getEditor();
          quill.focus();

          const range = quill.getSelection();
          const position = range ? range.index : 0;
          quill.insertEmbed(position, 'file', response.data.fileName);
          quill.setSelection(position + 1);

          if (this._isMounted) {
            const { files } = this.state;
            const { onFilesChange } = this.state;
            this.setState(
              {
                files: [...files, file]
              },
              () => {
                onFilesChange(files);
              }
            );
          }
        }
      });
    }
  };

  render() {
    const { placeholder } = this.props;
    const { editorHtml } = this.state;

    return (
      <div>
        <div id='toolbar'>
          <select
            className='ql-header'
            defaultValue=''
            onChange={(e) => e.persist()}
          >
            <option value='1' />
            <option value='2' />
            <option value='' />
          </select>
          <button type='button' className='ql-bold' />
          <button type='button' className='ql-italic' />
          <button type='button' className='ql-underline' />
          <button type='button' className='ql-strike' />
          <button type='button' className='ql-insertImage'>
            I
          </button>
          <button type='button' className='ql-insertVideo'>
            V
          </button>
          <button type='button' className='ql-insertFile'>
            F
          </button>
          <button type='button' className='ql-link' />
          <button type='button' className='ql-code-block' />
          <button type='button' className='ql-video' />
          <button type='button' className='ql-blockquote' />
          <button type='button' className='ql-clean' />
          <button type='button' className='ql-list' value='bullet' />
          <button type='button' className='ql-list' value='ordered' />
          <select type='button' className='ql-align' defaultValue=''>
            <option value='center' />
            <option value='right' />
            <option value='justify' />
          </select>
          <select className='ql-color' />
        </div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          style={{ height: '400px' }}
          theme='snow'
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={editorHtml}
          placeholder={placeholder}
        />
        <input
          type='file'
          accept='image/*'
          ref={this.inputOpenImageRef}
          style={{ display: 'none' }}
          onChange={this.insertImage}
        />
        <input
          type='file'
          accept='video/*'
          ref={this.inputOpenVideoRef}
          style={{ display: 'none' }}
          onChange={this.insertVideo}
        />
        <input
          type='file'
          accept='*'
          ref={this.inputOpenFileRef}
          style={{ display: 'none' }}
          onChange={this.insertFile}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFilesChange: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired
};

export default Editor;
