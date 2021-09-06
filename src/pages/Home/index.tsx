import { useEffect, useState } from 'react';
import { Grid, Container, Segment, Header, Icon } from 'semantic-ui-react';
import { API } from '../../api';
import CatCard from '../../components/Card';
import Notification from '../../components/Notification';
import { mergeArrays } from '../../utils';
import { TMergedObj } from '../../utils/types';

const Home = () => {
  const [catsData, setCatsData] = useState<TMergedObj[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  // FETCH MULTIPLE DATA
  useEffect(() => {
    const params = new URLSearchParams({ limit: '10', page: '1' });

    const fetchMultipleData = async () => {
      !isLoading && setLoading(true);
      try {
        const imagesData = await API.get(`/images?${params}`);
        const favouritesData = await API.get('/favourites');
        const votesData = await API.get('/votes');

        const mergedImgAndFav = mergeArrays(imagesData, favouritesData, votesData);

        setCatsData(mergedImgAndFav);
      } catch (error) {
        console.error('error fetching multiple data sets: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMultipleData();
  }, []);

  const renderCatCards = () => {
    if (catsData.length && !isLoading) {
      return (
        <Grid columns={4} stackable doubling>
          {catsData.map((catData, i) => (
            <Grid.Column key={i}>
              <CatCard 
                key={catData.imageID}
                src={catData.imageURL} 
                favID={catData.favID}
                imageID={catData.imageID}
                score={catData.score}
              />
            </Grid.Column>
          ))}
        </Grid>
      );
    }

    if (!catsData.length && !isLoading) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name='info circle' />
            You have not uploaded any cat images. Please navigate to the upload page!
          </Header>
        </Segment>
      );
    }

    return <Segment placeholder loading/>;
  };

  return (
    <Container>
      {renderCatCards()}
      <Notification />
    </Container>
  );
};

export default Home;