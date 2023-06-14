import { createPortal } from 'react-dom';
import { IconClose } from '../../assets/icons';
import PropTypes from 'prop-types';

const DesktopPopUp = ({ showpopup, setShowPopUp, children }) => {
  if (showpopup)
    return createPortal(
      <>
        <div
          style={{ zIndex: 99999999 * 100 }}
          role='presentation'
          className='hidden md:flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          onClick={() => setShowPopUp(false)}
          onKeyDown={() => setShowPopUp(false)}
        >
          <div
            style={{
              width: 646,
              height: 500,
            }}
            className='relative my-6 mx-auto'
          >
            <div className='rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                <h3 className='text-xl text-primary-black font-semibold'>Terms and Conditions</h3>
                <button className='p-1 ml-auto float-right' onClick={() => setShowPopUp(false)}>
                  <IconClose />
                </button>
              </div>
              <div className='py-4 pl-6 pr-8'>
                <div className='relative pr-4 flex-auto h-[438px] overflow-y-auto'>
                  <p className='text-base font-normal leading-relaxed' dangerouslySetInnerHTML={{
                    __html: children
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='opacity-60 fixed inset-0 z-40 bg-black'></div>
      </>,
      document.body,
    );
  return null;
};

export default DesktopPopUp;

DesktopPopUp.propTypes = {
  showpopup: PropTypes.bool,
  setShowPopUp: PropTypes.func,
  children: PropTypes.elementType,
};
