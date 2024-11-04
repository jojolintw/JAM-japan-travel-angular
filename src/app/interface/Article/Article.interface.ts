export interface Article {
  articleId: number;
  memberId: number;
  launchTime: Date;
  articleTitle: string;
  lastUpdateTime: Date;
  articleContent: string;
  articleHashtags: string[];
  // image?: string;
}
