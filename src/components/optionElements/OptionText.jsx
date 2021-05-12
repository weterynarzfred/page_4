import { connect } from 'react-redux';
import { getUserValue } from '../../include/userValues';

function OptionText(props) {
  return props.text;
}

export default connect((state, props) => ({
  text: getUserValue(props.optionKey, 'text'),
}))(OptionText);
