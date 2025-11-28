export function BhaskarMark(props: React.ComponentProps<"svg">) {
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 14.35 53.15 32.25"
    data-asc={0.92}
    width={53.15}
    height={32.25}
    fill="currentColor"
    {...props}
  >
    <path d="M4.5 46.6v-4.45H0V18.8h4.5v-4.45H19v4.45h4.55v10H19v3.25h4.55v10.1H19v4.45zm1-5.6H18v-7.75H9V27.7h9V20H5.5zm24.1 5.6V18.8h4.5v-4.45h14.5v4.45h4.55v14.45H48.6v4.45H35.1v8.9zm5.5-14.55h12.5V20H35.1z" />
  </svg>
  );
}

export function getBhaskarMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M96 128H32V96h64v32ZM224 32h-64v64h64v32h-96V0h96v32ZM32 96H0V32h32v64ZM256 96h-32V32h32v64ZM96 32H32V0h64v32Z"/></svg>`;
}
