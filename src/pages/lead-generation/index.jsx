import LeadGenerationForm from './LeadGenerationForm';
import leftImg from '../../assets/left-contain-image.png';
import logoSm from '../../assets/logo-mobile.svg';
import islandimg from '../../assets/island-sm.svg';
import AuthContextProvider from '../../context/AuthContext';
import FormButton from './FormButton';
import { useCallback, useRef } from 'react';

const LeadGeneration = () => {
  const modalRef = useRef(null);
  const formContainerRef = useRef(null);

  const onFormButtonClick = useCallback(() => {
    modalRef.current?.snapTo(1);
    formContainerRef.current?.scrollTo(0, 0);
  }, []);

  // TODO: Replace placeholder onSubmit function
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Submitting');
  }, []);

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

        <form id='lead-form-container' className='w-full md:w-[732px]'>
          <div className='h-screen overflow-auto'>
            <LeadGenerationForm modalRef={modalRef} formContainerRef={formContainerRef} />
          </div>
          <FormButton onButtonClickCB={onFormButtonClick} onSubmit={onSubmit} />
        </form>
      </div>
    </AuthContextProvider>
  );
};

export default LeadGeneration;
