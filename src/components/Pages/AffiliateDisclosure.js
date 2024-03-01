import React from 'react';

const AffiliateDisclosure = (props) => {
  return (
    <div className="container mt-5">
      <h1 style={{marginTop: '20vh', paddingBottom: '5vh', fontSize: '5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        Affiliate Disclosure
      </h1>
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        As the owner of this website, I want to be completely transparent with my audience and provide
        information about affiliate marketing and the potential for earning commissions on certain
        products or services that are recommended or promoted on this site.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        What is Affiliate Marketing?
      </h2>
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        Affiliate marketing is a performance-based marketing strategy where a business rewards affiliates
        for each visitor or customer brought in by the affiliate's marketing efforts. In simpler terms, I
        may earn a commission if you make a purchase through the affiliate links on this site.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        How Does It Work?
      </h2>
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        When you click on an affiliate link and make a purchase, I may receive a commission from the
        vendor or company without any additional cost to you. These commissions help support the
        maintenance and growth of this website.
      </p>
      <br /><br />

      <h2 style={{paddingBottom: '3vh', fontSize: '3.5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'  }}>
        Transparency and Trust
      </h2>
      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919', textAlign: 'justify'  }}>
        It's important to note that I only recommend products or services that I personally use or believe
        will add value to my audience. Your trust is of utmost importance, and I assure you that any
        recommendation made is based on genuine opinions and experiences.
      </p>
      <br />

      <p style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify'  }}>
        If you have any questions regarding the affiliate disclosure or any products/services recommended
        on this site, feel free to reach out through the contact page.
      </p>
      <br />

      <p  style={{ fontSize: '2.2vh',  color: props.mode==='dark'?'white':'#191919' , textAlign: 'justify' }}>
        Thank you for your trust and continued support.
      </p>
    </div>
  );
};

export default AffiliateDisclosure;
