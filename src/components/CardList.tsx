import { Grid } from '@chakra-ui/react';
import { useState } from 'react';
import { Card as CardComponent } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState('');

  function handleOpenModal(urlImg: string): void {
    setIsOpenModal(true);
    setImage(urlImg);
  }

  function handleCloseModal(): void {
    setImage('');
    setIsOpenModal(false);
  }
  return (
    <>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap="40px">
        {cards.map(card => (
          <CardComponent
            key={card.id}
            data={card}
            viewImage={() => handleOpenModal(card.url)}
          />
        ))}
      </Grid>

      {isOpenModal && (
        <ModalViewImage imgUrl={image} isOpen onClose={handleCloseModal} />
      )}
    </>
  );
}
