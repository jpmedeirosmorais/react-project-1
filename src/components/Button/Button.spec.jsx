import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';


describe('<Button />', () => {
  it('should render the button with text Load more', () => {
    render(<Button text='Load more'/>);
    
    expect.assertions(1);
    
    const button = screen.getByRole('button', { name: /Load more/i});

    expect(button).toHaveAttribute('class', 'button');
  });

  it('should call function on button click', () => {
    const fn = jest.fn();

    render(<Button text='Load more' onClick={fn}/>);
    
    const button = screen.getByRole('button', { name: /Load more/i});
    
    fireEvent.click(button);

    expect(fn).toHaveBeenCalled();
  });

  it('should to be disabled when disabled is true', () => {

    render(<Button text='Load more' disabled={true} />);
    
    const button = screen.getByRole('button', { name: /Load more/i});
    
    expect(button).toBeDisabled();
  });

  it('should to be enabled when disabled is false', () => {

    render(<Button text='Load more' disabled={false} />);
    
    const button = screen.getByRole('button', { name: /Load more/i});
    
    expect(button).toBeEnabled();
  });
})