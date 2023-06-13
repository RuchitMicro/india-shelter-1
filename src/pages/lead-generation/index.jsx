import LeadGenerationForm from './LeadGenerationForm';
import AuthContextProvider from '../../context/AuthContext';
import FormButton from './FormButton';
import { useCallback, useRef } from 'react';
import AnimationBanner from './AnimationBanner';

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
      <div className='flex w-full flex-col md:flex-row md:justify-between 2xl:justify-start gap-[111px]'>
        {/* left section */}

        <AnimationBanner />

        <form id='lead-form-container' className='w-full md:max-w-[732px]'>
          <div className='h-screen overflow-auto'>
            <LeadGenerationForm modalRef={modalRef} formContainerRef={formContainerRef} />
          </div>
          <FormButton
            onButtonClickCB={onFormButtonClick}
            onSubmit={onSubmit}
            formContainerRef={formContainerRef}
          />
        </form>
      </div>
    </AuthContextProvider>
  );
};

export default LeadGeneration;
