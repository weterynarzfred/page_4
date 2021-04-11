import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from '../Option';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { deepEquals } from '../../functions/deepFunctions';

function SelectControls(props) {
  if (props.choices === undefined) return null;

  const gridRef = useRef(null);
  const masonryElement = useRef();

  useEffect(() => {
    if (props.useMasonry) {
      masonryElement.current = new Masonry(gridRef.current, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (props.useMasonry) {
      masonryElement.current.reloadItems();
      masonryElement.current.layout();
    }
  }, [props.choices]);

  const choiceElements = [];
  for (const optionKey of props.choices) {
    choiceElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
      isMasonryCell={props.useMasonry}
      displayAsTableRow={props.displayAsTable}
    />);
  }


  let content;
  if (props.displayAsTable) {
    content = <table>
      <tbody>
        {choiceElements}
      </tbody>
    </table>;
  }
  else {
    content = choiceElements;
  }

  return (
    <div
      className={classNames(
        'SelectControls',
        'option-controls',
        { 'masonry-grid': props.useMasonry }
      )}
      ref={gridRef}
    >
      {content}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  if (option.choices === undefined) return {};
  const choices = option.choices.filter(optionKey =>
    !state.options[optionKey].hidden
  );
  return {
    choices: option.choices,
    displayAsTable: option.displayAsTable,
  };
}, null, null, { areStatePropsEqual: deepEquals })(SelectControls);