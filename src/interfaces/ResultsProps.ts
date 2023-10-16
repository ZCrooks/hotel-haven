export interface ResultsProps {
  results: any; 
  currency: string;
  setCurrency: (currency: string) => void;
  handleSelect: (selectedItem: any) => void; 
  errorMessage: string;
  errorPresent: boolean;
  selectedCity: any;
}
