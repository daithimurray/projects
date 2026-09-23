/** Progress through a multi-step flow (survey request, quote). 2–5 steps. */
export interface StepperProps { steps: string[]; /** 0-based index of the active step */ current: number; style?: React.CSSProperties; }
export declare function Stepper(props: StepperProps): JSX.Element;
