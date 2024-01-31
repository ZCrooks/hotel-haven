import { FormEvent, ChangeEvent } from "react";

export interface HeaderProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateRangeChange: (value: Date[] | null) => void;
  results: any[]; 
  autoCompleteResults: any; 
  cityImages: any[];
  handleAutoCompleteSelect: (result: any) => void; 
  handleAutoCompleteClick: (result: any) => void; 
}