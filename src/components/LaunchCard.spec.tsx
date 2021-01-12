import { render, screen } from "@testing-library/react";
import { Launch } from "../types";
import { LaunchCard } from "./LaunchCard";

describe('LaunchCard', () => {
  const launch = {
    name: 'Falcon 9 Test Flight'
  } as Launch

  beforeEach(() => {
    render(<LaunchCard launch={launch} />);
  })

  it('should render single item correctly', () => {
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });

  it('should render launch name', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Falcon 9 Test Flight');
  });

});
