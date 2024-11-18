export interface Comment{
  itinerarySystemId : number
  commentStar : number | null
  commentContent : string | null
  commentDate : string | null
}

export interface OrderComments{
  memberId : number
  memberName : string
  orderId : number
  comments : Comment[]
}
