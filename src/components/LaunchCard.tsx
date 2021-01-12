import { Box, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Launch } from '../types'

interface Props {
  launch: Launch
}

export const LaunchCard: FC<Props> = ({ launch }) => {
  return (
    <Box
      as="li"
      listStyleType="none"
      borderRadius="lg"
      borderWidth={1}
      borderColor="gray.400"
      shadow="md"
      my={2}
      p={2}
    >
      <Text as="h2" fontSize="lg" fontWeight="bold">{launch.name}</Text>
    </Box>
  )
}
