import React from 'react';

export default function PrivacyPolicy(props) {
  return (
    <div className="container mt-5">
     <h1 style={{marginTop: '20vh', paddingBottom: '5vh', fontSize: '5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        Privacy Policy
      </h1>
      <br />

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        Welcome to Priyanshu Chaurasiya's Portfolio. Your privacy is important to us. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your personal information when you
        use our website.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>Information We Collect</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        We may collect personal information that you provide directly to us, such as your name,
        contact information, and any other information you choose to provide. We may also collect
        non-personal information automatically as you navigate through the website.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>How We Use Your Information</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        We may use the information we collect from you to:
        <ul>
          <li>Personalize your experience and respond to your individual needs.</li>
          <li>Improve our website based on your feedback.</li>
          <li>Administer contests, promotions, surveys, or other site features.</li>
          <li>Send periodic emails regarding your inquiries or other requests.</li>
        </ul>
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>Security</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        We implement a variety of security measures to maintain the safety of your personal
        information. However, please be aware that no method of transmission over the internet or
        electronic storage is completely secure, and we cannot guarantee its absolute security.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>Third-Party Links</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        Our website may contain links to third-party websites. These third-party sites have
        separate and independent privacy policies. We have no responsibility or liability for the
        content and activities of these linked sites.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>Changes to Our Privacy Policy</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page. It is your responsibility to review this Privacy Policy periodically and become
        aware of modifications.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>Contact Us</h2>

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
        ppriyanshuchaurasia@gmail.com .
      </p>
    </div>
  );
}
