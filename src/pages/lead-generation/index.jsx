import LeadGenerationForm from './LeadGenerationForm';
import AuthContextProvider from '../../context/AuthContext';
import FormButton from './FormButton';
import { Suspense, useCallback, useRef, useState } from 'react';
import AnimationBanner from './AnimationBanner';
import { editLeadById } from '../../global';
import CongratulationBanner from './CongratulationBanner';
import { AnimatePresence, motion } from 'framer-motion';

const LeadGeneration = () => {
  const modalRef = useRef(null);
  const formContainerRef = useRef(null);
  const [processingBRE, setProcessingBRE] = useState(false);
  const [isQualified, setIsQualified] = useState(true);
  const [loading, setLoading] = useState(processingBRE);

  const onFormButtonClick = useCallback(() => {
    modalRef.current?.snapTo(1);
    formContainerRef.current?.scrollTo(0, 0);
  }, []);

  const onSubmit = useCallback(async (leadId, values) => {
    editLeadById(leadId, values).then(() => setProcessingBRE(true));
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <AuthContextProvider
        setProcessingBRE={setProcessingBRE}
        setIsQualified={setIsQualified}
        isQualified={isQualified}
        setLoading={setLoading}
      >
        {processingBRE ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transitionDuration: 2 }}
              exit={{ opacity: 0 }}
              className='w-full md:w-screen'
            >
              <CongratulationBanner
                loading={loading}
                setLoading={setLoading}
                setProcessingBRE={setProcessingBRE}
                isQualified={isQualified}
                setIsQualified={setIsQualified}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transitionDuration: 2 }}
              exit={{ opacity: 0 }}
              className='flex w-full flex-col md:flex-row md:justify-between 2xl:justify-start min-h-screen md:gap-[111px] overflow-y-hidden'
            >
              <AnimationBanner />
              <form
                onSubmit={(e) => e.preventDefault()}
                id='lead-form-container'
                className='w-full md:max-w-[732px]'
              >
                <div className='h-screen overflow-auto'>
                  <LeadGenerationForm modalRef={modalRef} formContainerRef={formContainerRef} />
                </div>
                <FormButton onButtonClickCB={onFormButtonClick} onSubmit={onSubmit} />
              </form>
            </motion.div>
          </AnimatePresence>
        )}
      </AuthContextProvider>
    </Suspense>
  );
};

export default LeadGeneration;
