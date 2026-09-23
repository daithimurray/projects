/** Customer quote with name, area and service. Verbatim reviews only — never edit a customer's words. */
export interface TestimonialProps { quote: string; name: string; location?: string; service?: string; rating?: number; variant?: "card" | "feature"; style?: React.CSSProperties; }
export declare function Testimonial(props: TestimonialProps): JSX.Element;
