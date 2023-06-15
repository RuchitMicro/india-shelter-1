import homeLoanAnimation from '../../assets/anim/home-loan.json';
import homeLoanBgAnimation from '../../assets/anim/home-loan-bg.json';
import loanAgainstPropertyAnimation from '../../assets/anim/loan-against-property.json';
import Lottie from 'react-lottie-player';
import { Header } from '../../components';
import { create } from '@lottiefiles/lottie-interactivity';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import iconBack from '../../assets/icons/back.svg';
import logo from '../../assets/logo.svg';
import { AnimatePresence, motion } from 'framer-motion';

const frames = [
  [0, 3],
  [3, 38],
  [34, 90],
];

const AnimationBanner = () => {
  const { activeStepIndex, previousStepIndex, goToPreviousStep, selectedLoanType } =
    useContext(AuthContext);
  const lottiePlayerRef = useRef(null);

  useEffect(() => {
    if (lottiePlayerRef.current && selectedLoanType !== 'loan-against-property')
      create({
        player: lottiePlayerRef.current,
        mode: 'chain',
        actions: [
          {
            state: 'autoplay',
            frames:
              previousStepIndex.current > activeStepIndex
                ? [...frames[activeStepIndex + 1]].reverse()
                : frames[activeStepIndex],
            repeat: 1,
          },
        ],
      });
  }, [activeStepIndex, previousStepIndex, selectedLoanType]);

  return (
    <div
      style={{ backgroundColor: '#EEF0DD' }}
      className='flex flex-col w-full md:w-[597px] 2xl:w-2/4 relative'
    >
      <div className='relative md:hidden'>
        <Header />
      </div>
      <div className='flex w-full items-center justify-between md:items-start p-4 md:px-16 md:pt-14 gap-1 z-50'>
        <button
          title='Go back'
          onClick={goToPreviousStep}
          type='button'
          className={`${
            activeStepIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } w-8 h-8 md:w-11 md:h-11 md:mt-4 cursor-pointer`}
        >
          <img className='w-full h-full pointer-events-none' src={iconBack} alt='Back' />
        </button>
        <div className='flex flex-col gap-7 items-center flex-1'>
          <img className='hidden md:inline' src={logo} alt='India Shelter' />
          <h4
            style={{ color: '#04584C' }}
            className='text-center text-base md:text-xl font-medium pr-4'
          >
            {selectedLoanType === 'loan-against-property'
              ? 'Get the right value for your property'
              : 'Find the shelter with us'}
          </h4>
        </div>
      </div>

      <AnimatePresence>
        {selectedLoanType !== 'loan-against-property' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transitionDuration: 2 }}
            exit={{ opacity: 0 }}
          >
            <Lottie
              id='home-loan-bg-animation'
              className={`absolute bottom-0 left-0 w-full max-h-[600px] 2xl:max-h-[80vh]`}
              loop
              play
              animationData={homeLoanBgAnimation}
            />
            <Lottie
              ref={lottiePlayerRef}
              id='home-loan-animation'
              className='md:absolute bottom-0 left-0 w-full max-h-[600px] 2xl:max-h-[80vh]'
              animationData={homeLoanAnimation}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedLoanType === 'loan-against-property' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transitionDuration: 2 }}
            exit={{ opacity: 0 }}
          >
            <Lottie
              play
              className='md:absolute bottom-0 left-0 w-full max-h-[600px] 2xl:max-h-[80vh]'
              animationData={loanAgainstPropertyAnimation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimationBanner;
