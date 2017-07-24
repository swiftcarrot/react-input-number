# react-input-number
[![npm](https://img.shields.io/npm/v/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![npm](https://img.shields.io/npm/dm/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![Build Status](https://travis-ci.org/wangzuo/react-input-number.svg?branch=master)](https://travis-ci.org/wangzuo/react-input-number)

React number input component

### Installation
```sh
npm install react-input-number --save
```

### Usage
``` javascript
<InputNumber
  className="input"
  min={10}
  max={100}
  step={0.03}
  value={this.state.number}
  onChange={value => this._onChange(value)}
/>
```

### License
MIT
