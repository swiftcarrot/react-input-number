# react-input-number

[![npm](https://img.shields.io/npm/v/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![npm](https://img.shields.io/npm/dm/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![Build Status](https://travis-ci.org/swiftcarrot/react-input-number.svg?branch=master)](https://travis-ci.org/swiftcarrot/react-input-number)
[![codecov](https://codecov.io/gh/swiftcarrot/react-input-number/branch/master/graph/badge.svg)](https://codecov.io/gh/swiftcarrot/react-input-number)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React number input component

### Installation

```sh
yarn add react-input-number
npm install react-input-number --save
```

### Demo

[https://swiftcarrot.dev/react-input-number](https://swiftcarrot.dev/react-input-number)

### Basic usage

```javascript
import React, { useState } from 'react';
import InputNumber from 'react-input-number';

function App() {
  const [num, setNum] = useState(2.2);

  return (
    <InputNumber min={10} max={100} step={0.03} value={num} onChange={setNum} />
  );
}
```

### enableMobileNumericKeyboard

`<InputNumber enableMobileNumericKeyboard />` will open a numeric keyboard on ios and android devices. Notice that on ios the keyboard doesnot contain the `.`(dot) character for floating numbers.

### License

MIT
