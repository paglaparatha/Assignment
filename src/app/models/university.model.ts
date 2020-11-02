export interface University{
  id: number
  name: string
  location: string
  description: string
  image: string
}

export interface UniversityDetail{
  description: string
  id: number
  name: string
  location: string
  image: string
  details: {
    des1: string
    des2: string
    admission: string
  }
}
