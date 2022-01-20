import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';


describe('<TextInput />', () => {
  it('should render TextInput correctly', () => {
    render(<TextInput />);
  });
});