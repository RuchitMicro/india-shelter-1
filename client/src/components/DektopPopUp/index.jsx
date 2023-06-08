import { IconClose } from '../../assets/icons';

const DesktopPopUp = ({ showpopup, setShowPopUp }) => {
  return (
    <>
      {showpopup ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none' onClick={() => setShowPopUp(false)}>
            <div className='relative w-[646px] h-[500px] my-6 mx-auto'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='text-xl text-primary-black font-semibold'>Terms and Conditions</h3>
                  <button
                    className='p-1 ml-auto border-0 float-right'
                    onClick={() => setShowPopUp(false)}
                  >
                    <IconClose />
                  </button>
                </div>
                {/*body*/}
                <div className='relative pt-4 pl-6 pr-[83px] flex-auto h-[438px] overflow-y-auto'>
                  <p className='my-4 text-base font-normal leading-relaxed'>
                    By accessing this website we assume you accept these terms and conditions. Do
                    not continue to use India Shelter if you do not agree to take all of the terms
                    and conditions stated on this page. The following terminology applies to these
                    Terms and Conditions, Privacy Statement and Disclaimer Notice and all
                    Agreements: "Client", "You" and "Your" refers to you, the person log on this
                    website and compliant to the Company's terms and conditions. <br/><br/>
                    The Company respects the privacy of the users of the Apps and Website Services and is
                    committed to reasonably protect it in all respects. The information about the
                    user as collected by the Company is: <br/>
                    a) Information supplied by users on the Apps and / or the Website, as the case may be <br/>
                    b) Information automatically tracked while using our Apps and Website Services. <br/>
                    Mandatory Registration for Apps: It is mandatory to register yourself in order to use the App where
                    possible. We indicate which fields are mandatory and which are optional. You
                    would be given an option to accept or decline the terms of this Policy. We will
                    not be able to register you if you are not in agreement with the terms of this
                    Policy. It is clarified that registration is not mandatory for using the
                    Website. If you access and use the Website, you would be deemed to give your
                    consent for collection, storage, and use of Personal Information in terms of the
                    provisions of this Policy. As we update, improve, and expand our services
                    pertaining to App and Website Services, this Policy may change, so please check
                    the same periodically. By accessing and/or using our App and Website Services,
                    you consent to collection, storage, and use of your Personal Information (as
                    defined below) including any changes thereto as provided by you, from time to
                    time) for any of the services that we offer.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-60 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
};
export default DesktopPopUp;
