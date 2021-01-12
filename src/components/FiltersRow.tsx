import { Input, Select, SimpleGrid } from "@chakra-ui/react"
import { FC } from "react"
import { LaunchStatus } from "../utils/launchStatus"

export interface Filters {
  query: string;
  status: LaunchStatus | null;
}

interface Props {
  filters: Filters
  onChange: (key: keyof Filters, value: Filters[keyof Filters]) => void;
}

export const FiltersRow: FC<Props> = ({filters, onChange}) => {
  return (
    <SimpleGrid mb={4} spacing={4} columns={[1, 2]}>
      <Input
        w="full"
        placeholder="Type to filter"
        value={filters.query}
        onChange={({ target: { value } }) => onChange('query', value)}
      />

      <Select
        value={filters.status || ''}
        onChange={({ target: { value } }) => onChange('status', value ? value as LaunchStatus : null)}
      >
        <option value="">All</option>
        <option value="Future">Future</option>
        <option value="Success">Success</option>
        <option value="Failure">Failure</option>
      </Select>

    </SimpleGrid>
  )
}
