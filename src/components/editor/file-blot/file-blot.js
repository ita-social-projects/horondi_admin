import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');

class FileBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement('span');
    prefixTag.innerText = 'Attachments - ';

    const bTag = document.createElement('b');
    bTag.innerText = value;

    const linkTag = document.createElement('a');
    linkTag.setAttribute('href', value);
    linkTag.setAttribute('target', '_blank');
    linkTag.setAttribute('className', 'file-link-inner-post');
    linkTag.appendChild(bTag);

    const node = super.create();
    node.appendChild(prefixTag);
    node.appendChild(linkTag);

    return node;
  }

  static value(node) {
    const linkTag = node.querySelector('a');
    return linkTag.getAttribute('href');
  }
}

export default FileBlot;
