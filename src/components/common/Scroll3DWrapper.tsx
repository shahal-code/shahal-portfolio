import { ReactNode } from "react";

interface Scroll3DWrapperProps {
    children: ReactNode;
    className?: string;
}

const Scroll3DWrapper = ({ children, className = "" }: Scroll3DWrapperProps) => {
    // Completely simplified to avoid scroll calculations on low-end devices
    // The individual elements can still have their own reveal animations
    return (
        <div className={`relative w-full z-10 flex flex-col items-center ${className}`}>
            <div className="w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default Scroll3DWrapper;
