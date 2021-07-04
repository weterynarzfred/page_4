import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Option from '../../components/Option';
import { deepEquals } from '../../functions/deepFunctions';
import { optionTypes } from '../../include/constants';
import { getUserValue } from '../../include/userValues';

function GroupControls(props) {
  if (props.subOptions === undefined) return null;
  if (!props.topLevel && getUserValue(props.optionKey, 'displayAsButton'))
    return null;

  const optionElements = [];
  for (const optionKey of props.subOptions) {
    optionElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
      isMasonryCell={props.useMasonry}
      displayAsTableRow={props.displayAsTable}
    />);
  }
  if (optionElements.length === 0) return null;

  let content;
  if (props.displayAsTable) {
    content = <table>
      <tbody>
        {optionElements}
      </tbody>
    </table>;
  }
  else {
    content = optionElements;
  }

  return (
    <div
      className={classNames(
        'GroupControls',
        'option-controls',
        { 'masonry-grid': props.useMasonry },
        { [`masonry-${props.subOptions.length}`]: props.useMasonry }
      )}
    >
      {content}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  let subOptions;
  if ([
    optionTypes.GROUP,
    optionTypes.INTEGER,
    optionTypes.SLIDER,
    optionTypes.INSTANCER,
  ].includes(option.type)) subOptions = option.options;
  else if (option.type === optionTypes.RATIO || option.type === optionTypes.SELECT) subOptions = option.choices;

  if (subOptions === undefined) return {};

  subOptions = subOptions.filter(optionKey =>
    !state.options[optionKey].hidden
  );

  if (subOptions.length === 0) return {};

  return {
    subOptions,
    displayAsTable: option.displayAsTable,
  };
}, null, null, { areStatePropsEqual: deepEquals })(GroupControls);
