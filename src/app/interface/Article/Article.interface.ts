export interface Article {
  articleLaunchtime: string | number | Date;
  articleId: number;
  memberId: number;
  launchTime: string;
  articleTitle: string;
  lastUpdateTime: string;
  articleContent: string;
  articleHashtag: string[];
  // image?: string;
}
