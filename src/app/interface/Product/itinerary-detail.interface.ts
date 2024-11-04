import { isSameDay } from 'date-fns';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
export interface ItineraryDetail {
  itinerarySystemId: number;
  itineraryName: string;
  activityName: string;
  areaName: string;
  imageName: string;
  itineraryDate: string[];
  stock: number;
  price: number;
  itineraryDetail: string;
  itineraryBrief: string;
  itineraryNotes: string;
}
