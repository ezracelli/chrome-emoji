import EmojiReplacer from './modules/emoji-replacer.js';
import '../assets/css/noto-color-emoji.css';

const replacer = new EmojiReplacer();
replacer.replace();

export default replacer;
