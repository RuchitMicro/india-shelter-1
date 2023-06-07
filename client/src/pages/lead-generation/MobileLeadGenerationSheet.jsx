import Sheet from 'react-modal-sheet';
import BottomSheetHandle from '../../components/BottomSheetHandle';
import LeadGenerationForm from './LeadGenerationForm';
import { forwardRef } from 'react';

const snapPoints = [0.92, 0.6];
const initialSnap = 1;

const MobileLeadGenerationSheet = forwardRef(function MobileLeadGenerationSheet(props, ref) {
  return (
    <Sheet
      isOpen={true}
      ref={ref}
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
        <Sheet.Content className='px-4 text-dark-grey leading-6 mb-4'>
          <LeadGenerationForm {...props} />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
});

export default MobileLeadGenerationSheet;
