import { Hashtag } from "./Hashtag.interface";
export interface Article {
  articleId: number;
  memberId: number;
  launchTime: Date;
  articleTitle: string;
  lastUpdateTime: Date;
  articleContent: string;
  articleHashtags: string[];
  // image?: string;
  hashtags: Hashtag[];
}
