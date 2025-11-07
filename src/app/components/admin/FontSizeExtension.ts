import { Mark } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize || null,
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: element => {
          const fontSize = (element as HTMLElement).style.fontSize;
          if (!fontSize) {
            return false;
          }
          return { fontSize };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize: (size: string) => ({ chain }) => {
        return chain()
          .setMark('fontSize', { fontSize: size })
          .run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .unsetMark('fontSize')
          .run();
      },
    };
  },
});