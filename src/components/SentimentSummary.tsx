import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SentimentSummary as SentimentSummaryType } from '../types/sentiment';

interface SentimentSummaryProps {
  data: SentimentSummaryType;
}

export default function SentimentSummary({ data }: SentimentSummaryProps) {
  const chartData = [
    { name: 'Positive', value: data.distribution.positive },
    { name: 'Neutral', value: data.distribution.neutral },
    { name: 'Negative', value: data.distribution.negative },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
        <Box>
          <Typography variant="h4" component="div">
            {data.totalTweets.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Tweets
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Sentiment Distribution
      </Typography>
      
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill={(entry) => {
                switch (entry.name) {
                  case 'Positive':
                    return '#4caf50';
                  case 'Neutral':
                    return '#9e9e9e';
                  case 'Negative':
                    return '#f44336';
                  default:
                    return '#000000';
                }
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
} 