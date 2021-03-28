import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { optionTypes } from 'Include/enum';
import { isSelected } from '../functions/getSelectedValue';
import deepClone from '../functions/deepClone';
import ChoiceTable from './optionElements/ChoiceTable';
import OptionContent from './optionElements/OptionContent';

function Option(props) {
  if (props.option.hidden) return null;

  const currencies = deepClone(props.currencies);
  if (props.option.currencies !== undefined) {
    Object.assign(currencies, deepClone(props.option.currencies));
  }

  const classes = classNames(
    'Option',
    `option-${props.option.type}`,
    { 'selected': isSelected(props.option, props.options) },
    { 'top-level': props.topLevel },
    { 'option-is-row': props.displayAsTableRow },
    {
      'option-is-selectable': [
        optionTypes.INTEGER,
        optionTypes.TEXT,
      ].includes(props.option.type)
    },
    {
      'option-is-container': [
        optionTypes.GROUP,
        optionTypes.SELECT,
        optionTypes.INSTANCER,
      ].includes(props.option.type)
    },
    { 'masonry-cell': props.isMasonryCell }
  );


  if (props.displayAsTableRow) {
    return (
      <ChoiceTable
        classes={classes}
        option={props.option}
        currencies={currencies}
      />
    );
  }
  else {
    return (
      <OptionContent
        topLevel={props.topLevel}
        classes={classes}
        option={props.option}
        currencies={currencies}
      />
    );
  }


}

export default connect(state => ({
  options: state.options,
}))(Option);