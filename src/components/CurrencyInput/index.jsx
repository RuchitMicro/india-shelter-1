import TextInput from '../TextInput';
import { IconRupee } from '../../assets/icons';
import PropTypes from 'prop-types';

const currencyFormatter = new Intl.NumberFormat('en-In', { maximumFractionDigits: 0 });
const currencyToFloat = (amount) =>
  parseFloat(amount.replace('.', '').replace(',', '').replace(/\D/g, ''));

const CurrencyInput = ({ ...props }) => {
  let amount = currencyToFloat(props.value);

  return (
    <TextInput
      {...props}
      type='tel'
      Icon={IconRupee}
      value={currencyFormatter.format(isNaN(amount) ? 0 : amount)}
      onChange={(event) => {
        let amount = currencyToFloat(event.currentTarget.value);
        const modifiedEvent = Object.assign({}, event);
        modifiedEvent.target.value = amount;

        props.onChange(modifiedEvent);
      }}
    />
  );
};

export default CurrencyInput;

CurrencyInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
