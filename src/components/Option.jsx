import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { actions, optionTypes } from '../include/constants';
import { isSelected } from '../functions/getSelectedValue';
import isDisabled from '../functions/isDisabled';
import ChoiceTable from './optionElements/ChoiceTable';
import OptionContent from './optionElements/OptionContent';
import { getUserValue } from '../include/userValues';

function toggleOpened() {
  this.dispatch({
    type: actions.SET,
    optionKey: this.optionKey,
    key: 'opened',
    value: !this.opened,
  });
}

function Option(props) {
  if (props.type === undefined) return null;

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
    { 'option-collapsed': isCollapsible && !props.opened },
    { 'option-without-title': props.withoutTitle },
    { 'masonry-cell': props.isMasonryCell },
    props.userClasses
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
      setOpened={toggleOpened.bind(props)}
      isCollapsible={isCollapsible}
      topLevel={props.topLevel}
    />;
  }
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (
    option === undefined ||
    option.hidden ||
    (!props.topLevel && option.hiddenInParent)
  ) return {};

  return {
    type: option.type,
    selected: isSelected(option, state.options),
    isDisabled: isDisabled(option, state.options),
    isSelectablesChild: option.isSelectablesChild,
    userClasses: option.classes,
    opened: option.opened ?? true,
    withoutTitle: getUserValue(props.optionKey, 'title') === '',
  };
})(Option);
