import React, { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import ImageIcon from '@material-ui/icons/Image';

import ImageBlot from './image-blot';
import VideoBlot from './video-blot';
import 'react-quill/dist/quill.snow.css';

Quill.debug('error');
Quill.register(VideoBlot);
Quill.register(ImageBlot);

const Editor = ({
  value,
  placeholder,
  onEditorChange,
  files = [],
  setFiles
}) => {
  const reactQuillRef = useRef(null);
  const inputOpenImageRef = useRef();

  const [content, setContent] = useState(value);

  const handleChange = (html) => {
    setContent(html);
    onEditorChange(html);
  };

  const imageHandler = (e) => {
    inputOpenImageRef.current.click();
  };

  const insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (
      e.currentTarget &&
      e.currentTarget.files &&
      e.currentTarget.files.length > 0
    ) {
      const { files } = e.currentTarget;
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const quill = reactQuillRef.current.getEditor();
        quill.focus();

        const range = quill.getSelection();
        const position = range ? range.index : 0;

        quill.insertEmbed(position, 'image', {
          src: reader.result,
          alt: file.name
        });
        quill.setSelection(position + 1);
      };

      setFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const modules = {
    toolbar: {
      container: '#toolbar'
    }
  };

  const formats = [
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
    'color',
    'insertImage'
  ];

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
          <option value='3' />
          <option value='4' />
          <option value='' />
        </select>
        <button type='button' className='ql-bold' />
        <button type='button' className='ql-italic' />
        <button type='button' className='ql-underline' />
        <button type='button' className='ql-strike' />
        <button type='button' className='ql-link' />
        <button type='button' className='ql-code-block' />
        <button type='button' onClick={imageHandler}>
          <ImageIcon />
        </button>
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
        theme='snow'
        ref={reactQuillRef}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        value={content}
        placeholder={placeholder}
      />
      <input
        type='file'
        accept='image/!*'
        ref={inputOpenImageRef}
        style={{ display: 'none' }}
        onChange={insertImage}
      />
    </div>
  );
};

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  files: PropTypes.arrayOf.isRequired
};

export default Editor;
