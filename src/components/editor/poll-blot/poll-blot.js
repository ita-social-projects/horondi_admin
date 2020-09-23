import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');

class PollBlot extends BlockEmbed {
  static create(value) {
    const prefixTag = document.createElement('span');
    prefixTag.innerText = '투표 - ';

    const bTag = document.createElement('b');
    bTag.innerText = value.title;

    const node = super.create();
    node.setAttribute('id', value.id);
    node.appendChild(prefixTag);
    node.appendChild(bTag);

    return node;
  }

  static value(node) {
    const id = node.getAttribute('id');
    const bTag = node.querySelector('b');
    const title = bTag.innerText;
    return { id, title };
  }
}

export default PollBlot;
