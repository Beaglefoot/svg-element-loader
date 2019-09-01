[![npm](https://img.shields.io/npm/v/svg-element-loader)](https://www.npmjs.com/package/svg-element-loader)

# svg-element-loader

Load svg images as DOM Elements with webpack

## Installation

```sh
npm install --save-dev svg-element-loader
```

**webpack.config**

```js
module.export = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        loader: 'svg-element-loader'
      }
    ]
  }
};
```

**tsconfig.json**

```json
{
  "include": ["node_modules/svg-element-loader/*.d.ts"]
}
```

## Usage

In JavaScript

```js
import playIcon from 'assets/play-icon.svg';

document.body.appendChild(playIcon);
```

[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) properties and methods are available. For example:

```js
playIcon.classList.add('emphasize');

const circle = playIcon.querySelector('circle[stroke="#fff"]');
circle.style.stroke = '#333';'
```

## License

[MIT](./LICENSE)
