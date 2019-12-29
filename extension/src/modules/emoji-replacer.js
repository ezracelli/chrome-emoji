import debounce from 'lodash.debounce';
import textNodesUnder from './text-nodes-under.js';

function EmojiReplacer () {
    this.observer = new MutationObserver(debounce(this.replace, 1000).bind(this));
    this.observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

EmojiReplacer.REGEXP = /[*#0-9]?(\u00a9|\u00ae|[\u200B-\u200D]|[\u203c-\u303f]|\uFEFF|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|\ufe0f)+/g;

EmojiReplacer.prototype.textNodes = [];

EmojiReplacer.prototype.replace = function () {
    const newTextNodes = textNodesUnder(document.body)
        .filter(({ textContent }) => textContent.match(EmojiReplacer.REGEXP))
        .filter(textNode => !this.textNodes.includes(textNode));

    for (const node of newTextNodes) this.emojify(node);
};

EmojiReplacer.prototype.emojify = function (textNode) {
    const html = textNode.textContent.replace(
        EmojiReplacer.REGEXP,
        '<span data-noto-color-emoji>$&</span>',
    );

    const parentNode = textNode.parentNode;
    let newNodes = new DOMParser()
        .parseFromString(html, 'text/html')
        .body
        .childNodes

    Array.from(newNodes).reduce((prevNode, newNode) => {
        parentNode.insertBefore(newNode, prevNode.nextSibling);
        return newNode;
    }, textNode);

    parentNode.removeChild(textNode);

    newNodes = Array.from(
        parentNode
            .querySelectorAll('[data-noto-color-emoji]')
    ).map(node => node.childNodes[0]);

    this.textNodes.push(...newNodes);
};

export default EmojiReplacer;
