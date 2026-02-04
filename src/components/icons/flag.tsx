import * as React from "react";
import { SVGProps } from "react";
const Flag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={45}
    height={38}
    viewBox="0 0 45 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.5 0H21.5L14.5 38H0L11.5 0Z" fill="#00B86B" />
    <path d="M35 0H45L38 38H23.5L35 0Z" fill="#00B86B" />
  </svg>
);
export default Flag;
