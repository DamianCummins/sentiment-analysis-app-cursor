'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import FileUploader from '../components/FileUploader';
import SentimentSummary from '../components/SentimentSummary';
import TweetList from '../components/TweetList';
import { getSentimentSummary, getTweets } from '../services/sentimentService';
import { Tweet, SentimentSummary as SentimentSummaryType } from '../types/sentiment';

export default function Home() {
  const [summary, setSummary] = useState<SentimentSummaryType | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const loadData = async () => {
    try {
      const [summaryData, tweetsData] = await Promise.all([
        getSentimentSummary(),
        getTweets(),
      ]);
      setSummary(summaryData);
      setTweets(tweetsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sentiment Analysis
      </Typography>

      <FileUploader onFileAnalyzed={loadData} />

      {summary && <SentimentSummary data={summary} />}
      
      {tweets.length > 0 && <TweetList tweets={tweets} />}
    </Container>
  );
} 