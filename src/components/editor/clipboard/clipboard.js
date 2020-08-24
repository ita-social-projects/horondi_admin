import { Quill } from 'react-quill';
import axios from 'axios';

const QuillClipboard = Quill.import('modules/clipboard');

class Clipboard extends QuillClipboard {
  getMetaTagElements = (stringContent) => {
    const el = document.createElement('div');
    el.innerHTML = stringContent;
    return el.getElementsByTagName('meta');
  };

  async onPaste(e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = await clipboardData.getData('Text');

    const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
    if (urlMatches.length > 0) {
      e.preventDefault();
      urlMatches.forEach((link) => {
        axios
          .get(link)
          .then((payload) => {
            let title;
            let image;
            let url;
            for (const node of this.getMetaTagElements(payload)) {
              if (node.getAttribute('property') === 'og:title') {
                title = node.getAttribute('content');
              }
              if (node.getAttribute('property') === 'og:image') {
                image = node.getAttribute('content');
              }
              if (node.getAttribute('property') === 'og:url') {
                url = node.getAttribute('content');
              }
            }

            const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

            const range = this.quill.getSelection();
            const position = range ? range.index : 0;
            this.quill.pasteHTML(position, rendered, 'silent');
            this.quill.setSelection(position + rendered.length);
          })
          .catch((error) => console.error(error));
      });
    } else {
      super.onPaste(e);
    }
  }
}

export default Clipboard;
