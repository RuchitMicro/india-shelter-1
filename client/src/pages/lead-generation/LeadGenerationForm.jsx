import { useContext, useState } from 'react';
import Stepper from '../../components/Stepper/index';
import DesktopStepper from '../../components/DesktopStepper/index';
import PersonalDetails from '../../pages/lead-generation/PersonalDetails';
import ProfessionalDetails from '../../pages/lead-generation/ProfessionalDetails';
import PropertyDetails from '../../pages/lead-generation/PropertyDetails';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const steps = [
  {
    label: 'Personal Details',
    value: '1/3',
    desktopValue: 'STEP 1',
  },
  {
    label: 'Professional Details',
    value: '2/3',
    desktopValue: 'STEP 2',
  },
  {
    label: 'Property Details',
    value: '3/3',
    desktopValue: 'STEP 3',
  },
];

const LeadGenerationForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const { handleSubmit } = useContext(AuthContext);

  return (
    <div className='relative h-full overflow-y-hidden'>
      <>
        <Stepper steps={steps} activeStep={activeStep} />
        <DesktopStepper steps={steps} activeStep={activeStep} />
      </>

      <form className='mt-6 h-[480px] overflow-auto md:pr-[175px]' onSubmit={handleSubmit}>
        {activeStep === 0 && <PersonalDetails />}
        {activeStep === 1 && <ProfessionalDetails />}
        {activeStep === 2 && <PropertyDetails />}

        <div
          className={`${
            activeStep !== 0 && activeStep !== steps.length ? 'justify-between' : 'justify-end'
          } flex absolute bottom-0 w-full md:pr-[176px] md:pb-6`}
        >
          {activeStep !== 0 && activeStep !== steps.length && (
            <Button type='button' onClick={() => setActiveStep(activeStep - 1)}>
              Previous
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button type='button' primary onClick={() => setActiveStep(activeStep + 1)}>
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button type='submit' primary>
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadGenerationForm;
