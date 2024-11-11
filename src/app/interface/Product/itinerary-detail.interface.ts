
interface itineraryBatch {
  itineraryDateSystemId: number;
  departureDate: string;
  stock: number;
}
export interface ItineraryDetail {
  itinerarySystemId: number;
  itineraryName: string;
  activityId: number;
  activityName: string;
  areaName: string;
  imagePath: string[];
  itineraryBatch: itineraryBatch[];
  price: number;
  itineraryDetail: string;
  itineraryDetails: string[];
  itineraryBrief: string;
  itineraryNotes: string;
}
