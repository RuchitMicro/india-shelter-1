import Sheet from 'react-modal-sheet';
import PropTypes from 'prop-types';
import BottomSheetHandle from '../BottomSheetHandle';
import { IconClose } from '../../assets/icons';

const TermsAndConditions = ({ show, setShow }) => {
  return (
    <Sheet isOpen={show} onClose={() => setShow(false)} snapPoints={[0.5]} initialSnap={0}>
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
        <Sheet.Content className='px-4 text-dark-grey leading-6 my-4'>
          By accessing this website we assume you accept these terms and conditions. Do not continue
          to use India Shelter if you do not agree to take all of the terms and conditions stated on
          this page. The following terminology applies to these Terms and Conditions, Privacy
          Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot;
          and &quot;Your&quot; refers to you, the person log on this website and compliant to the
          Company&apos;s terms and conditions.
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default TermsAndConditions;

TermsAndConditions.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
