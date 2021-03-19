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
  instancer: state => {
    return {
      type: optionTypes.INSTANCER,
      title: 'Instancer',
      instanceOptions: {
        title: (state, option) => {
          const currentSlug = option.path.slice(-2, -1);
          return {
            type: optionTypes.TEXT,
            title: `Name: ${getSelected(`instancer.${currentSlug}.optionC`, state.options)}`,
          };
        },
        optionC: {
          type: optionTypes.INTEGER,
          title: 'C',
        },
      },
    };
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
    test: {
      title: 'Test',
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
        image: 'intro.jpg',
        text: (
          <>
            <p><strong>You have become a planeswalker.</strong> You keep your old body for now. You are currently in the interplanar space. An infinite meta spacetime where anything can exist but nothing can interact or be interacted with. When you are inside, time is effectively stopped everywhere else. You can leave at any moment to travel to new planes and to inhabit new bodies.</p>
            <p>To start you off, <strong>here are some free boons</strong> for you, you can turn them on or off during your stay in the interplanar space.</p>
          </>
        ),
        options: {
          immortality: {
            type: optionTypes.INTEGER,
            selected: 1,
            title: 'Immortality',
            image: 'immortality.jpg',
            text: (
              <>
                <p>While <strong>your body is still mortal, after death your soul will be moved to the interplanar space from where you will be able to move onto your next life</strong>. A soul contains your memories as well as personality. Each body's chemistry will effect your mood but not goals and motivations.</p>
                <p>When switching bodies you can choose to keep any psychological characteristics your old body had, like sexual preferences, quirks or even disorders if you wish to.</p>
              </>
            ),
          },
          mentalGuard: {
            type: optionTypes.INTEGER,
            selected: 1,
            title: 'Mental Guard',
            image: 'mental_guard.jpg',
            text: <>
              <p>While <strong>a mind of your mortal bodies can be damaged both physically and mentally, as soon as your soul separates from it you will return to a perfectly healthy mental state</strong>. This includes removing trauma, addiction, depression and similar. Additionally, this <strong>ensures that you will not grow tired of simple pleasures without getting addicted</strong> and will always pursue your goals with full strength. Your mind is in a perfectly healthy state when you are entering a new body but then this effect is turned off until you leave.</p>
            </>,
          },
          cellularAdaptation: {
            type: optionTypes.INTEGER,
            selected: 1,
            title: 'Cellular Adaptation',
            image: 'cellular_adaptation.jpg',
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
        image: 'earth_ban.jpg',
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
        image: 'restricted_travel.jpg',
        text: <>
          <p>Normally you can planeswalk any time you want. This option limits you to three planeswalks, each of them refreshes 10 years after use. Traveling to the interplanar space does not count but going back does.</p>
        </>,
      },
      slowExploration: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -20,
          test: 5,
        },
        title: 'Slow Exploration',
        image: 'slow_exploration.jpg',
        text: <>
          <p>You should get comfortable wherever you decide to go, especially in the beginning. Normally you can create new planes any time you want. <strong>This option limits you to one new plane every 50 years. Only time spent living within planes counts.</strong> If you end up with no karma and no planes with non-negative Δ_p you will get stuck forever.</p>
        </>,
      },
      simpleMode: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -20,
        },
        title: 'Simple Mode',
        image: 'simple_mode.jpg',
        text: <>
          <p>Instead of your karmakarma having to be zero or positive, you need to keep your Δ above or equal zero at all times. This means you can no longer accumulate karma in harsh conditions to use it up later on places and/or bodies with negative Δ. This makes keeping track of your karma pointless.</p>
        </>,
      },
      eideicMemory: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: 10,
        },
        title: 'Eideic Memory',
        image: 'eideic_memory.jpg',
        text: <>
          <p>You are able to perfectly remember anything you've experienced. Memories stored with this ability are separate from your mind and require a conscius thought to recall, but are easily searchable.</p>
        </>,
      },
      eternalWanderer: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -100,
        },
        title: 'Eternal Wanderer',
        image: 'eternal_wanderer.jpg',
        text: <>
          <p>Once you leave a plane for any reason you are permanently banned from entering it ever again. Works the same way the "Earth Ban" does.</p>
        </>,
      },
      grantPlaneswalk: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: 10,
        },
        requirements: [
          {
            text: <>Cannot be taken in "Simple Mode".</>,
            callback: state => !getSelected('soul.simpleMode', state.options),
          }
        ],
        title: 'Grant Planeswalk',
        image: 'grant_planeswalk.jpg',
        text: <>
          <p>For a cost of 10 000 karma per soul you are able to grant anyone you wish the possiblity to become a planeswalker like you and fill this CYOA. You can restrict their choices in any way you want but this will not change the Δ_s cost of this option or the karma cost of granting planeswalk.</p>
        </>,
      },
      omnilingualism: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: 10,
        },
        title: 'Omnilingualism',
        image: 'omnilingualism.jpg',
        text: <>
          <p>You are able to instantly learn, speak, read, write and understand any language fluently. This does not include communication with animals, machines, computer code or any similar.</p>
        </>,
      },
      testMode: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: 20,
        },
        title: 'Test Mode',
        image: 'test_mode.jpg',
        text: <>
          <p>As long as test mode is chosen, you can switch your soul options at any time. Once deactivated, you cannot activate it again. Planes you get banned from in the "Test Mode" stay this way after changing the options. If at any point when the "Test Mode" was on, "Slow Exploration" was not enabled "Slow Exploration" cannot be enabled anymore.</p>
        </>,
      },
      saveSlot: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: 50,
        },
        max: Infinity,
        title: 'Save Slot',
        image: 'save_slot.jpg',
        text: <>
          <p>You get one save slot. You can save and load at any time. Saves rewind everything except your karma. First save can be made only after you finalize this CYOA.</p>
        </>,
      },
      rejectTheOffer: {
        type: optionTypes.INTEGER,
        cost: {
          delta_s: -20,
        },
        requirements: [
          {
            text: <>Requires "Simple Mode".</>,
            callback: state => getSelected('soul.simpleMode', state.options),
          },
          {
            text: <>No other "Soul" options can be selected.</>,
            callback: (state, option) => {
              return !(
                getSelected('soul.earthBan', state.options) ||
                getSelected('soul.restrictedTravel', state.options) ||
                getSelected('soul.slowExploration', state.options) ||
                getSelected('soul.eideicMemory', state.options) ||
                getSelected('soul.eternalWanderer', state.options) ||
                getSelected('soul.grantPlaneswalk', state.options) ||
                getSelected('soul.omnilingualism', state.options) ||
                getSelected('soul.testMode', state.options) ||
                getSelected('soul.saveSlot', state.options)
              );
            },
          },
        ],
        title: 'Reject the Offer',
        image: 'reject_the_offer.jpg',
        text: <>
          <p>You loose the gift of planeswalking. You can create a new body, complete with a race and magic system. You will reappear in your old world. This can be used to continue living your old life with new boons, or to begin as a completely new person. Same as for all people in your old world there is no way to know what will happen to you after death.</p>
        </>,
      },
    },
  },
  test: {
    type: optionTypes.TEXT,
    title: 'Test',
  },
  body: {
    type: optionTypes.INSTANCER,
    title: 'Body',
    text: <>
      <p>In this section you will create bodies that you will be able to use yourself. Those options influence your Δ_b. You cannot change selected options for an already created body but you can create new ones at any time.</p>
    </>,
    instanceGroup: {
      title: (state, option) => {
        return getSelected(`body.${option.path.slice(-1)}.bodyName`, state.options) || 'body';
      },
      options: {
        bodyName: (state, option) => {
          return {
            type: optionTypes.TEXT,
            title: `Body Name ${getSelected(`body.${option.path.slice(-2, -1)}.gender`, state.options)}`,
          };
        },
        gender: {
          type: optionTypes.SELECT,
          title: 'Gender',
          choices: {
            male: {
              title: 'Male',
            },
            female: {
              title: 'Female',
            },
            hermaphrodite: {
              title: 'Hermaphrodite',
            },
          },
        },
      },
    },
  },
};

export { options, settings };
