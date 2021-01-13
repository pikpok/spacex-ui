import { Flex, Tag, Text, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { Launch } from '../types'
import { launchStatus } from '../utils/launchStatus'

interface Props {
  launch: Launch;
}

export const LaunchCard: FC<Props> = ({ launch }) => {
  const shadowColor = useColorModeValue(255, 0);

  return (
    <Flex
      as="li"
      listStyleType="none"
      h="full"
      flexDir="column"
      background={`
        linear-gradient(
          to bottom,
          rgba(${shadowColor}, ${shadowColor}, ${shadowColor}, 0.4) 0%,
          rgba(${shadowColor}, ${shadowColor}, ${shadowColor}, 0.7) 100%
        ),
        url(${launch.links.flickr.original[0]}) repeat 0 0;
      `}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="lg"
      borderWidth={1}
      borderColor="gray.400"
      shadow="md"
      p={4}
    >
      <Text as="h2" fontSize="xl" flex={1} mb={4} fontWeight="bold">{launch.name}</Text>

      <Flex mb={1} justifyContent="space-between">
        <Text>Status:</Text>
        <Tag fontWeight="bold">{launchStatus(launch)}</Tag>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Rocket:</Text>
        <Text fontWeight="bold">{launch.rocket.name}</Text>
      </Flex>
    </Flex>
  )
}
