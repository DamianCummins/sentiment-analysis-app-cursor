import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from '../FileUploader';
import { analyzeSentiment } from '../../services/sentimentService';

// Mock the service
jest.mock('../../services/sentimentService', () => ({
  analyzeSentiment: jest.fn(),
}));

describe('FileUploader', () => {
  const mockOnFileAnalyzed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload button', () => {
    render(<FileUploader onFileAnalyzed={mockOnFileAnalyzed} />);
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('handles file upload', async () => {
    (analyzeSentiment as jest.Mock).mockResolvedValueOnce(undefined);

    render(<FileUploader onFileAnalyzed={mockOnFileAnalyzed} />);
    
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Upload CSV');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      // Use a more flexible matcher that looks for text containing "test.csv"
      expect(screen.getByText((content) => content.includes('test.csv'))).toBeInTheDocument();
      expect(mockOnFileAnalyzed).toHaveBeenCalled();
    });
  });

  it('shows error state when upload fails', async () => {
    (analyzeSentiment as jest.Mock).mockRejectedValueOnce(new Error('Upload failed'));
    
    render(<FileUploader onFileAnalyzed={mockOnFileAnalyzed} />);
    
    const file = new File(['test content'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('Upload CSV');
    
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnFileAnalyzed).not.toHaveBeenCalled();
    });
  });
}); 