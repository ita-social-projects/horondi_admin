import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import Clipboard from './clipboard';
import VideoBlot from './video-blot';
import 'react-quill/dist/quill.snow.css';

Quill.debug('error');
Quill.register('modules/clipboard', Clipboard, true);

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class Editor extends React.Component {
  modules = {
    toolbar: {
      container: '#toolbar'
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
      editorHtml: value
    };

    this.reactQuillRef = null;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    const { onEditorChange } = this.props;
    this.setState(
      {
        editorHtml: html
      },
      () => {
        onEditorChange(html);
      }
    );
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
      </div>
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired
};

export default Editor;
