import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  CloseButton,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { queryLaunches } from './api';
import { LaunchCard } from './components/LaunchCard';
import { Launch } from './types';
import { LaunchStatus } from './utils/launchStatus';

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

export const App = () => {
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LaunchStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 0,
  });

  useEffect(() => {
    setError('');
    setLoading(true);

    queryLaunches(query, status, pagination.currentPage)
      .then((data) => {
        setLaunches(data.docs);
        setPagination({
          currentPage: data.page,
          totalPages: data.totalPages,
        });
      })
      .catch((error) => {
        if (error && error.message) {
          setError(error.message);
        } else {
          setError('Please try again');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, status, pagination.currentPage]);

  return (
    <Flex p={4} flexDir="column">
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Failed to fetch launches!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton onClick={() => setError('')} position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Text mb={4} textAlign="center" fontSize="2xl" fontWeight="bold">
        Launches - Page {pagination.currentPage}/{pagination.totalPages}
      </Text>

      <Input
        mb={4}
        w="full"
        placeholder="Type to filter"
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
      />

      <Select
        mb={4}
        value={status || ''}
        onChange={({ target: { value } }) => setStatus(value ? value as LaunchStatus : null)}
      >
        <option value="">All</option>
        <option value="Future">Future</option>
        <option value="Success">Success</option>
        <option value="Failure">Failure</option>
      </Select>

      {loading && <Center><Spinner size="lg" /></Center>}

      <SimpleGrid as="ul" columns={[1, 2, 2, 4]} mb={4} spacing={4}>
        {launches.map(launch => <LaunchCard key={launch.id} launch={launch} />)}
      </SimpleGrid>

      <Flex justifyContent="space-between">
        <Button
          disabled={pagination.currentPage === 1}
          onClick={() => setPagination(({ currentPage, totalPages }) => ({ totalPages, currentPage: currentPage - 1 }))}
        >
          Previous page
        </Button>
        <Button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => setPagination(({ currentPage, totalPages }) => ({ totalPages, currentPage: currentPage + 1 }))}
        >
          Next page
        </Button>
      </Flex>
    </Flex>
  )
}
