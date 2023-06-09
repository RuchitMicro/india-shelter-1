import { useContext } from 'react';
import { Button } from '../../components';
import { createPortal } from 'react-dom';
import { AuthContext } from '../../context/AuthContext';
import { steps } from './utils';

const FormButton = () => {
  const { activeStepIndex, setActiveStepIndex, nextStep } = useContext(AuthContext);

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
        <Button type='button' onClick={() => setActiveStepIndex((prev) => prev - 1)}>
          Previous
        </Button>
      )}
      {activeStepIndex !== steps.length - 1 && (
        <Button disabled={nextStep} type='button' primary onClick={() => setActiveStepIndex((prev) => prev + 1)}>
          Next
        </Button>
      )}
      {activeStepIndex === steps.length - 1 && (
        <Button disabled={nextStep} type='submit' primary>
          Submit
        </Button>
      )}
    </div>,
    document.body,
  );
};

export default FormButton;
