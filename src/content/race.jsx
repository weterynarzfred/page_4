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
      racePower: {
        title: 'Race Power',
        inverted: true,
      },
      raceFamiliarity: {
        title: 'Race Familiarity',
        inverted: true,
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
                cost: { raceFamiliarity: -10 },
                image: 'humanoid.jpg',
                title: 'Humanoid',
                text: <>
                  <p>They will be mostly humanoid in shape. Two legs, two hands with opposing thumbs, torso and a head. They do not have to look human.</p>
                </>
              },
              mammalian: {
                cost: { raceFamiliarity: -5 },
                image: 'mammalian.jpg',
                title: 'Mammalian',
                text: <>
                  <p>They look similar to a non-humanoid mammal.</p>
                </>
              },
              animalistic: {
                cost: { raceFamiliarity: -2 },
                image: 'animalistic.jpg',
                title: 'Animalistic',
                text: <>
                  <p>They look similar to a nom-mammal animal.</p>
                </>
              },
              undefined: {
                title: 'Undefined',
                image: 'undefined_shape_basis.jpg',
                text: <>
                  <p>Whatever form suits their purpose. They do not appear similar to any living creatures you knew.</p>
                </>
              },
            },
          },
          beauty: {
            type: optionTypes.SELECT,
            title: 'Beauty',
            text: <>
              <p>This attribute reflects your own beauty standards.</p>
            </>,
            choices: {
              pleasant: {
                cost: { raceFamiliarity: -10 },
                image: 'pleasant_beauty.jpg',
                title: 'Pleasant',
                text: <>
                  <p>Extra care was used to make them appear cute, beautiful or pleasant.</p>
                </>,
              },
              normal: {
                image: 'normal_beauty.jpg',
                title: 'Normal',
                text: <>
                  <p>They do not look particularly good or bad. A functional design.</p>
                </>,
              },
              ugly: {
                cost: { raceFamiliarity: 5 },
                image: 'ugly.jpg',
                title: 'Ugly',
                text: <>
                  <p>Their good looks were of no importance whatsoever. They appear rugged and dirty with certain parts sticking out in weird places and at odd angles. Unpleasant to look at, but this can be useful sometimes.</p>
                </>,
              },
            },
          },
          size: {
            type: optionTypes.SELECT,
            title: 'Size',
            choices: {
              small: {
                cost: { racePower: 5 },
                image: 'small_size.jpg',
                title: 'Small',
                text: <>
                  <p>From 0.1 to 0.5 meters of height / legth.</p>
                </>,
              },
              human: {
                image: 'human_sized.jpg',
                title: 'Human sized',
                text: <>
                  <p>From 1.5 to 2 meters of height / legth.</p>
                </>,
              },
              giant: {
                cost: { racePower: -10 },
                image: 'giant_size.jpg',
                title: 'Giant',
                text: <>
                  <p>From 3 to 5 meters of height / legth.</p>
                </>,
              },
            },
          },
        },
      },
      attributes: {
        type: optionTypes.GROUP,
        title: 'Attributes',
        options: {
          lifespan: {
            type: optionTypes.SELECT,
            title: 'Lifespan',
            text: <>
              <p>Lifespan describes the average of people living in good conditions and with a low child mortality rate.</p>
            </>,
            choices: {
              years_10: {
                cost: { racePower: 10 },
                title: '10 years',
                text: <>
                  <p>It is hard to accumulate much wisdom or experience in such a short time. They have to mature very quickly to allow for their society to function.</p>
                </>,
              },
              years_30: {
                cost: { racePower: 5 },
                title: '30 years',
              },
              years_80: {
                title: '80 years',
                text: <>
                  <p>Average for humans.</p>
                </>,
              },
              years_200: {
                cost: { racePower: -10 },
                title: '200 years',
              },
              years_1000: {
                cost: { racePower: -15 },
                title: '1000 years',
              },
              infinite: {
                cost: { racePower: -20 },
                title: 'Infinite',
                text: <>
                  <p>Cannot die of old age.</p>
                </>,
              },
            },
          },
          syrength: {
            type: optionTypes.SELECT,
            title: 'Strength',
            text: <>
              <p>Descriptions that compare to entities from your old world assume the race is human sized.</p>
            </>,
            choices: {
              a: {
                cost: { racePower: 10 },
                title: '',
                text: <>
                  <p>Barely able to move their own bodies.</p>
                </>,
              },
              b: {
                cost: { racePower: 5 },
                title: '',
                text: <>
                  <p>Strength of a ten year old human child.</p>
                </>,
              },
              c: {
                title: '',
                text: <>
                  <p>Comparable to an average human.</p>
                </>,
              },
              d: {
                cost: { racePower: -5 },
                title: '',
                text: <>
                  <p>Human athlete.</p>
                </>,
              },
              e: {
                cost: { racePower: -10 },
                title: '',
                text: <>
                  <p>Strength of a wild beast.</p>
                </>,
              },
              f: {
                cost: { racePower: -20 },
                title: '',
                text: <>
                  <p>Can destroy a stone wall with bare hands.</p>
                </>,
              },
            },
          },
        },
      },
    },
  },
};