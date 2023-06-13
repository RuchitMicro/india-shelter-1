import { useCallback, useContext } from 'react';
import { Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { steps } from './utils';
import PropTypes from 'prop-types';

const FormButton = ({ onButtonClickCB, onSubmit }) => {
  const { activeStepIndex, goToNextStep, goToPreviousStep, disableNextStep } =
    useContext(AuthContext);

  const onNextButtonClick = useCallback(() => {
    goToNextStep();
    onButtonClickCB && onButtonClickCB();
  }, [onButtonClickCB, goToNextStep]);

  const onPreviousButtonClick = useCallback(() => {
    goToPreviousStep();
    onButtonClickCB && onButtonClickCB();
  }, [goToPreviousStep, onButtonClickCB]);

  return (
    <div
      style={{
        zIndex: 100 * 100000,
        height: 127,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 45.31%)',
      }}
      className={`${
        activeStepIndex > 0 ? 'justify-between' : 'justify-end'
      } absolute h-[128px] md:h-[166px] flex bottom-0 w-full md:pr-[175px] md:pl-1  md:w-[732px] items-end pb-6 px-4 md:px-0`}
    >
      {activeStepIndex > 0 && (
        <Button type='button' onClick={onPreviousButtonClick}>
          Previous
        </Button>
      )}
      <Button
        // disabled={disableNextStep}
        type={activeStepIndex === steps.length - 1 ? 'submit' : 'button'}
        primary
        onClick={activeStepIndex === steps.length - 1 ? onSubmit : onNextButtonClick}
      >
        {activeStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </div>
  );
};

export default FormButton;

FormButton.propTypes = {
  onButtonClickCB: PropTypes.func,
  onSubmit: PropTypes.func,
};
