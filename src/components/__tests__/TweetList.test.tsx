import React from 'react';
import { render, screen } from '@testing-library/react';
import TweetList from '../TweetList';

const mockTweets = [
  {
    id: '1',
    text: 'Great product!',
    sentiment: 'Positive' as const,
    username: '@user1',
    timestamp: '2024-03-18T14:30:00Z',
  },
  {
    id: '2',
    text: 'Not impressed',
    sentiment: 'Negative' as const,
    username: '@user2',
    timestamp: '2024-03-18T14:15:00Z',
  },
];

describe('TweetList', () => {
  it('renders tweets with correct content', () => {
    render(<TweetList tweets={mockTweets} />);
    
    expect(screen.getByText('Great product!')).toBeInTheDocument();
    expect(screen.getByText('Not impressed')).toBeInTheDocument();
    expect(screen.getByText('@user1')).toBeInTheDocument();
    expect(screen.getByText('@user2')).toBeInTheDocument();
  });

  it('displays sentiment chips with correct labels', () => {
    render(<TweetList tweets={mockTweets} />);
    
    expect(screen.getByText('Positive')).toBeInTheDocument();
    expect(screen.getByText('Negative')).toBeInTheDocument();
  });

  it('formats timestamps correctly', () => {
    render(<TweetList tweets={mockTweets} />);
    
    // Use getAllByText since the date appears multiple times
    const dateElements = screen.getAllByText(/18\/03\/2024/);
    expect(dateElements.length).toBeGreaterThan(0);
  });
}); 