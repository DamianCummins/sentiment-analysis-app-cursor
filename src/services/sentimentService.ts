import { Tweet, SentimentSummary } from '../types/sentiment';

// Mock data
const mockTweets: Tweet[] = [
  {
    id: '1',
    text: 'Just got my hands on the new SuperPhone 3000! The battery life is incredible, and the camera quality is out of this world! 📱 #TechLover #HappyCustomer',
    sentiment: 'Positive',
    username: '@happy_camper',
    timestamp: '2024-03-18T14:30:00Z'
  },
  {
    id: '2',
    text: 'Bought the latest SmartWatch and it\'s already glitching. Not impressed. 😒 #TechFail #Disappointed',
    sentiment: 'Negative',
    username: '@grumpygadget',
    timestamp: '2024-03-18T14:15:00Z'
  },
  {
    id: '3',
    text: 'The new UltraLaptop is decent. Good performance, but the design could be better. 👍 #TechReview #Meh',
    sentiment: 'Neutral',
    username: '@OnTheFence',
    timestamp: '2024-03-18T14:00:00Z'
  }
];

const mockSummary: SentimentSummary = {
  totalTweets: 3000,
  distribution: {
    positive: 1800,
    neutral: 900,
    negative: 300
  }
};

export const analyzeSentiment = async (file: File): Promise<void> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export const getSentimentSummary = async (): Promise<SentimentSummary> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSummary);
    }, 1000);
  });
};

export const getTweets = async (): Promise<Tweet[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTweets);
    }, 1000);
  });
}; 