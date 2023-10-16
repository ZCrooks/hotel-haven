import { MouseEvent } from "react";

export interface PropertyProps {
    handleReturn: (e: MouseEvent<HTMLElement>) => void;
    selectedProperty: any;
}