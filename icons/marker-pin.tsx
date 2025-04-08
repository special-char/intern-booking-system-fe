import { IconProps } from "@/types/icon";

export const MarkerPin = (props: IconProps) => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Marker pin icon</title>
      <path
        d="M17.1568 32.5791C22.8158 26.9201 28.4748 21.8529 28.4748 15.6022C28.4748 9.35141 23.4076 4.28418 17.1568 4.28418C10.9061 4.28418 5.83887 9.35141 5.83887 15.6022C5.83887 21.8529 11.4979 26.9201 17.1568 32.5791Z"
        fill={props.color}
        stroke={props.stroke}
        strokeWidth="1.88161"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1568 20.3178C19.5009 20.3178 21.4011 18.4176 21.4011 16.0736C21.4011 13.7296 19.5009 11.8293 17.1568 11.8293C14.8128 11.8293 12.9126 13.7296 12.9126 16.0736C12.9126 18.4176 14.8128 20.3178 17.1568 20.3178Z"
        fill="white"
        stroke={props.stroke}
        strokeWidth="1.88161"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
