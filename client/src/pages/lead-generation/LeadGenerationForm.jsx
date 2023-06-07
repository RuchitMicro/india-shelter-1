import { useContext } from 'react';
import Stepper from '../../components/Stepper/index';
import DesktopStepper from '../../components/DesktopStepper/index';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const LeadGenerationForm = ({ onClick, activeStepIndex, steps }) => {
  const { handleSubmit } = useContext(AuthContext);

  return (
    <div className='relative h-full overflow-y-hidden'>
      <Stepper steps={steps} activeStep={activeStepIndex} />
      <DesktopStepper steps={steps} activeStep={activeStepIndex} />

      <form
        role='presentation'
        onClick={() => onClick && onClick()}
        onKeyDown={() => onClick && onClick()}
        className='mt-6 pb-[180px] md:pb-[260px] h-full overflow-auto md:pr-[175px] no-scrollbar'
        onSubmit={handleSubmit}
      >
        {steps.map(({ Component, label }, index) => {
          return activeStepIndex === index ? <Component key={label} /> : null;
        })}
      </form>
    </div>
  );
};

export default LeadGenerationForm;

LeadGenerationForm.propTypes = {
  onClick: PropTypes.func,
  activeStepIndex: PropTypes.number,
  steps: PropTypes.array,
};
