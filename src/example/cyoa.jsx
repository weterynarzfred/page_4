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
    image: 'containers/intro.jpg',
    text: <>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea recusandae hic sapiente quibusdam earum veniam dolorum veritatis, minus tenetur laboriosam, aperiam incidunt corporis eligendi itaque. Aliquid molestias quaerat quis similique!</p>
      <p>Laudantium nihil quae necessitatibus nisi delectus. Ducimus, voluptatibus veniam. Error tempora deserunt, reiciendis qui tempore cumque obcaecati voluptatem molestias, veniam ducimus laudantium? Delectus dolorum sapiente adipisci quisquam placeat, numquam quasi.</p>
    </>,
    options: {
      simple: {
        type: optionTypes.GROUP,
        options: {
          b: {
            title: 'B',
            image: 'healthy.jpg',
            text: <p>Option B</p>,
            cost: userFunction(({ isSelected }) => ({ soulPower: isSelected('root/simple/a') ? 10 : 5 }), ['root/simple/a.selected']),
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
                text: <>Requires <PathLink path="root/simple/a">Option A</PathLink> to be selected.</>,
                value: userFunction(({ isSelected }) => isSelected('root/simple/a'), ['root/simple/a.selected']),
              },
              {
                text: <>Requires <PathLink path="root/simple/b">Option B</PathLink> to be selected.</>,
                value: userFunction(({ isSelected }) => isSelected('root/simple/b'), ['root/simple/b.selected']),
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
                text: <>Requires <PathLink path="root/simple/a">Option A</PathLink> to be selected.</>,
                value: userFunction(({ isSelected }) => isSelected('root/simple/a'), ['root/simple/a.selected']),
              },
            ],
            options: {
              d1: {
                title: 'D1',
                cost: { gold: 1 },
              },
              d2: {
                title: 'D2',
                cost: { gold: 1 },
              },
            },
          },
          e: {
            title: 'E',
            text: <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam incidunt saepe laboriosam nostrum ad totam necessitatibus quisquam accusantium perspiciatis iure alias nisi cum sed impedit, adipisci ipsa ea enim?</p>,
            options: {
              select: {
                type: optionTypes.SELECT,
                choices: {
                  e1: { title: 'E1' },
                  e2: { title: 'E2' },
                },
              },
            },
          },
        },
      },
      instancer: {
        type: optionTypes.INSTANCER,
        requirements: [
          {
            text: <>Requires <PathLink path="root/simple/a">Option A</PathLink> to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/simple/a'), ['root/simple/a.selected']),
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
            text: <>Requires <PathLink path="root/simple/a">Option A</PathLink> to be selected.</>,
            value: userFunction(({ isSelected }) => isSelected('root/simple/a'), ['root/simple/a.selected']),
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
        displayAsTable: true,
        min: 1,
        max: 2,
        title: 'Select',
        text: userFunction(({ getSelectedValue, state }) => {
          const value = getSelectedValue('root/select');
          const selected = value.filter(optionKey => {
            return !isDisabled(state.options[optionKey]);
          }).map(optionKey =>
            getUserText(optionKey, 'title')
          ).join(', ');
          return <>
            <p><strong>Lorem ipsum dolor sit amet</strong> consectetur adipisicing elit. Sit laborum dolore ipsa non suscipit esse et debitis, inventore maxime assumenda, iure quaerat rerum molestias adipisci neque aspernatur aut quis voluptatibus.</p>
            <p>Selected: {selected}</p>
          </>;
        }, ['root/select.selected', 'root/select/choice1.requirements.0']),
        choices: {
          choice1: {
            cost: { soulPower: 1 },
            title: 'Choice 1',
            text: <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, consequatur iusto. Saepe commodi ipsa magni atque libero quis architecto cupiditate, dicta, sequi ab, eos expedita molestiae? Eaque exercitationem repellat vel.</p>,
            requirements: [
              {
                text: <>Requires <PathLink path="root/simple/a">Option A</PathLink> to be selected.</>,
                value: userFunction(({ isSelected }) => isSelected('root/simple/a'), ['root/simple/a.selected']),
              },
            ],
          },
          choice2: {
            cost: { soulPower: 2 },
            selected: 1,
            title: 'Choice 2',
            text: <p>Quidem iure itaque omnis voluptas expedita animi unde praesentium quam accusamus dolore, at autem! Aperiam, corporis fugit beatae odio officiis, facere vero, perferendis placeat corrupti quasi at aliquid itaque ad.</p>,
          },
          choice3: {
            cost: { soulPower: 4 },
            title: 'Choice 3',
            text: <p>Modi optio laboriosam magni, exercitationem repellat amet non laborum, fuga fugiat obcaecati soluta doloremque assumenda. Eligendi quod quas excepturi, perspiciatis obcaecati ea reiciendis natus nostrum vitae unde beatae in aliquam.</p>,
          },
          choice4: {
            cost: { soulPower: 8 },
            title: 'Choice 4',
            text: <p>Laudantium nesciunt, eaque quisquam deleniti ipsa adipisci suscipit perspiciatis vitae qui nemo. Impedit molestiae laudantium voluptatibus aliquid, quae dolorem? Quam tempore, ipsa atque quasi debitis accusamus doloribus excepturi enim delectus!</p>,
          },
          choice5: {
            cost: { soulPower: 16 },
            title: 'Choice 5',
            text: <p>Laudantium labore ipsum eligendi, sapiente vero cupiditate earum nam placeat omnis quis ea, consequuntur, optio fugiat facilis nemo sequi perferendis consectetur numquam? Quis corporis animi consectetur magni voluptatibus deserunt fuga.</p>,
          },
        },
      },
    },
  },
};

export { rawOptions, settings };
