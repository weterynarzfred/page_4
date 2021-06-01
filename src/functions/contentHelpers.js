import React from 'react';
import Latex from 'react-latex';
import { useSelector } from 'react-redux';
import { getSelectedValue, isSelected } from '../functions/getSelectedValue';
import parsePath from '../functions/parsePath';
import formatNumber from './formatNumber';

function Mth(props) {
  const string = '$' + props.children.replace(/\u00AD/g, '') + '$';
  return <Latex strict={false}>{string}</Latex>;
};

function userFunction(callback, subscribed = []) {
  return {
    isUserFunction: true,
    callback: (state, option) => {
      return callback({
        state,
        option,
        isSelected: _isSelected.bind({ state, option }),
        getSelectedValue: _getSelectedValue.bind({ state, option }),
        getOption: _getOption.bind({ state, option }),
      });
    },
    subscribed,
  };
}

const _getOption = function (path) {
  const option = (typeof path === 'object') ?
    path :
    this.state.options[parsePath(path, this.option)];
  return option;
};

const _isSelected = function (path) {
  const option = _getOption.call(this, path);
  return isSelected(
    option,
    this.state.options
  );
};

const _getSelectedValue = function (path) {
  const option = _getOption.call(this, path);
  return getSelectedValue(
    option,
    this.state.options
  );
};

function Unit(props) {
  const unitType = useSelector(state => state.toggles.units);
  let unit = props.unit;
  let value = props.value;
  if (unitType === 'imperial') {
    switch (unit) {
      case 'm':
      case 'meters':
        value *= 3.28084;
        unit = 'ft';
        break;
      case 'km':
      case 'kilometers':
        value *= 0.6213712;
        unit = 'miles';
        break;
      case 'l':
      case 'liters':
        value *= 0.2199692;
        unit = 'gallons';
        break;
      case 'kg':
      case 'kilograms':
        value *= 2.204623;
        unit = 'pounds';
        break;
      case 'g':
      case 'grams':
        value *= 0.03527396;
        unit = 'ounces';
        break;
    }
  }
  value = formatNumber(value, props.precision ?? 2, {
    useSpaces: true,
    showSignificant: true,
  });
  return <>{value}&nbsp;{unit}</>;
}

export { userFunction, Mth, Unit };