import React from "react";

interface ResponsiveIconProps {
    children: React.ReactNode;
}

export default function ResponsiveIcon({ children }: ResponsiveIconProps) {
    return (
        <div className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"}>
            {React.cloneElement(children as React.ReactElement, {
                width: "100%",
                height: "100%",
            })}
        </div>
    );
}
