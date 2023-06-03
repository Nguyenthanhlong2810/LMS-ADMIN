import React from 'react';

export const Video = ({ src }) => {
  return (
    <video controls width="100%" style={{ maxWidth: 844 }} autoPlay playsInline>
      <source src={src} type="video/mp4" />
    </video>
  );
};
