export default function Disk() {
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      fill={"none"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
      width={"24"}
      height={"24"}
      strokeWidth={"2"}
      //style={"--darkreader-inline-stroke: currentColor;"}
      data-darkreader-inline-stroke={""}
    >
      <path
        d={
          "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"
        }
      ></path>
      <path d={"M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"}></path>
      <path d={"M14 4l0 4l-6 0l0 -4"}></path>
    </svg>
  );
}
