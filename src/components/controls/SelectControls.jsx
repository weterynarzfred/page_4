import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'masonry-layout';
import Option from '../Option';
import classNames from 'classnames';
import { connect } from 'react-redux';

function SelectControls(props) {
  // let content;
  // if (props.option.displayAsTable) {
  //   content = <table>
  //     <tbody>
  //       {choiceElements}
  //     </tbody>
  //   </table>;
  // }
  // else {
  //   content = choiceElements;
  // }

  if (props.choices === undefined) return null;
  const [msnry, setMsnry] = useState();

  const gridRef = useRef(null);
  useEffect(() => {
    if (props.useMasonry) {
      setMsnry(new Masonry(gridRef.current, {
        itemSelector: '.masonry-cell',
        fitWidth: true,
        transitionDuration: 0,
      }));
    }
  }, []);
  useEffect(() => {
    if (props.useMasonry) {
      if (msnry !== undefined) {
        msnry.reloadItems();
        msnry.layout();
      }
    }
  }, [props.choices]);

  const choiceElements = [];
  for (const optionKey of props.choices) {
    choiceElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
      isMasonryCell={props.useMasonry}
    />);
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
      {choiceElements}
    </div>
  );
}

export default connect((state, props) => {
  const option = state.options[props.optionKey];
  return {
    choices: option.choices,
  };
})(SelectControls);