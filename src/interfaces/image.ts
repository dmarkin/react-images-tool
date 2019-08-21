export interface ImageItem {
  id: number,
  src: string,
  name: string,
  altText: string,
  tooltip: TooltipItem
}

export interface TooltipItem {
  text: string,
  color: string,
  position: Positions
}

export type Positions = 'top' | 'right' | 'bottom' | 'left';

export interface ImagesState {
  isLoading: boolean,
  images: ImageItem[],
  errors: {}
}

export interface ImagesActionTypes {
  type: string,
  payload: any
}
