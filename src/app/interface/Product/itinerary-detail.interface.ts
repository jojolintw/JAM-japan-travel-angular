import { theme_Activity } from "./Theme-Activity";

export interface itineraryBatch {
  itineraryDateSystemId: number;
  departureDate: string;
  stock: number;
}

export interface ItineraryDetail {
  itinerarySystemId: number;
  itineraryName: string;
  themeName: string;
  themeSystemId: number;
  activitySystemId: number;
  activityName: string;
  themeActivity: theme_Activity;
  areaName: string;
  imagePath: string[];
  itineraryBatch: itineraryBatch[];
  price: number;
  itineraryDetail: string;
  itineraryDetails: string[];
  itineraryBrief: string;
  itineraryNotes: string;
}
