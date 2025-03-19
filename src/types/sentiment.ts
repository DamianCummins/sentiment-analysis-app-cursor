export interface Tweet {
  id: string;
  text: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  username: string;
  timestamp: string;
}

export interface SentimentSummary {
  totalTweets: number;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface FileInfo {
  name: string;
  size: string;
  progress: number;
} 