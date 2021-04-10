import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import Option from '../Option';
import classNames from 'classnames';
import { connect } from 'react-redux';

function SelectControls(props) {
  // const gridRef = useRef(null);
  // useEffect(() => {
  //   if (!props.option.displayAsTable) {
  //     new Masonry(gridRef.current, {
  //       itemSelector: '.masonry-cell',
  //       fitWidth: true,
  //       transitionDuration: 0,
  //     });
  //   }
  // }, []);

  // const choiceElements = [];
  // for (const slug in props.option.choices) {
  //   choiceElements.push(<Option
  //     key={slug}
  //     isMasonryCell={!props.option.displayAsTable}
  //     option={props.option.choices[slug]}
  //     currencies={props.currencies}
  //     displayAsTableRow={props.option.displayAsTable}
  //   />);
  // }

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

  // return (
  //   <div
  //     className={classNames(
  //       'SelectControls',
  //       { 'masonry-grid': !props.option.displayAsTable }
  //     )}
  //     ref={gridRef}
  //   >
  //     {content}
  //   </div>
  // );

  const choiceElements = [];
  for (const optionKey of props.choices) {
    choiceElements.push(<Option
      key={optionKey}
      optionKey={optionKey}
    />);
  }

  return (
    <div
      className={classNames(
        'SelectControls',
        'option-controls'
      )}
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