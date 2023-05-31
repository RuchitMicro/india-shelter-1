import LeadGenerationForm from './LeadGenerationForm';
import leftImg from '../../assets/left-contain-image.png';

const LeadGeneration = () => {
  return (
    <div class='flex w-full flex-col md:flex-row'>
      {/* left section */}
      <div class='w-[597px] flex flex-col min-h-screen items-center justify-around bg-[#EEF0DD]'>
        <img src={leftImg} alt='' className='' />
      </div>
      {/* right side section */}
      <div class='w-[843px] mx-[135px] min-h-screen'>
        <div className='stepper flex pt-14 pb-6 gap-6'>
          <div className='flex flex-col gap-2 w-full active'>
            <div className='h-[6px] rounded bg-primary-red'></div>
            <span className='w-full text-primary-red text-xs font-semibold'>STEP 1</span>
            <span className='text-xs text-primary-black font-semibold '>Personal Details</span>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='h-[6px] rounded bg-stroke'></div>
            <span className='w-full text-light-gray text-xs'>STEP 2</span>
            <span className='text-xs text-light-gray'>Professional Details</span>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='h-[6px] rounded bg-[#D9D9D9]'></div>
            <span className='w-full text-light-gray text-xs'>STEP 3</span>
            <span className='text-xs text-light-gray'>Property Details</span>
          </div>
        </div>

        <div className='main-container h-[calc(100vh-118px-72px)] overflow-auto bg-[#dfdfdf]'>
          <div className='min-h-screen'>
            <LeadGenerationForm/>
          </div>
        </div>

        <div className='footer flex justify-between'>
          <button className='w-[254px] h-[48px]'>Previous</button>
          <button className='w-[254px] h-[48px] bg-[#E33439] text-[#FEFEFE] rounded'>Next</button>
        </div>
      </div>
    </div>
  );
};

export default LeadGeneration;
