import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Stepper from '../../components/Stepper/index';
import DesktopStepper from '../../components/DesktopStepper/index';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';
import Sheet from 'react-modal-sheet';
import { BottomSheetHandle } from '../../components';

const snapPoints = [0.92, 0.6];
const initialSnap = 1;

const LeadGenerationForm = ({ activeStepIndex, steps }) => {
  const modalRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  const { handleSubmit } = useContext(AuthContext);

  const onClick = useCallback(() => {
    modalRef.current?.snapTo(0);
  }, []);

  const Form = useMemo(
    () => (
      <div className='relative h-full overflow-y-hidden'>
        <Stepper steps={steps} activeStep={activeStepIndex} />
        <DesktopStepper steps={steps} activeStep={activeStepIndex} />

        <div
          role='presentation'
          onClick={() => onClick && onClick()}
          onKeyDown={() => onClick && onClick()}
          className='mt-6 pb-[180px] md:pb-[260px] h-full overflow-auto md:pr-[175px] no-scrollbar px-1'
          onSubmit={handleSubmit}
        >
          {steps.map(({ Component, label }, index) => {
            return activeStepIndex === index ? <Component key={label} /> : null;
          })}
        </div>
      </div>
    ),
    [activeStepIndex, handleSubmit, onClick, steps],
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
  activeStepIndex: PropTypes.number,
  steps: PropTypes.array,
};
