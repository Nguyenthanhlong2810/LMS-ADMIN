import React from 'react';
import { useSelector } from 'react-redux';

export const SecurityArea = ({ securityCode }) => {
  const { securityAreas } = useSelector((state) => state.SecurityArea);

  const security = securityAreas.find((securityArea) => securityArea.code === securityCode);
  return <div> {security?.name} </div>;
};
