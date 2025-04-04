import { SVGProps } from "react";

interface MenuOutlineProps extends SVGProps<SVGSVGElement> {
  title?: string;
}

function MenuOutline(props: MenuOutlineProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M80 160h352M80 256h352M80 352h352"
      />
    </svg>
  );
}

export default MenuOutline;
