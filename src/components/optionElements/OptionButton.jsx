import React from 'react';
import { connect } from 'react-redux';
import { deepClone } from '../../functions/deepFunctions';
import { isSelected } from '../../functions/getSelectedValue';
import { getUserValue } from '../../include/userValues';
import Currencies from '../Currencies';
import PathLink from '../PathLink';

function OptionButton(props) {
  if (
    !props.displayAsButton ||
    props.lastCurrencyValues === undefined ||
    !props.isSelected
  ) return null;

  const subCurrencies = deepClone(props.lastCurrencyValues);
  const cost = getUserValue(props.optionKey, 'cost');
  if (cost !== '') {
    for (const currencyKey in cost) {
      subCurrencies[currencyKey] += cost[currencyKey];
    }
  }

  return <div className="OptionButton button-container">
    <PathLink path={props.optionKey}>
      <button>
        open details
        <Currencies
          currencies={subCurrencies}
          skipZero={true}
        />
      </button>
    </PathLink>
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