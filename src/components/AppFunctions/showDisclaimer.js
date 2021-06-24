import { actions } from '../../include/constants';
import { settings } from 'cyoa';

function showDisclaimer(dispatch) {
  const acceptButton = {
    onClick: () => {
      dispatch({
        type: actions.TOGGLE,
        key: 'disclaimerClosed',
      });
    },
    text: 'ok',
  };

  window.dispatchEvent(new CustomEvent('dialogOpen', {
    detail: {
      title: 'Disclaimer',
      text: settings.disclaimer,
      buttons: [acceptButton],
    }
  }));
}

export default showDisclaimer;