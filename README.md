# page 4
Still unfinished attempt in making an interactive CYOA. Uses react and redux. Preview pending.

## options
All configuration is done through objects `settings` and `options` in `src/cyoa.jsx`.

### `settings`
`settings` can contain:
- `currencies` - an object containing global currencies of the CYOA. It contains currency objects, each of them has to have an unique key and can contain:
  - `title` - displayed name of the currency.
  - `start` - starting value of the currency.

### `options`
`options` contain all of the choices the user can choose from. Each option has to have an unique key and can be an object or a function returning one. Function will receive the state and the option itself as its arguments. Each option object can have properties as:
- `title` - display name of the option or a function returning one.
- `type` - one of optionTypes.
- `selected` - initial value of the option.

`if type === optionTypes.INTEGER || type === optionTypes.INSTANCER`
- `cost` - object with costs of each time the option is bought

`if type === optionTypes.GROUP`
- `options` - suboptions of the group, same rules apply as for any other option

`if type === optionTypes.INTEGER`
- `max` - maximum number of simultaneously chosen options
- `requirements` - an array containing objects with
  - `text` - text to be displayed, has to be a string
  - `callback` - a function returning wheter the requirement is met

`if type === optionTypes.SELECT`
- `max` - maximum number of simultaneously chosen options
- `choices` - choices to select from, ech choice can have:
 title - display name of the choice
 cost - object with costs of the choice

`if type === optionTypes.INSTANCER`
- `instanceGroup` - an option with type optionTypes.GROUP, it will be cloned as each of theeated instances; it cannot be a function

When a function requires refreshed data from other options it can call
`callUserFunction(getOption('testOption', state.options), state);`
or when it requires updated currency stats it can call
`calculateCosts(state.options, state.currencies, true);`
or 
`calculateCosts(state.options, getOption('testGroup', state.options).currencies, true);`


## todo
- images in selection choices
- requirements in selection choices
- add suboptions to options and possibly choices
- dividing options to tabs
- styling of instances
- styling group currencies
- collapsing instance groups
- make a working preview