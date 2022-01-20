import { render, screen, fireEvent } from '@testing-library/react';
import { Posts } from './Posts';

const mockPosts = [
  {
    id: 1,
    cover: 'http://www.somedomain.com/image',
    title: 'Title',
    body: 'Text body'
  }
];

describe('<Posts />', () => {
  it('should render Posts correctly', () => {
    render(<Posts posts={mockPosts} />);
  });
});