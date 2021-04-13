import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { optionTypes } from 'Include/constants';
import { isSelected } from '../functions/getSelectedValue';
import ChoiceTable from './optionElements/ChoiceTable';
import OptionContent from './optionElements/OptionContent';
import isDisabled from './../functions/isDisabled';

function Option(props) {
  if (props.type === undefined) return null;

  const [opened, setOpened] = useState(!props.isDisabled);

  const isSelectable = [
    optionTypes.INTEGER,
    optionTypes.TEXT,
    optionTypes.SLIDER,
  ].includes(props.type);

  const isContainer = [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.RATIO,
    optionTypes.INSTANCER,
  ].includes(props.type);

  const isCollapsible = !props.topLevel && !props.isSelectablesChild && [
    optionTypes.GROUP,
    optionTypes.SELECT,
    optionTypes.RATIO,
    optionTypes.INSTANCER,
  ].includes(props.type);

  const classes = classNames(
    'Option',
    `option-${props.type}`,
    { 'selected': props.selected },
    { 'top-level': props.topLevel },
    { 'option-is-row': props.displayAsTableRow },
    { 'option-is-selectable': isSelectable },
    { 'option-is-container': isContainer },
    { 'option-disabled': props.isDisabled },
    { 'option-collapsible': isCollapsible },
    { 'option-collapsed': isCollapsible && !opened },
    { 'masonry-cell': props.isMasonryCell }
  );


  if (props.displayAsTableRow) {
    return (
      <ChoiceTable
        classes={classes}
        optionKey={props.optionKey}
      />
    );
  }
  else {
    return <OptionContent
      optionKey={props.optionKey}
      classes={classes}
      opened={opened}
      setOpened={() => setOpened(!opened)}
      isCollapsible={isCollapsible}
      topLevel={props.topLevel}
    />;
  }
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (
    option === undefined ||
    option.hidden
  ) return {};

  return {
    type: option.type,
    selected: isSelected(option, state.options),
    isDisabled: isDisabled(option, state.options),
    isSelectablesChild: option.isSelectablesChild,
  };
})(Option);
