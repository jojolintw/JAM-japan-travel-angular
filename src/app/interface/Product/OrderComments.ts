export interface Comment{
  itinerarySystemId : number
  commentStar : number
  commentContent : number
  commentDate : string
}

export interface OrderComments{
  memberId : number
  memberName : string
  orderId : number
  comments : Comment[]
}
