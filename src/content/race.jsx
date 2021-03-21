import _ from 'lodash';
import React from 'react';
import { optionTypes } from '../include/enum';
import { callUserFunction } from 'Include/userFunctions';
import calculateCosts from 'Functions/calculateCosts';
import getOption from 'Functions/getOption';
import getSelectedValue from 'Functions/getSelectedValue';
import isSelected from '../functions/isSelected';
import PathLink from 'Components/PathLink';

export default {
  type: optionTypes.INSTANCER,
  title: 'Race',
  text: <>
    <p>This section can be used for defining attributes of races, single bodies and summons.</p>
  </>,
  instanceGroup: {
    currencies: {
      racePoints: {
        title: 'Race Points',
      },
    },
    title: (state, option) => getSelectedValue(
      [...option.path, 'raceName'],
      state.options
    ),
    options: {
      raceName: {
        type: optionTypes.TEXT,
        title: 'Race Name',
        selected: 'Race',
      },
      looks: {
        type: optionTypes.GROUP,
        title: 'Looks',
        text: <>
          <p>Apart from options in this section you can customize their look to suit your tastes, including gender traits (except for genitals), skin, hair and eye color, hair coverage, skin type and many similar.</p>
        </>,
        options: {
          shapeBasis: {
            type: optionTypes.SELECT,
            title: 'Shape Basis',
            choices: {
              humanoid: {
                cost: { racePoints: 10 },
                title: 'Humanoid',
                text: <>
                  <p>They will be mostly humanoid in shape. Two legs, two hands with opposing thumbs, torso and a head. They do not have to look human.</p>
                </>
              },
              mammalian: {
                cost: { racePoints: 5 },
                title: 'Mammalian',
                text: <>
                  <p>They look similar to a non-humanoid mammal.</p>
                </>
              },
              animalistic: {
                cost: { racePoints: 2 },
                title: 'Animalistic',
                text: <>
                  <p>They look similar to a nom-mammal animal.</p>
                </>
              },
              undefined: {
                title: 'Undefined',
                text: <>
                  <p>Whatever form suits their purpose. They do not appear similar to any living creatures you knew.</p>
                </>
              },
            },
          },
        },
      },
    },
  },
};