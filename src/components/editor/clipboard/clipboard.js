import { Quill } from 'react-quill';
import axios from 'axios';

import { definePosition } from '../../../utils/clipboard';

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

      await Promise.all([...urlMatches])
        .then(async (link) => {
          await axios
            .get(link)
            .then((payload) => {
              let title;
              let image;
              let url;
              for (const node of this.getMetaTagElements(payload)) {
                switch (node.getAttribute('property')) {
                case 'og:title':
                  title = node.getAttribute('content');
                  break;
                case 'og:image':
                  image = node.getAttribute('content');
                  break;
                case 'og:url':
                  url = node.getAttribute('content');
                  break;
                default:
                  break;
                }
              }

              const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

              const range = this.quill.getSelection();
              const position = definePosition(range);
              this.quill.pasteHTML(position, rendered, 'silent');
              this.quill.setSelection(position + rendered.length);
            })
            .catch((error) => console.error(error));
        })
        .catch((err) => console.log(err));
    } else {
      super.onPaste(e);
    }
  }
}

export default Clipboard;
