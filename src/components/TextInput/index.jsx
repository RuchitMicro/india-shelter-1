import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @param label - String
 * @param name - String
 * @param hint - String
 * @param error - String
 * @param Icon React JSX Element
 */
const TextInput = forwardRef(function TextInput(
  { label, name, hint, error, touched, Icon, inputClasses, displayError = true, ...props },
  ref,
) {
  const inputRef = useRef();

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='flex gap-0.5 items-center text-primary-black'>
        {label}
        {props.required && <span className='text-primary-red text-sm'>*</span>}
      </label>
      {hint && (
        <span
          className='mb-1.5 text-light-grey text-sm font-normal'
          dangerouslySetInnerHTML={{
            __html: hint,
          }}
        />
      )}
      <div
        role='button'
        tabIndex={-1}
        onClick={() => (ref ? ref.current.focus() : inputRef.current.focus())}
        onKeyDown={() => (ref ? ref.current?.focus() : inputRef.current.focus())}
        className={`input-container px-4 py-3 border rounded-lg 
        flex gap-1
        transition-all ease-out duration-150
        focus-within:border-secondary-blue focus-within:shadow-secondary-blue focus-within:shadow-primary
        ${
          error && touched
            ? 'border-primary-red shadow-primary shadow-primary-red'
            : 'border-light-grey'
        }
        ${props.value ? 'border-light-grey' : 'border-stroke'}
        ${props.disabled ? 'bg-[#fafafa] pointer-events-none cursor-not-allowed' : ''}
        `}
      >
        {Icon && <Icon />}
        <input
          className={`w-full focus:outline-none ${inputClasses}`}
          ref={ref || inputRef}
          id={name}
          name={name}
          {...props}
        />
      </div>
      {displayError ? (
        <span className='text-xs text-primary-red'>
          {error && touched ? error : String.fromCharCode(160)}
        </span>
      ) : (
        ''
      )}
    </div>
  );
});

export default TextInput;

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.bool,
  Icon: PropTypes.elementType,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputClasses: PropTypes.string,
  displayError: PropTypes.bool,
  disabled: PropTypes.bool,
};
