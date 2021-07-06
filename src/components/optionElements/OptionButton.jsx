import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { deepClone } from '../../functions/deepFunctions';
import { isSelected } from '../../functions/getSelectedValue';
import { getUserValue } from '../../include/userValues';
import Currencies from '../Currencies';
import PathLink from '../PathLink';

function OptionButton(props) {
  if (!props.displayAsButton) return null;

  let currencies = null;
  if (props.isSelected && props.lastCurrencyValues !== undefined) {
    const subCurrencies = deepClone(props.lastCurrencyValues);
    const cost = getUserValue(props.optionKey, 'cost');
    if (cost !== '') {
      for (const currencyKey in cost) {
        subCurrencies[currencyKey] += cost[currencyKey];
      }
    }
    currencies = <Currencies
      currencies={subCurrencies}
      skipZero={true}
    />;
  }

  const button = <button className={classNames({ disabled: !props.isSelected })}>
    open details
    {currencies}
  </button>;

  return <div className="OptionButton button-container">
    {props.isSelected ?
      <PathLink path={props.optionKey}>
        {button}
      </PathLink> : button}
  </div>;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    displayAsButton: getUserValue(props.optionKey, 'displayAsButton'),
    lastCurrencyValues: option.lastCurrencyValues,
    isSelected: isSelected(option, state.options),
  };
})(OptionButton);