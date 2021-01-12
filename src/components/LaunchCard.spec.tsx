import { render, screen } from "@testing-library/react";
import { Launch } from "../types";
import { LaunchCard } from "./LaunchCard";

describe('LaunchCard', () => {
  const launch = {
    name: 'Falcon 9 Test Flight',
    links: {
      flickr: {
        original: ['https://example.com/image.png'],
      },
    },
    rocket: {
      name: 'Falcon 9',
    },
  } as Launch;

  beforeEach(() => {
    render(<LaunchCard launch={launch} />);
  });

  it('should render single item correctly', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should render launch details', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Falcon 9 Test Flight');
    expect(screen.getByText(/rocket/i).parentNode).toHaveTextContent(/Falcon 9/);
    expect(screen.getByText(/status/i).parentNode).toHaveTextContent(/Failure/);
  });
});
