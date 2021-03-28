import React from 'react';
import { optionTypes } from 'Include/enum';
import { callUserFunction } from 'Include/userFunctions';
import calculateCosts from 'Functions/calculateCosts';
import getOption from 'Functions/getOption';
import PathLink from 'Components/PathLink';
import { isSelected, getSelectedValue } from 'Functions/getSelectedValue';
import deepClone from 'Functions/deepClone';

const settings = {
  initialScreen: ['example'],
  showRoot: false,
  currencies: {
    gold: {
      title: 'Gold',
      start: 50,
    },
  },
};

const options = {
  example: {
    type: optionTypes.GROUP,
    title: 'Example',
    options: {
      a: {
        cost: { gold: 5 },
        max: 2,
        title: 'A',
      },
      b: {
        cost: { gold: 10 },
        title: 'B',
      },
      c: {
        type: optionTypes.INSTANCER,
        cost: { gold: 5 },
        max: 2,
        title: 'C',
        instanceGroup: {
          title: (state, option) => getSelectedValue(
            option.options.name,
            state.options
          ) || `Instance ${option.slug}`,
          options: {
            name: {
              type: optionTypes.TEXT,
              title: 'Name',
            },
          },
        },
      },
      d: {
        type: optionTypes.SELECT,
        max: 2,
        title: 'D',
        choices: {
          d1: {
            cost: { gold: 1 },
            title: 'D1',
          },
          d2: {
            cost: { gold: 2 },
            title: 'D2',
          },
          d3: {
            cost: { gold: 3 },
            title: 'D3',
          },
        },
      },
    },
  },
};

export { options, settings };
