import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { Tweet } from '../types/sentiment';

interface TweetListProps {
  tweets: Tweet[];
}

const getSentimentColor = (sentiment: Tweet['sentiment']): string => {
  switch (sentiment) {
    case 'Positive':
      return '#4caf50';
    case 'Neutral':
      return '#9e9e9e';
    case 'Negative':
      return '#f44336';
    default:
      return '#000000';
  }
};

export default function TweetList({ tweets }: TweetListProps) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tweets
      </Typography>
      
      <List>
        {tweets.map((tweet) => (
          <ListItem
            key={tweet.id}
            sx={{
              mb: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle2">
                    {tweet.username}
                  </Typography>
                  <Chip
                    label={tweet.sentiment}
                    size="small"
                    sx={{
                      backgroundColor: getSentimentColor(tweet.sentiment),
                      color: 'white',
                    }}
                  />
                </Box>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {tweet.text}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {new Date(tweet.timestamp).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
} 