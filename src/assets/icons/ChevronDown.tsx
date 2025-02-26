import ResponsiveIcon from "../../componnets/ResponsiveIcon";

export default function ChevronDown() {
    return (
        <ResponsiveIcon>
            <svg
                xmlns={"http://www.w3.org/2000/svg"}
                viewBox={"0 0 24 24"}
                fill={"none"}
                stroke={"currentColor"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                //style={"--darkreader-inline-stroke: currentColor;"}
                width={"24"}
                height={"24"}
                strokeWidth={"2"}
            >
                <path d={"M6 9l6 6l6 -6"}></path>
            </svg>
        </ResponsiveIcon>
    );
}
