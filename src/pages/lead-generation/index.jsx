import LeadGenerationForm from './LeadGenerationForm';
import AuthContextProvider from '../../context/AuthContext';
import FormButton from './FormButton';
import { useCallback, useRef } from 'react';
import AnimationBanner from './AnimationBanner';
import { checkBre100, editLeadById, getLeadById } from '../../global';

const LeadGeneration = () => {
  const modalRef = useRef(null);
  const formContainerRef = useRef(null);

  const onFormButtonClick = useCallback(() => {
    modalRef.current?.snapTo(1);
    formContainerRef.current?.scrollTo(0, 0);
  }, []);

  // TODO: Replace placeholder onSubmit function
  const onSubmit = useCallback((values) => {
    const sendFinalLead = async () => {
      const data = await getLeadById(49);
      console.log(data);

      // const updatedValues = {
      //   ...data,
      //   loan_request_amount: parseInt(data.loan_request_amount),
      //   property_estimation: parseInt(data.property_estimation),
      //   phone_number: values.phone_number.toString(),
      //   date_of_birth: values.date_of_birth.toISOString(),
      // };
      // const res = editLeadById(49, data);
  
      if (data) {
        const callBre100 = async () => {
          await checkBre100(49).then((res) => console.log(res));
        };
        callBre100();
      }
    };
    sendFinalLead();
  }, []);

  return (
    <AuthContextProvider>
      <div className='flex w-full flex-col md:flex-row md:justify-between 2xl:justify-start gap-[111px] overflow-y-hidden'>
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
      </div>
    </AuthContextProvider>
  );
};

export default LeadGeneration;
