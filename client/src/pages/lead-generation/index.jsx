import LeadGenerationForm from './LeadGenerationForm';
import leftImg from '../../assets/left-contain-image.png';
import logoSm from '../../assets/LogoMobile.svg';
import islandimg from '../../assets/islandSm.svg';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import PersonalDetails from '../../pages/lead-generation/PersonalDetails';
import ProfessionalDetails from '../../pages/lead-generation/ProfessionalDetails';
import PropertyDetails from '../../pages/lead-generation/PropertyDetails';
import { Button } from '../../components';
import AuthContextProvider from '../../context/AuthContext';

const steps = [
  {
    label: 'Personal Details',
    Component: PersonalDetails,
  },
  {
    label: 'Professional Details',
    Component: ProfessionalDetails,
  },
  {
    label: 'Property Details',
    Component: PropertyDetails,
  },
];

const LeadGeneration = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <AuthContextProvider>
      <div className='flex w-full flex-col md:flex-row md:justify-between gap-[111px]'>
        {/* left section */}
        <div className='w-full md:w-[597px]'>
          <div className='flex flex-col justify-center items-center bg-[#EEF0DD] lg:hidden'>
            <img src={logoSm} alt='India Shelter Logos' className='w-full h-full' />
            <span className='text-base text-[#04584C] text-center pt-4 font-medium'>
              Get the right value for your property
            </span>
            <img src={islandimg} alt='' className='w-full md:w-full' />
          </div>
          <img src={leftImg} alt='' className='hidden lg:block w-[597px] h-screen' />
        </div>

        <div id='lead-form-container' className='w-full md:w-[732px]'>
          <div className='h-screen overflow-auto'>
            <LeadGenerationForm steps={steps} activeStepIndex={activeStepIndex} />
          </div>

          {createPortal(
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
                <Button
                  type='button'
                  primary
                  onClick={() => setActiveStepIndex((prev) => prev + 1)}
                >
                  Next
                </Button>
              )}
              {activeStepIndex === steps.length - 1 && (
                <Button type='submit' primary>
                  Submit
                </Button>
              )}
            </div>,
            document.body,
          )}
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default LeadGeneration;
