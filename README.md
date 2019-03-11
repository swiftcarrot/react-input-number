# react-input-number

[![npm](https://img.shields.io/npm/v/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![npm](https://img.shields.io/npm/dm/react-input-number.svg)](https://www.npmjs.com/package/react-input-number)
[![Build Status](https://travis-ci.org/wangzuo/react-input-number.svg?branch=master)](https://travis-ci.org/wangzuo/react-input-number)
[![codecov](https://codecov.io/gh/wangzuo/react-input-number/branch/master/graph/badge.svg)](https://codecov.io/gh/wangzuo/react-input-number)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

React number input component

### Installation

```sh
yarn add react-input-number
npm install react-input-number --save
```

### Usage

```javascript
import React, { useState } from 'react';
import InputNumber from 'react-input-number';

function App() {
  const [num, setNum] = useState(2.2);

  return (
    <InputNumber
      className="input"
      min={10}
      max={100}
      step={0.03}
      value={num}
      onChange={setNum}
    />
  );
}
```

### License

MIT
