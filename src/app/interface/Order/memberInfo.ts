export interface apiresponse
{
  result:string
  loginmember:memberInfo
}

export interface memberInfo
{
  memberId:number
  chineseName:string
  englishName:string
  gender:boolean
  birthday:Date
  cityAreaId:number
  cityAreaName:string
  phone:number
  email:string
  password:string
  memberLevelId:number
  memberLevel:string
  memberStatusId:number
  memberStatus:string
  imageUrl?:string
}
