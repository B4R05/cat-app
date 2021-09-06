export type TImagesData = {
  height: number;
  width: number;
  id: string;
  url: string;
}

export type TFavData = {
  image: {
    id: string;
    url: string
  }
}

export type TVoteData = {
  image_id: string;
  value: 0 | 1;
}

export type TMergedObj = {
  height: number;
  width: number;
  imageID: string;
  imageURL: string;
  favID: number | null; 
  score: number;
};