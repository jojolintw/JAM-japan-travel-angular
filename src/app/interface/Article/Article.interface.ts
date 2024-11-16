import { Hashtag } from "./Hashtag.interface";
export interface Article {
  articleId: number;
  memberId: number;
  launchTime: Date;
  articleTitle: string;
  lastUpdateTime: Date;
  articleContent: string;
  articleHashtags: string[];

  hashtags: Hashtag[];
  imagePath: string; // 新增 imagePath 屬性，用來接收會員的圖片路徑
  memberName :string;
}
