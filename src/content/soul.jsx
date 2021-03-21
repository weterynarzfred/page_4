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
};