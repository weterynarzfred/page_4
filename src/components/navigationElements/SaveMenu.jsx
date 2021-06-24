import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../include/constants';

function onSaveLoaded(event) {
  document.getElementById('select-save-file').value = '';

  let data;
  try {
    data = JSON.parse(event.currentTarget.result);
    if (data.cyoaId !== this.cyoaId) {
      window.dispatchEvent(new CustomEvent('dialogOpen', {
        detail: {
          title: 'Load',
          text: <>
            <p>CYOA ID mismatch.</p>
            <code>your id: {data.cyoaId}<br />
              expected id: {this.cyoaId}</code>
          </>,
          buttons: [{ text: 'ok :(' }],
        }
      }));
      return;
    }
  }
  catch (err) {
    console.error(err);
    window.dispatchEvent(new CustomEvent('dialogOpen', {
      detail: {
        title: 'Load',
        text: <p>It went badly. Loaded file is not correct.</p>,
        buttons: [{ text: 'ok :(' }],
      }
    }));
    return;
  }

  this.dispatch({
    type: actions.LOAD_DATA,
    payload: data,
  });

  window.dispatchEvent(new CustomEvent('dialogOpen', {
    detail: {
      title: 'Load',
      text: <p>State loaded successfully.</p>,
      buttons: [{ text: 'ok', }],
    }
  }));
}

function onFileChanged(event) {
  const reader = new FileReader();
  reader.onload = onSaveLoaded.bind(this);
  reader.readAsText(event.currentTarget.files[0]);
}

function SaveMenu(props) {
  const saveData = {
    cyoaId: props.cyoaId,
    options: {},
    toggles: props.toggles,
  };

  for (const optionKey in props.options) {
    saveData.options[optionKey] = {};
    for (const prop in props.options[optionKey]) {
      if ([
        'slug',
        'path',
        'optionKey',
        'lastCurrencyValues'
      ].includes(prop)) continue;
      saveData.options[optionKey][prop] = props.options[optionKey][prop];
    }
  }

  let saveString = JSON.stringify(saveData);
  if (process.env.NODE_ENV === 'development') {
    let indentLevel = 0;
    saveString = saveString.replaceAll(/([\{\[,])/g, "$1\n")
      .replaceAll(/([\}\]])/g, "\n$1")
      .replaceAll(/:/g, ': ')
      .replaceAll(/^.*$/gm, (match) => {
        if (match.match(/[\}\]],?$/)) indentLevel--;
        let indent = '';
        for (let i = 0; i < indentLevel; i++) indent += '  ';
        if (match.match(/[\{\[]$/)) indentLevel++;
        return indent + match;
      });
  }

  return <>
    <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(saveString)}
      download="guide-to-planeswalking-save.json">
      <button>save</button>
    </a>
    <label>
      <input type="file" id="select-save-file"
        onChange={onFileChanged.bind(props)} />
      <div className="button">load</div>
    </label>
  </>;
}

export default connect(function (state) {
  return {
    options: state.options,
    cyoaId: state.cyoaId,
    toggles: state.toggles,
  };
})(SaveMenu);