import { useState } from 'react';
import toast from 'react-hot-toast';
import { Image, Card, Icon, Rating, Button, Label, Placeholder } from 'semantic-ui-react';
import { API } from '../../api';
import { ratingStyle, voteStyle } from './styles';
import { ICard } from './types';

const FALLBACK = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';

const CatCard = ({ src = FALLBACK, score = 9999, imageID, favID = null }: ICard) => {
  const [favouriteId, setFavouriteId] = useState<number | null>(favID);
  const [totalScore, setTotalScore] = useState<number>(score);

  const makeFavourite = async (): Promise<void> => {
    try {
      const res = await API.post('/favourites/', { image_id: imageID });
      if (res.status === 200) {
        toast.success('Added to favorites!');
        setFavouriteId(res.data.id);
      }
    } catch (error) {
      console.error('error making favourite: ', error);
    } 
  };

  const makeUnfavourite = async (): Promise<void> => {
    try {
      const res = await API.delete(`/favourites/${favouriteId}`);
      if (res.status === 200) {
        toast.success('Removed from favorites');
        setFavouriteId(null);
      }
    } catch (error) {
      console.error('error making unfavourite: ', error);
    } 
  };

  const createVote = async (value: 0 | 1): Promise<void> => {
    try {
      const res = await API.post('/votes/', { image_id: imageID, value });
      if (res.status === 200) {
        value === 0 ? toast.success('Downvoted this cat') : toast.success('Upvoted this cat!');
        let newScore: number = value === 0 ? totalScore - 1 : totalScore + 1;
        setTotalScore(newScore);
      }
    } catch (error) {
      console.error('error creating vote: ', error);
    } 
  };

  return (
    <Card centered fluid>
      {src.length ? <Image src={src} wrapped ui={false} /> : (
        <Placeholder>
          <Placeholder.Image rectangular/>
        </Placeholder>
      )}
      <Card.Content extra style={voteStyle}>
        <Card.Content extra>
          <Button basic icon onClick={() => createVote(1)}><Icon name='arrow circle up' /></Button> 
          <Button basic icon onClick={() => createVote(0)}><Icon name='arrow circle down' /></Button> 
          <Label>{totalScore} points</Label>
        </Card.Content>
        <Card.Content style={ratingStyle}>
          <Rating 
            size="huge"
            icon='heart' 
            defaultRating={!favouriteId ? 0 : 1} 
            maxRating={1} 
            onRate={() => !favouriteId ? makeFavourite() : makeUnfavourite()}
          />
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default CatCard;