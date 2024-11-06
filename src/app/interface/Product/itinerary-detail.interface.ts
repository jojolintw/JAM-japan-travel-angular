
interface DateSystem {
  itineraryDateSystemId: number;
  itineraryDate: string[];
  stock: number;
}
export interface ItineraryDetail {
  itinerarySystemId: number;
  itineraryName: string;
  activityId: number;
  activityName: string;
  areaName: string;
  imageName: string;
  dateSystem: DateSystem[];
  stock: number | 0;
  price: number;
  itineraryDetail: string;
  itineraryBrief: string;
  itineraryNotes: string;
}
