import React from 'react';
import { optionTypes } from './include/constants';
import PathLink from 'Components/PathLink';
import { getSelectedValue, isSelected } from 'Functions/getSelectedValue';
import parsePath from './functions/parsePath';
import deepClone from 'Functions/deepClone';


const settings = {
  initialScreen: ['root'],
  showRoot: false,
  currencySettings: {
    soulPower: {
      title: 'Soul Power',
      inverted: true,
    },
    gold: {
      title: 'Gold',
    },
    instanceCurrency: {
      title: 'Instance Currency',
    },
  },
  currencies: {
    soulPower: 0,
    gold: 0,
  },
};

function userFunction(callback, subscribed = []) {
  return {
    isUserFunction: true,
    callback: (state, option) => {
      return callback({
        state,
        option,
        isSelected: _isSelected.bind({ state, option }),
        getSelectedValue: _getSelectedValue.bind({ state, option }),
        getOption: _getOption.bind({ state, option }),
      });
    },
    subscribed,
  };
}

const _getOption = function (path) {
  const option = (typeof path === 'object') ?
    path :
    this.state.options[parsePath(path, this.option)];
  return option;
};

const _isSelected = function (path) {
  const option = _getOption.call(this, path);
  return isSelected(option, this.state.options);
};

const _getSelectedValue = function (path) {
  const option = _getOption.call(this, path);
  return getSelectedValue(option, this.state.options);
};

const rawOptions = {
  root: {
    type: optionTypes.GROUP,
    title: 'Root',
    text: <>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea recusandae hic sapiente quibusdam earum veniam dolorum veritatis, minus tenetur laboriosam, aperiam incidunt corporis eligendi itaque. Aliquid molestias quaerat quis similique!</p>
      <p>Laudantium nihil quae necessitatibus nisi delectus. Ducimus, voluptatibus veniam. Error tempora deserunt, reiciendis qui tempore cumque obcaecati voluptatem molestias, veniam ducimus laudantium? Delectus dolorum sapiente adipisci quisquam placeat, numquam quasi.</p>
    </>,
    options: {
      b: {
        title: 'B',
        text: <p>Option B</p>,
        cost: userFunction(({ isSelected }) => ({ soulPower: isSelected('root/a') ? 10 : 5 }), ['root/a.selected']),
      },
      a: {
        title: 'A',
        selected: 1,
        text: <p>Option A</p>,
      },
      c: {
        title: 'C',
        cost: { gold: 1 },
        text: <p>Option C</p>,
        requirements: [
          {
            text: <>Requires Option A to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/a'), ['root/a.selected']),
          },
          {
            text: <>Requires Option B to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/b'), ['root/b.selected']),
          },
        ],
      },
      d: {
        title: 'D',
        max: 3,
        cost: { gold: 1 },
        text: <p>Option D</p>,
        requirements: [
          {
            text: <>Requires Option A to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/a'), ['root/a.selected']),
          },
        ],
      },
      instancer: {
        type: optionTypes.INSTANCER,
        requirements: [
          {
            text: <>Requires Option A to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/a'), ['root/a.selected']),
          },
        ],
        max: Infinity,
        title: 'Instancer',
        instanceGroup: {
          currencies: {
            instanceCurrency: 0,
          },
          title: userFunction(({ getSelectedValue, option }) => getSelectedValue('CURRENT_KEY/name') || `Instance ${option.slug}`, ['CURRENT_KEY', 'CURRENT_KEY/name.selected']),
          options: {
            name: {
              type: optionTypes.TEXT,
              title: 'Name',
            },
            a: {
              cost: { soulPower: 5 },
              title: userFunction(({ isSelected }) => {
                return `Option A - ${isSelected('CURRENT_KEY/../b') ? '1' : '0'}`;
              }, ['CURRENT_KEY/..', 'CURRENT_KEY/../b.selected']),
            },
            b: {
              cost: { instanceCurrency: 5 },
              title: 'Option B',
            },
          },
        },
      },
      instanceSelector: {
        type: optionTypes.SELECT,
        title: 'Instance Selector',
        requirements: [
          {
            text: <>Requires Option A to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/a'), ['root/a.selected']),
          },
        ],
        choices: userFunction(({ getSelectedValue }) => {
          const choices = {};
          const instances = getSelectedValue('root/instancer');
          for (const instance of instances) {
            const instanceSlug = instance.split('/').pop();
            choices[instanceSlug] = {
              cost: userFunction(({ getOption }) => {
                return {
                  soulPower: getOption(`${instance}`).currencies.instanceCurrency,
                };
              }, [`currency.instanceCurrency`, 'CURRENT_KEY/...choices']),
              title: userFunction(({ getSelectedValue }) => {
                return getSelectedValue(`${instance}/name`) ||
                  `Instance ${instanceSlug}`;
              }, [`${instance}/name.selected`, 'CURRENT_KEY/...choices']),
              text: <>
                <p>
                  <PathLink path={instance}>edit</PathLink>
                </p>
              </>
            };
          }
          return choices;
        }, ['root/instancer.selected']),
      },
      select: {
        type: optionTypes.SELECT,
        min: 1,
        max: 2,
        title: 'Select',
        text: userFunction(({ getSelectedValue, option }) => <>
          <p><strong>Lorem ipsum dolor sit amet</strong> consectetur adipisicing elit. Sit laborum dolore ipsa non suscipit esse et debitis, inventore maxime assumenda, iure quaerat rerum molestias adipisci neque aspernatur aut quis voluptatibus.</p>
          <p>Selected: {getSelectedValue(option).join(', ')}</p>
        </>, ['root/select.selected']),
        choices: {
          choice1: {
            cost: { soulPower: 1 },
            title: 'Choice 1',
          },
          choice2: {
            cost: { soulPower: 2 },
            title: 'Choice 2',
          },
          choice3: {
            cost: { soulPower: 4 },
            title: 'Choice 3',
          },
        },
      },
    },
  },
};

export { rawOptions, settings };
