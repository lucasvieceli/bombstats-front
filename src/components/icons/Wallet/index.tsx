import { SVGProps } from "react";

function Wallet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M4.47656 4.875H19.4766C19.6518 4.87495 19.8268 4.88606 20.0006 4.90828C19.9417 4.49473 19.7997 4.0974 19.583 3.74024C19.3664 3.38308 19.0797 3.07348 18.7402 2.83012C18.4007 2.58676 18.0154 2.41467 17.6076 2.32423C17.1998 2.2338 16.7779 2.22688 16.3673 2.3039L4.03125 4.41H4.01719C3.24285 4.55807 2.55425 4.99618 2.09203 5.63484C2.7884 5.13952 3.622 4.87389 4.47656 4.875ZM19.4766 6H4.47656C3.68118 6.00086 2.91862 6.31721 2.3562 6.87963C1.79378 7.44206 1.47743 8.20461 1.47656 9V18C1.47743 18.7954 1.79378 19.5579 2.3562 20.1204C2.91862 20.6828 3.68118 20.9991 4.47656 21H19.4766C20.2719 20.9991 21.0345 20.6828 21.5969 20.1204C22.1593 19.5579 22.4757 18.7954 22.4766 18V9C22.4757 8.20461 22.1593 7.44206 21.5969 6.87963C21.0345 6.31721 20.2719 6.00086 19.4766 6ZM17.25 15C16.9533 15 16.6633 14.912 16.4166 14.7472C16.17 14.5824 15.9777 14.3481 15.8642 14.074C15.7506 13.7999 15.7209 13.4983 15.7788 13.2074C15.8367 12.9164 15.9796 12.6491 16.1893 12.4393C16.3991 12.2296 16.6664 12.0867 16.9574 12.0288C17.2483 11.9709 17.5499 12.0006 17.824 12.1142C18.0981 12.2277 18.3324 12.42 18.4972 12.6666C18.662 12.9133 18.75 13.2033 18.75 13.5C18.75 13.8978 18.592 14.2794 18.3107 14.5607C18.0294 14.842 17.6478 15 17.25 15Z" />
      <path d="M1.5 12.1641V7.5C1.5 6.48422 2.0625 4.78125 4.01484 4.41234C5.67188 4.10156 7.3125 4.10156 7.3125 4.10156C7.3125 4.10156 8.39062 4.85156 7.5 4.85156C6.60938 4.85156 6.63281 6 7.5 6C8.36719 6 7.5 7.10156 7.5 7.10156L4.00781 11.0625L1.5 12.1641Z" />
    </svg>
  );
}

export default Wallet;
