# page 4
Still unfinished attempt in making an interactive CYOA. Uses react and redux. Preview pending.

## options
All configuration is done through objects `settings` and `options` in `src/cyoa.jsx`.

### `settings`
`settings` can contain:
- `currencies` - an object containing global currencies of the CYOA. It contains currency objects, each of them has to have an unique key and can contain:
  - `title` - displayed name of the currency.
  - `start` - starting value of the currency.
  - `inverted` - inverts positive and negative cost colors.

### `options`
`options` contain all of the choices the user can choose from. Each option has to have an unique key and can be an object or a function returning one. Function will receive the state and the option itself as its arguments. Each option object can have properties as:
- `title` - display name of the option or a function returning one.
- `type` - one of optionTypes, default is optionTypes.INTEGER.
- `selected` - initial value of the option.
- `image` - filename of the image to display in the option. Searched in the `public/images` folder.
- `hidden` - disables showing the option anywhere on the page.
- `disabled` - option and its suboptions are skipped when calculating costs and requirements.

`if type === optionTypes.INTEGER || type === optionTypes.INSTANCER`
- `cost` - object with costs of each time the option is bought.

`if type === optionTypes.GROUP`
- `options` - suboptions of the group, same rules apply as for any other option.

`if type === optionTypes.INTEGER`
- `max` - maximum number of simultaneously chosen options.
- `requirements` - an array containing objects with.
  - `text` - text to be displayed, has to be a string.
  - `callback` - a function returning wheter the requirement is met.

`if type === optionTypes.SELECT`
- `max` - maximum number of simultaneously chosen options.
- `displayAsTable` - display the choices as a table with rows: checkbox, title, text and rewuirements, cost.
- `choices` - choices to select from, each choice can have:
  - `title` - display name of the choice.
  - `cost` - object with costs of the choice.

`if type === optionTypes.INSTANCER`
- `instanceGroup` - an option with type optionTypes.GROUP, it will be cloned as each of the instances. It cannot be a function. It cannot contain other instancers.

`if type === optionTypes.SLIDER`
- `sliderAttributes` - an object with attributes that will be passed directly to `rc-slider`.
- `displayTransform` - a function that will be applied to the value before it is displayed.
- `valueTransform`

When a function requires refreshed data from other options it can call
`callOptionFunction(getOption('testOption', state.options), state);`

or when it requires updated currency stats it can call
`calculateCosts(state.options, state.currencies, true);`

### restricted keys
- `instanceGroup`
- `nextId`
- `requirement`
- `_title`


## todo
- generate warnings when currency is below zero
- add a disclaimer
- add tooltips explaining gui
- make a working preview
- add better summary to main menu
- save and load from a json file
- add blurring to nsfw images
- add `USER_FUNCTION` to `dataTypes`
- add option type with order selection
- display currencies in groups that are not instances