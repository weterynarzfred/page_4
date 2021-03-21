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
};