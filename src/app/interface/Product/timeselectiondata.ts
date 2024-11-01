interface TimeSelectionData {
  DepartureDate: string;
  times: string[];
  tours: {
    DepartureDate: string;
    stock: number;
  }[];
}
