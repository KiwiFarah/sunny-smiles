// InitialModal.test.js
//Test if the initial modal renders
import React from 'react';
import { render, screen } from '@testing-library/react';
import GameLevel1 from '../pages/GameLevel1';

test('it renders the initial modal with all elements', () => {
    render(<GameLevel1 />);
    expect(screen.getByTestId('game-modal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });
  