import _ from 'lodash';
import React from 'react';
import { optionTypes } from 'Include/enum';
import { callUserFunction } from 'Include/userFunctions';
import calculateCosts from 'Functions/calculateCosts';
import getOption from 'Functions/getOption';
import getSelectedValue from 'Functions/getSelectedValue';
import isSelected from './functions/isSelected';
import { callOptionFunction } from './include/userFunctions';

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
            callback: state => !getSelectedValue('soul.simpleMode', state.options),
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
            callback: state => getSelectedValue('soul.simpleMode', state.options),
          },
          {
            text: <>No other "Soul" options can be selected.</>,
            callback: (state, option) => {
              return !(
                getSelectedValue('soul.earthBan', state.options) ||
                getSelectedValue('soul.restrictedTravel', state.options) ||
                getSelectedValue('soul.slowExploration', state.options) ||
                getSelectedValue('soul.eideicMemory', state.options) ||
                getSelectedValue('soul.eternalWanderer', state.options) ||
                getSelectedValue('soul.grantPlaneswalk', state.options) ||
                getSelectedValue('soul.omnilingualism', state.options) ||
                getSelectedValue('soul.testMode', state.options) ||
                getSelectedValue('soul.saveSlot', state.options)
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
          calculateCosts(state.options, getOption(bodies[bodySlug], state.options).currencies, true);
          const cost = bodies[bodySlug].currencies.delta_b.value;
          choices[bodySlug] = {
            title,
            cost: { delta_s: -cost },
          };
        }

        return {
          type: optionTypes.SELECT,
          choices,
        };
      },
    },
  },
  body: {
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
      title: (state, option) => {
        return getSelectedValue(`body.${option.path.slice(-1)}.bodyName`, state.options);
      },
      options: {
        bodyName: {
          type: optionTypes.TEXT,
          title: (state, option) => `Body Name ${getSelectedValue(`body.${option.path.slice(-2, -1)}.sex`, state.options)}`,
          selected: 'Body',
        },
        test: {
          type: optionTypes.INTEGER,
          cost: { delta_b: 25 },
          title: (state, option) => `Test ${isSelected(`${option.path.slice(0, -1).join('.')}.arrival.birth`, state.options) ? 'true' : 'false'}`,
          requirements: [
            {
              text: 'test text',
              callback: (state, option) => {
                return true;
              },
            },
          ],
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
              title: 'Possesion',
              text: <>
                <p>This body will have to access the plane through haunting or possesion. Skip selecting race, gender, age, strength and beauty when choosing options in this section.</p>
              </>,
            },
          },
        },
      },
    },
  },
};

export { options, settings };
