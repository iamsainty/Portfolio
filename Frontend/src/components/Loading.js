import React from 'react';

function Loading() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }}>
      <div style={{
          width: '50px',
          height: '50px',
          border: '6px solid grey',
          borderTop: '6px solid black',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
      `}</style>
    </div>
  );
}

export default Loading;
