# page 4
Still unfinished attempt in making an interactive CYOA. Uses react and redux.

## options
All configuration is done through objects `settings` and `options` in `src/cyoa.jsx`.

### `settings`
`settings` can contain:
- `currencySettings` {object} - an object containing global currencies of the CYOA. It contains currency objects, each of them has to have an unique key and can contain:
  - `title` {string} - displayed name of the currency.
  - `start` {number} - starting value of the currency.
  - `inverted` {bool} - inverts positive and negative cost colors.
- `currencies` {object} - an object with main currencies as keys. For now each value should be set to 0.
- initialScreen {array}

### `options`
`options` contain all of the choices the user can choose from. Each option has to have an unique key.

Option object structure
- `type` {optionTypes}
- `title` {string|jsx|function}
- `displayTitle` {string|jsx|function}
- `text` {string|jsx|function}
- `cost` {object|function}
- `min` {number|function}
- `max` {number|function}
- `hidden` {bool}
- `currencies` {object}
- `options` {object}
- `selected` {any}
- `requirements` {[object]}
  - `text` {string|function}
  - `value` {bool|function}
  - `hiddenWhenMet` {bool}
  - `optionHiddenWhenNotMet` {bool}
- `hiddenInParent` {bool}
- `hiddenInSummary` {bool}
- `classes` {string}
- `detail` {object}

if `type === optionTypes.TEXT`
- `displayAsTextarea` {bool}

if `type === optionTypes.SLIDER`
- `sliderAttributes` {object}
- `logSlider` {number}
- `displayAsPercent` {bool} *not working right now*

if `type === optionTypes.SELECT`
- `choices` {object|function}
- `displayAsTable` {bool}
- `tableColumns` {array}

if `type === optionTypes.INSTANCER`
- `instanceGroup` {object}

### restricted keys
- `currency`
- `__results`
- `__changelog`
