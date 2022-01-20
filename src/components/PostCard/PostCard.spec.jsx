import { render, screen, fireEvent } from '@testing-library/react';
import { PostCard } from './PostCard';


describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard />);
  });
});