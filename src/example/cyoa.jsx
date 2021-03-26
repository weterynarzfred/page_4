import _ from 'lodash';
import React from 'react';
import { optionTypes } from 'Include/enum';
import { callUserFunction } from 'Include/userFunctions';
import calculateCosts from 'Functions/calculateCosts';
import getOption from 'Functions/getOption';
import PathLink from 'Components/PathLink';
import { isSelected, getSelectedValue } from 'Functions/getSelectedValue';

const settings = {
  initialScreen: ['example'],
  showRoot: false,
  currencies: {
    delta_s: {
      title: 'Delta S',
    },
  },
};

const options = {
  example: {
    type: optionTypes.GROUP,
    title: 'Example',
    options: {
      a: {
        type: optionTypes.INTEGER,
        title: 'A',
      },
    },
  },
};

export { options, settings };
