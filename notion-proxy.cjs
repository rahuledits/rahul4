const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Notion integration token and database ID for 'rahul edits'
const NOTION_TOKEN = 'secret_xxx'; // <-- Your Notion integration token
const NOTION_DATABASE_ID = '2304c18e169d8094954ed9e2da88667d'; // <-- Your Notion database ID (no dashes)

app.post('/api/notion', async (req, res) => {
  const {
    name = '',
    email = '',
    projectType = '',
    plan = '',
    budget = '',
    timeline = '',
    selectedServices = '',
    currency = '',
    message = '',
    additionalService = ''
  } = req.body;

  // Set the current date/time for the Date column
  const now = new Date().toISOString();

  try {
    // Create a new row in the Notion database
    const response = await axios.post(
      'https://api.notion.com/v1/pages',
      {
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          'Name': {
            title: [
              {
                text: { content: name }
              }
            ]
          },
          'Date': {
            date: { start: now }
          },
          'Email': {
            email: email
          },
          'Project': {
            rich_text: [
              {
                text: { content: projectType }
              }
            ]
          },
          'Plan': {
            rich_text: [
              {
                text: { content: plan }
              }
            ]
          },
          'Budget': {
            rich_text: [
              {
                text: { content: budget }
              }
            ]
          },
          'Timeline': {
            rich_text: [
              {
                text: { content: timeline }
              }
            ]
          },
          'Selected Services': {
            rich_text: [
              {
                text: { content: selectedServices }
              }
            ]
          },
          'Currency': {
            rich_text: [
              {
                text: { content: currency }
              }
            ]
          },
          'Message': {
            rich_text: [
              {
                text: { content: message }
              }
            ]
          },
          'Additional service': {
            rich_text: [
              {
                text: { content: additionalService }
              }
            ]
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json({ success: true, notion: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(4000, () => console.log('Notion proxy running on port 4000')); 