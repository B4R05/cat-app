import { AxiosResponse } from 'axios';
import { TMergedObj, TFavData, TImagesData, TVoteData } from './types';

export const mergeArrays = (
  imagesData: AxiosResponse, 
  favouritesData: AxiosResponse, 
  votesData: AxiosResponse
): TMergedObj[] => {
  return imagesData.data.map((imgData: TImagesData) => {
    const foundFav = favouritesData.data.find((fav: TFavData) => imgData.id === fav.image.id);
    const upvotes = votesData.data.filter((vote: TVoteData) => (imgData.id === vote.image_id) && (vote.value === 1));
    const downvotes = votesData.data.filter((vote: TVoteData) => (imgData.id === vote.image_id) && (vote.value === 0));
  
    return {
      height: imgData.height,
      width: imgData.width,
      imageID: imgData.id, // image_id, can be used to vote up / down and favourite
      imageURL: imgData.url,
      favID: foundFav ? foundFav.id : null, // favourite_id, used to unfavourite + fill/unfill heart
      score: upvotes.length - downvotes.length 
    };
  });
};


