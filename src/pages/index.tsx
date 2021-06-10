import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<any> => {
    const responseImages = await api
      .get(`/api/images`, { params: { after: pageParam } })
      .then(response => response.data);
    return responseImages;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => lastPage.after,
  });

  const formattedData = useMemo(() => {
    if (data !== undefined) {
      const images = [];
      data.pages.map(page => page.data.map(image => images.push({ ...image })));

      return images;
    }
  }, [data]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  let textButton = '';

  if (isFetchingNextPage) {
    textButton = 'Carregando...';
  } else if (hasNextPage) {
    textButton = 'Carregar mais';
  } else {
    textButton = '';
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage ? (
          <Button
            mt="40px"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {textButton}
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
