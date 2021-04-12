# page 4
Still unfinished attempt in making an interactive CYOA. Uses react and redux. Preview pending.

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
- `text` {string|jsx|function}
- `cost` {object|function}
- `min` {number|function}
- `max` {number|function}
- `hidden` {bool}
- `currencies` {object}
- `options` {object}
- `selected` {any}
- `requirements` {array}

if `type === optionTypes.SLIDER`
- `sliderAttributes` {object}
- `logSlider` {number}
- `displayAsPercent` {bool}

if `type === optionTypes.SELECT`
- `choices` {object|function}

if `type === optionTypes.INSTANCER`
- `instanceGroup` {object}

### restricted keys
- `currency`

## todo
- generate warnings when currency is below zero
- add a disclaimer
- add tooltips explaining gui
- make a working preview
- add better summary to main menu
- save and load from a json file
- add blurring to nsfw images
- add option type with order selection
- display currencies in groups that are not instances
- add a button to enlarge images
- `INSTANCER` `displayAsTable`
- fix persisting instance data
- fix `displayAsPercent` in sliders