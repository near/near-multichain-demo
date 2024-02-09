import React, { useState } from 'react';

interface GenerateAddressProps {
  isActive?: boolean;
  onClick?: () => void;
}

const GenerateAddress: React.FC<GenerateAddressProps> = ({
  isActive,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const fillColor: string = isActive ? '#604CC8' : '#868682';
  const hoverFillColor = '#604CC8';
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={isHovered ? hoverFillColor : fillColor}
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g id="Lightning">
        <path
          id="Vector"
          d="M17.1625 9.16088C17.1273 9.01073 17.0557 8.87157 16.9539 8.75574C16.8521 8.6399 16.7233 8.55097 16.5789 8.49682L12.3258 6.90228L13.4195 1.43353C13.4595 1.23352 13.4332 1.02593 13.3445 0.842238C13.2558 0.658548 13.1097 0.508784 12.9282 0.415663C12.7468 0.322542 12.5399 0.291145 12.3389 0.326233C12.138 0.361322 11.954 0.460982 11.8148 0.610097L3.06483 9.9851C2.95956 10.0978 2.88371 10.2347 2.844 10.3837C2.80429 10.5327 2.80194 10.6892 2.83718 10.8393C2.87241 10.9894 2.94413 11.1286 3.04598 11.2443C3.14783 11.3601 3.27667 11.449 3.42108 11.5031L7.67421 13.0976L6.58046 18.5663C6.54048 18.7664 6.56681 18.974 6.65547 19.1576C6.74414 19.3413 6.89029 19.4911 7.07176 19.5842C7.25323 19.6773 7.46012 19.7087 7.66105 19.6736C7.86198 19.6386 8.04598 19.5389 8.18515 19.3898L16.9351 10.0148C17.0403 9.90211 17.1161 9.76524 17.1557 9.6163C17.1954 9.46735 17.1977 9.31093 17.1625 9.16088ZM9.0664 15.6976L9.66952 12.6835C9.71315 12.4653 9.67768 12.2386 9.56947 12.0441C9.46126 11.8495 9.28736 11.6999 9.0789 11.6218L5.39062 10.2398L10.932 4.30228L10.3289 7.31635C10.2853 7.53463 10.3207 7.7613 10.429 7.95583C10.5372 8.15035 10.7111 8.30002 10.9195 8.37807L14.6094 9.7601L9.0664 15.6976Z"
          fill={isHovered ? hoverFillColor : fillColor}
        />
      </g>
    </svg>
  );
};

export default GenerateAddress;
