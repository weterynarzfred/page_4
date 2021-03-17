import _ from 'lodash';
import React from 'react';
import calculateCosts from './functions/calculateCosts';
import getOption from './functions/getOption';
import getSelected from './functions/getSelected';
import { optionTypes } from './include/enum';
import { callUserFunction } from './include/userFunctions';

const settings_test = {
  currencies: {
    gold: {
      title: 'Gold',
      start: 100,
    },
    magic: {
      title: 'Magic',
    },
  },
};

const options_test = {
  testA: state => {
    callUserFunction(getOption('testB', state.options), state);
    return {
      title: `Test A - ${getSelected('testB', state.options)}`,
      type: optionTypes.INTEGER,
    };
  },
  testB: state => {
    const racesOption = getOption('friendlyRaces', state.options);
    callUserFunction(racesOption, state);
    const races = getSelected('friendlyRaces', state.options).map(
      selected => racesOption.choices[selected].title
    );
    return {
      title: `Test B - ${races.join(', ')}`,
      type: optionTypes.INTEGER,
    };
  },
  main: {
    title: 'Main',
    type: optionTypes.GROUP,
    currencies: {
      manliness: {
        title: 'Manliness',
      },
    },
    options: {
      yourName: {
        title: 'Your Name',
        type: optionTypes.TEXT,
      },
      beAGirl: state => {
        return {
          title: `Be a Girl ${getSelected('main.yourName', state.options)}`,
          type: optionTypes.INTEGER,
          cost: { gold: 2, manliness: -5 },
        };
      },
    },
  },
  function: state => {
    const main = getOption('main', state.options);
    calculateCosts(state.options, main.currencies, true);
    return {
      title: `Function ${main.currencies.manliness.value}`,
      type: optionTypes.TEXT,
    };
  },
  friendlyRaces: state => {
    const choices = {};
    const races = getSelected('races', state.options);
    for (const raceSlug in races) {
      if (isNaN(raceSlug)) continue;
      const magic = getSelected(`races.${raceSlug}.magic`, state.options);
      const name = getSelected(`races.${raceSlug}.name`, state.options);
      choices[raceSlug] = {
        title: name,
        cost: { gold: name.length, magic: -magic },
      };
    }
    return {
      title: 'Friendly Races',
      type: optionTypes.SELECT,
      choices,
    };
  },
  races: {
    title: 'Races',
    type: optionTypes.INSTANCER,
    instanceOptions: {
      name: {
        title: 'Name',
        type: optionTypes.TEXT,
        selected: 'Race',
      },
      magic: state => {
        return {
          title: `Magic ${getSelected('main.yourName', state.options)}`,
          type: optionTypes.INTEGER,
        };
      },
    },
  },
  worlds: {
    title: 'Worlds',
    type: optionTypes.INSTANCER,
    cost: {
      gold: 1,
    },
    instanceOptions: {
      a: {
        title: 'A',
        type: optionTypes.TEXT,
      },
      races: state => {
        const choices = {
          test: {
            title: 'Test',
          },
        };
        const races = getSelected('races', state.options);
        for (const raceSlug in races) {
          if (isNaN(raceSlug)) continue;
          choices[raceSlug] = {
            title: getSelected(`races.${raceSlug}.name`, state.options),
          };
        }
        return {
          title: 'Races',
          type: optionTypes.SELECT,
          choices,
        };
      },
    },
  },
};

/**
 * Each options can be an object or a function returning one. Function will receive the state as its argument. Each option object can have properties:
 * title - display name of the option
 * type - one of optionTypes
 * selected - initial value of the option
 *
 * if type !== optionTypes.GROUP
 * cost - object with costs of each time the option is bought
 *
 * if type === optionTypes.GROUP
 * options - suboptions of the group, same rules apply as for any other option
 *
 * if type === optionTypes.SELECT
 * choices - choices to select from, ech choice can have:
 *  title - display name of the choice
 *  cost - object with costs of the choice
 *
 * if type === optionTypes.INSTANCER
 * instanceOptions - suboptions of each of the created instances, same rules apply as for any other option
 */

const settings = {
  currencies: {
    delta_s: {
      title: 'Delta S',
    },
  },
};

const options = {
  intro: {
    type: optionTypes.GROUP,
    title: 'Intro',
    options: {
      yourSituation: {
        type: optionTypes.GROUP,
        title: 'Your Situation',
        text: (
          <>
            <p><strong>You have become a planeswalker.</strong> You keep your old body for now. You are currently in the interplanar space. An infinite meta spacetime where anything can exist but nothing can interact or be interacted with. When you are inside, time is effectively stopped everywhere else. You can leave at any moment to travel to new planes and to inhabit new bodies.</p>
            <p>To start you off, <strong>here are some free boons</strong> for you, you can turn them on or off during your stay in the interplanar space.</p>
          </>
        ),
        options: {
          immortality: {
            type: optionTypes.INTEGER,
            min: 0,
            max: 1,
            selected: 1,
            title: 'Immortality',
            text: (
              <>
                <p>While <strong>your body is still mortal, after death your soul will be moved to the interplanar space from where you will be able to move onto your next life</strong>. A soul contains your memories as well as personality. Each body's chemistry will effect your mood but not goals and motivations.</p>
                <p>When switching bodies you can choose to keep any psychological characteristics your old body had, like sexual preferences, quirks or even disorders if you wish to.</p>
              </>
            ),
          },
          mentalGuard: {
            type: optionTypes.INTEGER,
            title: 'Mental Guard',
            min: 0,
            max: 1,
            selected: 1,
            text: <>
              <p>While <strong>a mind of your mortal bodies can be damaged both physically and mentally, as soon as your soul separates from it you will return to a perfectly healthy mental state</strong>. This includes removing trauma, addiction, depression and similar. Additionally, this <strong>ensures that you will not grow tired of simple pleasures without getting addicted</strong> and will always pursue your goals with full strength. Your mind is in a perfectly healthy state when you are entering a new body but then this effect is turned off until you leave.</p>
            </>,
          },
          cellularAdaptation: {
            type: optionTypes.INTEGER,
            title: 'Cellular Adaptation',
            min: 0,
            max: 2,
            selected: 1,
            text: <>
              <p>If you decide to use the same body in multiple planes, its bacterial flora, antibodies as well as any pathogens it might be carrying will be adjusted so that <strong>you will not start an epidemic unwillingly and that you will not catch anything most inhabitants are immune to</strong>.</p>
            </>,
          },
        },
      },
    },
  },
  soul: {
    type: optionTypes.GROUP,
    title: 'Soul',
    text: <>
      <p>Planeswalker's soul is his most valued possesion. Thankfully you, like all planeswalkers, possess immortality so you won't loose your soul unless you wish to.</p>
      <p>Soul options modify your Δ_s. They cannot be modified later unless you take the "Test Mode" option.</p>
    </>,
    options: {
      earthBan: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -10,
        },
        title: 'Earth Ban',
        text: <>
          <p>You will be ejected and unable to come back to your home plane. You are able to select plane options that will be very similar to your old home, but they will never be the same. Geopolitics, history and most importantly anyone you knew will be completely different.</p>
        </>,
      },
      restrictedTravel: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -20,
        },
        title: 'Restricted Travel',
        text: <>
          <p>Normally you can planeswalk any time you want. This option limits you to three planeswalks, each of them refreshes 10 years after use. Traveling to the interplanar space does not count but going back does.</p>
        </>,
      }
    },
  },
};

export { options, settings };
