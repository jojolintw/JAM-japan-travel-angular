export interface ArticleCreateDTO {
  memberId: number;
  articleTitle: string;
  articleContent: string;
  hashtagNumbers: number[];
}
