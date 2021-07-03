import React from 'react';
import { connect } from 'react-redux';
import { deepClone } from '../../functions/deepFunctions';
import { getUserValue } from '../../include/userValues';
import Currencies from '../Currencies';
import PathLink from '../PathLink';

function OptionButton(props) {
  if (!props.displayAsButton) return null;

  return <div className="OptionButton button-container">
    <PathLink path={props.optionKey}>
      <button>
        open details
        <Currencies
          currencies={deepClone(props.lastCurrencyValues)}
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
  };
})(OptionButton);