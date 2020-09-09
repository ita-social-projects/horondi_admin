import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    const imgTag = super.create();
    imgTag.setAttribute('src', value.src || value);
    imgTag.setAttribute('alt', value.alt || 'editor-pictures');
    imgTag.setAttribute('width', '150px');
    return imgTag;
  }

  static value(node) {
    return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
ImageBlot.className = 'editor-img';

export default ImageBlot;
