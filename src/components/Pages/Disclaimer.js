import React from 'react';

const Disclaimer = (props) => {
  return (
    <div className="container mt-5">
      <h1 style={{marginTop: '20vh', paddingBottom: '5vh', fontSize: '5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        Disclaimer
      </h1>
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify' }}>
        Welcome to Priyanshu Chaurasiya's portfolio. The information contained in this website is for general information purposes only. The portfolio is provided by Priyanshu Chaurasiya and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is, therefore, strictly at your own risk.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        In no event will Priyanshu Chaurasiya be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        Through this website, you can visit other websites that are not under the control of Priyanshu Chaurasiya. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        Every effort is made to keep the website up and running smoothly. However, Priyanshu Chaurasiya takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        All information on this website is provided in good faith and for general informational purposes only. Priyanshu Chaurasiya reserves the right to make additions, deletions, or modifications to the content at any time without prior notice.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        By using this website, you hereby consent to our disclaimer and agree to its terms.
      </p>
      <br />
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        If you have any questions about this disclaimer, please contact us.
      </p>
    </div>
  );
};

export default Disclaimer;
