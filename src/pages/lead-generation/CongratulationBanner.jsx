import { lazy, useContext, useEffect, useState } from 'react';
import { Header } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import PropTypes from 'prop-types';
import { currencyFormatter } from '../../components/CurrencyInput';
import time24 from '../../assets/icons/time-24.svg';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/logo.svg';
import { checkBre100 } from '../../global';
import { IconClose } from '../../assets/icons';

const BackgroundAnimation = lazy(() => import('./BackgroundAnimation'));
const HomeLoanAnimation = lazy(() => import('./HomeLoanAnimation'));
const LoanAgainstPropertyAnimation = lazy(() => import('./LoanAgainstPropertyAnimation'));

const CongratulationBanner = ({ isLoading, setProcessingBRE }) => {
  const { values, currentLeadId } = useContext(AuthContext);
  const [allowedLoanAmount, setAllowedLoanAmount] = useState(0);
  const [loading, setLoading] = useState(isLoading);
  const [progress, setProgress] = useState(10);
  const [isQualified, setIsQualified] = useState(true);

  useEffect(() => {
    const paths = document.querySelectorAll('.foreground path');
    paths.forEach((path) => {
      path.style.transition = `all ease-out 300ms`;
      path.style.fill = loading ? '#FFF1CD' : '#EEF0DD';
    });
  }, [loading]);

  useEffect(() => {
    if (!currentLeadId) return;
    setLoading(true);
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev > 98) {
          clearInterval(interval);
          return prev;
        }
        return (prev += 1);
      });
    }, 120);

    checkBre100(currentLeadId).then((res) => {
      clearInterval(interval);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      });
      const breResponse = res.data.bre_100_response;
      if (breResponse.statusCode === 200) {
        setLoading(false);
        setIsQualified(true);
        const offeredAmount = breResponse.body.find((rule) => rule.Rule_Name === 'Amount_Offered');
        setAllowedLoanAmount(offeredAmount.Rule_Value);
      } else {
        setIsQualified(false);
        setLoading(false);
      }
      setLoading(false);
    });
  }, [currentLeadId]);

  return (
    <div
      style={{ backgroundColor: loading ? '#FFF1CD' : '#EEF0DD' }}
      className='flex flex-col w-full relative transition-colors ease-out duration-300 min-h-screen overflow-hidden'
    >
      <div className='relative md:hidden'>
        <Header />
      </div>
      <div className='flex w-full items-center justify-between md:items-start p-4 md:px-16 md:pt-10 gap-1 z-50'>
        <div className='flex flex-col gap-7 items-center flex-1'>
          <img className='hidden md:inline self-start md:ml-20' src={logo} alt='India Shelter' />
          <h4
            style={{ color: '#04584C' }}
            className='text-center text-base md:text-xl font-medium flex items-center w-full mx-4 gap-1 md:hidden'
          >
            <span className='flex-1'>
              {values.loan_type === 'LAP'
                ? 'Get the right value for your property'
                : 'Find your shelter with us'}
            </span>
            <button
              onKeyDown={() => setProcessingBRE(false)}
              onClick={() => setProcessingBRE(false)}
              className='bg-white rounded-full p-0.5'
            >
              <IconClose />
            </button>
          </h4>
        </div>
      </div>

      <AnimatePresence>
        {values.loan_type !== 'LAP' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transitionDuration: 2 }}
            exit={{ opacity: 0 }}
            className='relative w-full md:flex-1'
          >
            <BackgroundAnimation
              id='home-loan-bg-animation'
              className={`absolute top-0 md:top-auto md:bottom-0 left-0 w-full max-h-[600px] 2xl:max-h-screen`}
              loop
              play
            />
            <HomeLoanAnimation
              id='home-loan-animation'
              play
              loop={false}
              style={{
                maxWidth: 636,
              }}
              className='md:absolute bottom-0 md:bottom-10 left-0 md:left-2/4 md:-translate-x-2/4 w-full max-h-[318px]'
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {values.loan_type === 'LAP' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transitionDuration: 2 }}
            exit={{ opacity: 0 }}
          >
            <LoanAgainstPropertyAnimation
              play
              className='md:absolute bottom-0 left-0 md:left-2/4 md:-translate-x-2/4 w-2/4 md:h-2/4'
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`md:fixed top-1/4 left-2/4 md:-translate-x-2/4 md:-translate-y-1/4 flex-1 transition-colors ease-out duration-300 flex flex-col items-center z-50 ${
          loading ? 'bg-[#FFF1CD]' : 'bg-[#EEF0DD]'
        } md:bg-opacity-0`}
      >
        {loading ? (
          <>
            <div
              style={{
                color: '#04584C',
              }}
              className='font-semibold text-lg md:text-2xl'
            >
              Verifying your details
            </div>
            <div className='text-primary-red font-medium text-[22px] md:text-[32px] mt-2'>
              {progress}%
            </div>
          </>
        ) : (
          ''
        )}

        {!loading && isQualified ? (
          <div className='flex items-center flex-col'>
            <div
              style={{
                color: '#231F20',
              }}
              className='text-[22px] md:text-[32px] font-medium'
            >
              Congratulations!
            </div>
            <div className='text-base text-black font-normal mt-1 md:mt-4 text-center'>
              You have a pre-approved loan of upto
            </div>
            <div
              style={{
                color: '#277C5E',
              }}
              className='text-[32px] font-semibold mt-3 md:mt-4'
            >
              ₹ {currencyFormatter.format(allowedLoanAmount)}/-
            </div>
            <div className='text-dark-grey md:text-base mt-1 md:mt-4 font-semibold'>
              Terms and Condition applied!
            </div>
            <div className='flex w-full gap-2 p-6 mt-[18px] md:mt-1 md:p-0 justify-center'>
              <img src={time24} role='presentation' alt='Time 24' />
              <div className='text-xs md:text-sm text-black font-normal text-center text-opacity-50'>
                Our loan officer will reach out to you in 24 hours
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {!loading && !isQualified ? (
          <h3 className='mx-4 text-center text-[22px] md:text-[32px] leading-8 md:leading-[48px]'>
            Thank you for choosing us.
            <br />
            We will get back to you!
          </h3>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CongratulationBanner;

CongratulationBanner.propTypes = {
  isLoading: PropTypes.bool,
  setProcessingBRE: PropTypes.func,
};
