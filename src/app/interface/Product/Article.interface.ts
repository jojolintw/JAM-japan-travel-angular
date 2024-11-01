export interface Article {
  articleId: number;
  articleTitle: string;
  articleContent: string;
  articleHashtag: string;
  memberId: number;
  launchTime: string;
  lastUpdateTime: string;
  image?: string;
}
