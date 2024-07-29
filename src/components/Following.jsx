import React from 'react';
import NavbarDefault from './NavbarDefault';
import Leftbar from './Leftbar';

const Following = () => {
  return (
    <div>
      <NavbarDefault />
      <Leftbar />
      <div className="p-4 md:p-8 lg:p-12">
      <div>
          <img
            className="q-image qu-mb--tiny ml-[45%] mt-16"
            src="//qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.all_caught_up_feed_darkmode.png-26-d46c884a228cdfb6.png"
            width="100px"
            style={{maxWidth: '100%', width: '100px' }}
            alt="All caught up"
          />
        </div>
        <div className="text-center">
          <div className='font-black text-2xl md:text-3xl lg:text-4xl mt-5'>You're all caught up</div>
          <div className='font-semibold text-base md:text-lg lg:text-lg mt-4'>
            Follow more Spaces to discover new stories in your feed. You can also visit <a href='/home' className='text-blue-500 underline'>Home.</a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Following;
