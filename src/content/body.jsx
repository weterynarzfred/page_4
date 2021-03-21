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
  title: 'Body',
  text: <>
    <p>In this section you will create bodies that you will be able to use yourself. Those options influence your Δ_b. You cannot change selected options for an already created body but you can create new ones at any time.</p>
  </>,
  instanceGroup: {
    currencies: {
      delta_b: {
        title: 'Delta B',
      },
    },
    title: (state, option) => getSelectedValue(
      [...option.path, 'bodyName'],
      state.options
    ),
    options: {
      bodyName: {
        type: optionTypes.TEXT,
        title: (state, option) => `Body Name ${getSelectedValue(`body.${option.path.slice(-2, -1)}.sex`, state.options)}`,
        selected: 'Body',
      },
      sex: {
        type: optionTypes.SELECT,
        title: 'Sex',
        text: <>
          <p>Select the biological sex of the body.</p>
        </>,
        choices: {
          male: {
            title: 'Male',
            text: <>
              <p>Has XY chromosomes and male genitalia.</p>
            </>,
          },
          female: {
            title: 'Female',
          },
          hermaphrodite: {
            title: 'Hermaphrodite',
          },
        },
      },
      arrival: {
        type: optionTypes.SELECT,
        title: 'Arrival',
        choices: {
          creation: {
            cost: { delta_b: 25 },
            title: 'Creation',
            image: 'creation.jpg',
            text: <>
              <p>Your body will be created at the selected age. You will have to enter your first plane though teleportation or summoning.</p>
            </>,
          },
          birth: {
            cost: { delta_b: -10 },
            title: 'Birth',
            text: <>
              <p>You are born as a random sapient child in the plane. This happens before a soul is bound to the child. You will keep your memories but your physical and magical capabilities will be impaired until you reach adulthood. At the same time your learning speed will be increased.</p>
              <p>You can select any race that is present in the plane, you will be born to a mother of this race.</p>
            </>,
            options: {
              surrogateBirth: {
                type: optionTypes.INTEGER,
                cost: { delta_b: 10 },
                title: 'Surrogate Birth',
                text: <>
                  <p>The child can be born to a mother of a different race.</p>
                </>,
              },
              specificChild: {
                type: optionTypes.INTEGER,
                cost: { delta_b: 5 },
                title: 'Specific Child',
                text: <>
                  <p>You can select a specific unborn child. For at least a moment, you have to, physically be in the vicinity of the mother, or the child in case of an artificial womb, to select them.</p>
                </>,
              },
              timeSkip: {
                type: optionTypes.INTEGER,
                cost: { delta_b: 20 },
                title: 'Time Skip',
                text: <>
                  <p>Time will be skipped so that you appear inside the body at your chosen age, up to 10 years old. Up to that point your body will behave similarly as you might have behaved if you didn't have your memories and powers. You will remember everything your body has experienced but without any emotional baggage.</p>
                </>,
              },
            },
          },
          possesion: {
            cost: { delta_b: 10 },
            requirements: [
              {
                text: 'Body has to be male of female',
                callback: (state, option) => {
                  return getSelectedValue(
                    `${option.path.slice(0, -2).join('.')}.sex`,
                    state.options
                  ).some(e => ['male', 'female'].includes(e));
                },
              },
            ],
            title: 'Possesion',
            text: <>
              <p>This body will have to access the plane through haunting or possesion. Skip selecting race, gender, age, strength and beauty when choosing options in this section.</p>
            </>,
          },
        },
      },
      race: state => {
        const choices = {};
        const races = getSelectedValue('race', state.options);
        for (const raceSlug in races) {
          if (isNaN(raceSlug)) continue;
          const title = getSelectedValue(
            `race.${raceSlug}.raceName`,
            state.options
          );
          calculateCosts(state.options, state.currencies, true);
          const cost = races[raceSlug].currencies.racePoints.value;
          choices[raceSlug] = {
            title,
            text: <><p>
              <PathLink path={races[raceSlug].path.join('.')}>edit</PathLink>
            </p></>,
            cost: { delta_b: -cost },
          };
        }

        return {
          type: optionTypes.SELECT,
          title: 'Race',
          text: <>
            <p>Choose any race you have already created or create a new one and use the body attributes section. Subtract their Race Points from your body's Δ_b. Choosing a race that is not present in the plane has no consequences except for not being able to use the "Birth" option without the modifier and changing the way native inhabitants will perceive you.</p>
            <p>You can choose what you will look like within the constraints of the chosen race. Your looks might get slightly changed to better reflect your stats.</p>
          </>,
          choices,
        };
      },
    },
  },
};