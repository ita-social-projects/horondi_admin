import { Quill } from 'react-quill';

const BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
  static create(value) {
    if (value && value.src) {
      const videoTag = super.create();
      videoTag.setAttribute('src', value.src);
      videoTag.setAttribute('title', value.title);
      videoTag.setAttribute('width', '100%');
      videoTag.setAttribute('controls', '');
      return videoTag;
    } 
    const iframeTag = document.createElement('iframe');
    iframeTag.setAttribute('src', value);
    iframeTag.setAttribute('frameborder', '0');
    iframeTag.setAttribute('allowfullscreen', true);
    iframeTag.setAttribute('width', '100%');
    iframeTag.setAttribute('height', '400px');
    return iframeTag;
    
  }

  static value(node) {
    if (node.getAttribute('title')) {
      return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    } 
    return node.getAttribute('src');
    
  }
}

export default VideoBlot;
