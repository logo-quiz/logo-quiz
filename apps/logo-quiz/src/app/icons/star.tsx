import * as React from 'react';

const SVGStar = (props) => {
  return (
    <svg width={91} height={88} {...props}>
      <defs>
        <filter
          x="-6.8%"
          y="-7%"
          width="113.7%"
          height="108.9%"
          filterUnits="objectBoundingBox"
          id="Star_svg__a"
        >
          <feMorphology
            radius={0.5}
            operator="dilate"
            in="SourceAlpha"
            result="shadowSpreadOuter1"
          />
          <feOffset
            dy={2}
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation={2}
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <path
          id="Star_svg__b"
          d="M45.5 68.25L19.931 81.692l4.884-28.47L4.129 33.057l28.587-4.154L45.5 3l12.784 25.904 28.587 4.154L66.185 53.22l4.884 28.471z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#Star_svg__a)" xlinkHref="#Star_svg__b"/>
        <use stroke="#06FF5B" fill="#FFF627" xlinkHref="#Star_svg__b"/>
      </g>
    </svg>
  );
};

export default SVGStar;
