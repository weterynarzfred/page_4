import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { optionTypes } from 'Include/constants';
import { isSelected } from '../functions/getSelectedValue';
import deepClone from '../functions/deepClone';
import ChoiceTable from './optionElements/ChoiceTable';
import OptionContent from './optionElements/OptionContent';
import isDisabled from './../functions/isDisabled';

function Option(props) {
  if (props.type === undefined) return null;
  // if (props.option.hidden) return null;

  const [opened, setOpened] = useState(true);

  // const currencies = deepClone(props.currencies);
  // if (props.option.currencies !== undefined) {
  //   Object.assign(currencies, deepClone(props.option.currencies));
  // }

  const isSelectable = [
    optionTypes.INTEGER,
    optionTypes.TEXT,
    optionTypes.SLIDER,
  ].includes(props.type);

  const isContainer = [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.INSTANCER,
  ].includes(props.type);

  // const isCollapsible = !props.topLevel && [
  //   optionTypes.GROUP,
  //   optionTypes.SELECT,
  // ].includes(props.option.type);

  const classes = classNames(
    'Option',
    `option-${props.type}`,
    { 'selected': props.selected },
    //   { 'top-level': props.topLevel },
    //   { 'option-is-row': props.displayAsTableRow },
    { 'option-is-selectable': isSelectable },
    { 'option-is-container': isContainer },
    { 'option-disabled': props.isDisabled },
    //   { 'option-collapsible': isCollapsible },
    //   { 'option-collapsed': isCollapsible && !opened },
    { 'masonry-cell': props.isMasonryCell }
  );


  // if (props.displayAsTableRow) {
  //   return (
  //     <ChoiceTable
  //       classes={classes}
  //       option={props.option}
  //       currencies={currencies}
  //     />
  //   );
  // }
  // else {
  //   return (
  //     <OptionContent
  //       topLevel={props.topLevel}
  //       classes={classes}
  //       option={props.option}
  //       currencies={currencies}
  //       isCollapsible={isCollapsible}
  //       opened={opened}
  //       setOpened={() => setOpened(!opened)}
  //     />
  //   );
  // }


  return <OptionContent
    optionKey={props.optionKey}
    classes={classes}
    opened={opened}
    setOpened={setOpened}
  />;
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (option === undefined) return {};

  return {
    type: option.type,
    selected: isSelected(option, state.options),
    isDisabled: isDisabled(option),
  };
})(Option);