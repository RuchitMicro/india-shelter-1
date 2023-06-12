import { useCallback, useContext } from 'react';
import { Button } from '../../components';
import { createPortal } from 'react-dom';
import { AuthContext } from '../../context/AuthContext';
import { steps } from './utils';
import PropTypes from 'prop-types';

const FormButton = ({ onButtonClickCB, onSubmit }) => {
  const { activeStepIndex, setActiveStepIndex, nextStep } = useContext(AuthContext);

  const onNextButtonClick = useCallback(() => {
    setActiveStepIndex((prev) => prev + 1);
    onButtonClickCB && onButtonClickCB();
  }, [onButtonClickCB, setActiveStepIndex]);

  const onPreviousButtonClick = useCallback(() => {
    setActiveStepIndex((prev) => prev - 1);
    onButtonClickCB && onButtonClickCB();
  }, [onButtonClickCB, setActiveStepIndex]);

  return createPortal(
    <div
      style={{
        zIndex: 100 * 100000,
        height: 127,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 45.31%)',
      }}
      className={`${
        activeStepIndex > 0 ? 'justify-between' : 'justify-end'
      } fixed flex bottom-0 w-full md:pr-[175px] md:pl-1 right-0 md:w-[732px] items-end pb-6 px-4 md:px-0`}
    >
      {activeStepIndex > 0 && (
        <Button type='button' onClick={onPreviousButtonClick}>
          Previous
        </Button>
      )}
      <Button
        disabled={nextStep}
        type={activeStepIndex === steps.length - 1 ? 'submit' : 'button'}
        primary
        onClick={activeStepIndex === steps.length - 1 ? onSubmit : onNextButtonClick}
      >
        {activeStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </div>,
    document.body,
  );
};

export default FormButton;

FormButton.propTypes = {
  onButtonClickCB: PropTypes.func,
  onSubmit: PropTypes.func,
};
