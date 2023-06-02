import LeadGenerationForm from './LeadGenerationForm';
import leftImg from '../../assets/left-contain-image.png';
import logoSm from '../../assets/LogoMobile.svg';
import islandimg from '../../assets/islandSm.svg';

const LeadGeneration = () => {
  return (
    <div className='flex w-full flex-col md:flex-row'>
      {/* left section */}
      <div className='w-full md:w-2/5'>
        <div className='flex flex-col justify-center items-center bg-[#EEF0DD] lg:hidden'>
          <img src={logoSm} alt='India Shelter Logos' className='w-full' />
          <span className='text-base text-[#04584C] text-center pt-4 font-medium'>Get the right value for your property</span>
          <img src={islandimg} alt='' className='w-fit' />
        </div>
        <img src={leftImg} alt='' className='hidden lg:block w-fit min-h-screen' />
      </div>
      {/* right side section */}
      <div className='w-full md:w-3/5 md:mx-[135px] min-h-screen'>
        <div className='hidden lg:flex stepper pt-14 pb-6 gap-6'>
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
            {/* <LeadGenerationForm /> */}
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
