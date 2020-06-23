import * as React from 'react';

const SVGBackArrow = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0px"
    y="0px"
    height={props.height || '29px'}
    viewBox="0 0 100 100"
    enableBackground="new 0 0 100 100"
    xmlSpace="preserve"
  >
    <path
      fill="#fff"
      d="M7.196,55.304l27.5,27.5c2.929,2.929,7.678,2.929,10.607,0s2.929-7.678,0-10.607L30.607,57.501H87.5  c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H30.607l14.696-14.697c2.929-2.929,2.929-7.678,0-10.607s-7.678-2.929-10.607,0  l-27.5,27.5C4.267,47.626,4.267,52.375,7.196,55.304z"
    />
  </svg>
);

export default SVGBackArrow;
