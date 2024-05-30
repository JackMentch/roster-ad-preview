import React, { useEffect } from 'react';
import './App.css'

const AdBanner: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    script.async = true;

    
    document.body.appendChild(script);

    script.onload = () => {
      window.googletag = window.googletag || { cmd: [] };

      window.googletag.cmd.push(function () {
        const adSlot = window.googletag.defineSlot('/22972486526/HoopGridsMain', [[300, 50], [300, 75], [300, 100]], 'div-gpt-ad-1691463611289-0');
        adSlot!.addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display('div-gpt-ad-1691463611289-0');
      });
    };
  }, []);

  return (
    <div
      id="div-gpt-ad-1691463611289-0"
      className='ad-banner'
      style={{
        minWidth: '300px',
        minHeight: '50px',
        position: 'absolute'
      }}
    ></div>
  );
};

export default AdBanner;
