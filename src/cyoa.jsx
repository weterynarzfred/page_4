import _ from 'lodash';
import React from 'react';
import { optionTypes } from './include/enum';
import { callUserFunction } from 'Include/userFunctions';
import calculateCosts from 'Functions/calculateCosts';
import getOption from 'Functions/getOption';
import getSelectedValue from 'Functions/getSelectedValue';
import isSelected from './functions/isSelected';
import PathLink from 'Components/PathLink';

import intro from './content/intro';
import soul from './content/soul';
import body from './content/body';
import race from './content/race';

const settings = {
  initialScreen: ['intro'],
  showRoot: false,
  currencies: {
    delta_s: {
      title: 'Delta S',
    },
    test: {
      title: 'Test',
    },
  },
};

const options = {
  intro,
  soul,
  body,
  race,
  scenarios: {
    type: optionTypes.GROUP,
    title: 'Scenarios',
    options: {
      body: state => {
        const choices = {};
        const bodies = getSelectedValue('body', state.options);
        for (const bodySlug in bodies) {
          if (isNaN(bodySlug)) continue;
          const title = getSelectedValue(
            `body.${bodySlug}.bodyName`,
            state.options
          );
          calculateCosts(state.options, state.currencies, true);
          const cost = bodies[bodySlug].currencies.delta_b.value;
          choices[bodySlug] = {
            title,
            text: <><p>
              <PathLink path={bodies[bodySlug].path.join('.')}>edit</PathLink>
            </p></>,
            cost: { delta_s: -cost },
          };
        }

        return {
          type: optionTypes.SELECT,
          max: Infinity,
          choices,
        };
      },
    },
  },
};

export { options, settings };
