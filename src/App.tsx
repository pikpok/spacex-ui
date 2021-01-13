import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  CloseButton,
  Flex,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react';
import { FiltersRow } from './components/FiltersRow';
import { LaunchCard } from './components/LaunchCard';
import { useLaunches } from './hooks/useLaunches';

export const App = () => {
  const {
    pagination,
    setCurrentPage,
    error,
    closeError,
    filters,
    setFilter,
    loading,
    launches,
  } = useLaunches();

  return (
    <Flex p={4} flexDir="column">
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Failed to fetch launches!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton onClick={closeError} position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Text mb={4} textAlign="center" fontSize="2xl" fontWeight="bold">
        Launches - Page {pagination.currentPage}/{pagination.totalPages}
      </Text>

      <FiltersRow
        filters={filters}
        onChange={setFilter}
      />

      {loading && <Center><Spinner size="lg" /></Center>}

      <SimpleGrid as="ul" columns={[1, 2, 2, 4]} mb={4} spacing={4}>
        {launches.map(launch => <LaunchCard key={launch.id} launch={launch} />)}
      </SimpleGrid>

      <Flex justifyContent="space-between">
        <Button
          disabled={loading || pagination.currentPage === 1}
          onClick={() => setCurrentPage(pagination.currentPage - 1)}
        >
          Previous page
        </Button>
        <Button
          disabled={loading || pagination.currentPage === pagination.totalPages}
          onClick={() => setCurrentPage(pagination.currentPage + 1)}
        >
          Next page
        </Button>
      </Flex>
    </Flex>
  )
}
