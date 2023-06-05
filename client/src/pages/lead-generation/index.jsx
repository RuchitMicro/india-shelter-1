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
          <img src={logoSm} alt='India Shelter Logos' className='w-full h-full' />
          <span className='text-base text-[#04584C] text-center pt-4 font-medium'>
            Get the right value for your property
          </span>
          <img src={islandimg} alt='' className='w-fit' />
        </div>
        <img src={leftImg} alt='' className='hidden lg:block w-fit min-h-screen' />
      </div>
      {/* right side section h-[calc(100vh-118px-72px)]*/}
      <div className='w-full md:w-3/5 md:px-[135px] md:pt-14 md:pb-6'>
        <div className='main-container md:h-full overflow-auto'>
          <LeadGenerationForm />
        </div>
      </div>
    </div>
  );
};

export default LeadGeneration;
