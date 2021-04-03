import React from 'react';
import { optionTypes } from 'Include/constants';
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
      e: {
        type: optionTypes.SLIDER,
        title: 'E',
        sliderAttributes: {
          step: 0.1,
          marks: {
            0: '0%',
            0.5: '50%',
            1: '100%',
          },
          dots: true,
        },
        valueTransform: (state, option) => {
          return (getSelectedValue(option) * 100).toFixed(0) + '%';
        },
        text: <>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nam deleniti vel veniam laborum maxime quo quibusdam voluptatum nulla. Suscipit labore natus accusamus ab sed facere impedit ipsa a exercitationem?</p>
        </>,
      },
    },
  },
};

export { options, settings };
