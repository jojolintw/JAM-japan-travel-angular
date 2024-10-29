import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
export interface ItineraryDetail {
  id: number;
  title: string;
  image: string;
  travelbrief: string;
  date: { date: Date; time: string }[];
  stock: number;
  price: number;
}
