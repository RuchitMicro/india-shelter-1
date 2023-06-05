import Sheet from 'react-modal-sheet';
import PropTypes from 'prop-types';
import BottomSheetHandle from '../BottomSheetHandle';
import { IconClose } from '../../assets/icons';
import LeadGenerationForm from '../../pages/lead-generation/LeadGenerationForm';

const MobileDrawer = ({ show, setShow }) => {
  const snapPoints = [800,600, 400, 200, 100];
  const initialSnap = snapPoints.length - 1;

  return (
    <Sheet
      isOpen={true}
      onClose={() => setShow(false)}
      snapPoints={snapPoints}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header className='flex flex-col gap-2 py-2 px-4'>
          <BottomSheetHandle />
          <div className='flex gap-4 justify-between'>
            <span className='font-semibold text-xl text-primary-black'>Personal Details</span>
            <button type='button' title='Dismiss' onClick={() => setShow(false)}>
              <IconClose />
            </button>
          </div>
        </Sheet.Header>
        <Sheet.Content className='px-4 text-dark-grey leading-6 my-4'>
          <LeadGenerationForm />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default MobileDrawer;

MobileDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
