// Test script to verify Inngest setup
const { createClient } = require('inngest');

// Load environment variables
require('dotenv').config({ path: '.env' });

const inngest = createClient({
  id: 'signalist',
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

async function testInngest() {
  try {
    console.log('Testing Inngest connection...');

    // Test event sending
    const result = await inngest.send({
      name: 'test/connection',
      data: {
        message: 'Testing Inngest connection',
        timestamp: new Date().toISOString(),
      },
    });

    console.log('✅ Inngest connection successful!');
    console.log('Event sent:', result);

  } catch (error) {
    console.error('❌ Inngest connection failed:', error.message);
    console.error('Please check your INNGEST_EVENT_KEY and INNGEST_SIGNING_KEY');
  }
}

testInngest();