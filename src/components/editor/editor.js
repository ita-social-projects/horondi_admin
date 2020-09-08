import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';

import 'react-quill/dist/quill.snow.css';

Quill.debug('error');

const Editor = ({ value, placeholder, onEditorChange }) => {
  const [content, setContent] = useState(value);

  const handleChange = (html) => {
    setContent(html);
    onEditorChange(html);
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
    'color'
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
        <button type='button' className='ql-image' />
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
        onChange={handleChange}
        modules={modules}
        formats={formats}
        value={content}
        placeholder={placeholder}
      />
    </div>
  );
};

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired
};

export default Editor;
