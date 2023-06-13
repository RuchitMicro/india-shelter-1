import { Suspense, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Stepper from '../../components/Stepper/index';
import DesktopStepper from '../../components/DesktopStepper/index';
import { AuthContext } from '../../context/AuthContext';
import Sheet from 'react-modal-sheet';
import { BottomSheetHandle } from '../../components';
import { steps } from './utils';
import PropTypes from 'prop-types';

const snapPoints = [0.92, 0.55];
const initialSnap = 1;

const LeadGenerationForm = ({ formContainerRef, modalRef }) => {
  const { activeStepIndex } = useContext(AuthContext);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  const onClick = useCallback(() => {
    modalRef.current?.snapTo(0);
  }, [modalRef]);

  const ActiveStepComponent = steps.find((_, index) => index === activeStepIndex).Component;

  const Form = useMemo(
    () => (
      <Suspense fallback={<h1>Loading next step...</h1>}>
        <div className='relative h-full overflow-y-hidden'>
          <Stepper steps={steps} activeStep={activeStepIndex} />
          <DesktopStepper steps={steps} activeStep={activeStepIndex} />

          <div
            ref={formContainerRef}
            role='presentation'
            onClick={onClick}
            onKeyDown={onClick}
            className='mt-6 pb-[180px] md:pb-[260px] h-full overflow-auto md:pr-[175px] no-scrollbar px-1'
          >
            <ActiveStepComponent />
          </div>
        </div>
      </Suspense>
    ),
    [activeStepIndex, formContainerRef, onClick],
  );

  if (innerWidth < 768) {
    return (
      <Sheet
        isOpen={true}
        ref={modalRef}
        onClose={() => ({})}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
        className='md:hidden'
        mountPoint={document.getElementById('#lead-form-container')}
      >
        <Sheet.Container>
          <Sheet.Header className='py-2 px-4 h-4 flex justify-center'>
            <BottomSheetHandle />
          </Sheet.Header>
          <Sheet.Content className='px-3 text-dark-grey leading-6 mb-4'>{Form}</Sheet.Content>
        </Sheet.Container>
      </Sheet>
    );
  }
  return Form;
};

export default LeadGenerationForm;

LeadGenerationForm.propTypes = {
  formContainerRef: PropTypes.object,
  modalRef: PropTypes.object,
};
