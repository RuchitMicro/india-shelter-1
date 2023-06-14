import Sheet from 'react-modal-sheet';
import PropTypes from 'prop-types';
import BottomSheetHandle from '../BottomSheetHandle';
import { IconClose } from '../../assets/icons';

const TermsAndConditions = ({ show, setShow, children }) => {
  return (
    <Sheet
      style={{
        zIndex: 9999999 * 10,
      }}
      isOpen={show}
      onClose={() => setShow(false)}
      snapPoints={[0.5]}
      initialSnap={0}
      className='md:hidden'
    >
      <Sheet.Container>
        <Sheet.Header className='flex flex-col gap-2 py-2 px-4'>
          <BottomSheetHandle />
          <div className='flex gap-4 justify-between'>
            <span className='font-semibold text-xl text-primary-black'>Terms and Conditions</span>
            <button type='button' title='Dismiss' onClick={() => setShow(false)}>
              <IconClose />
            </button>
          </div>
        </Sheet.Header>
        <Sheet.Content
          className='px-4 text-dark-grey leading-6 my-4'
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        />
      </Sheet.Container>
    </Sheet>
  );
};

export default TermsAndConditions;

TermsAndConditions.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
