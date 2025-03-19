# Setting Up the Demo Request Feature

This guide explains how to set up and configure the demo request functionality for the LegacyBoost website.

## Overview

The demo request feature allows visitors to request a product demo by filling out a form. The form data is sent to an n8n workflow, which:

1. Stores the lead information in a database
2. Sends an email notification to the sales team
3. Sends a confirmation email to the prospect

## Implementation

### Files Involved

- **index.html**: Contains the demo request form
- **assets/js/form-handler.js**: Handles form submission via JavaScript
- **assets/css/style.css**: Styling for forms and response messages

### n8n Integration

The form submits data to an n8n webhook, which processes the information and triggers subsequent actions.

#### Step 1: Import the Workflow Template

1. Navigate to your n8n dashboard
2. Click "Workflows" > "Import from File"
3. Select the `assets/n8n/demo-request-workflow.json` file
4. Save the workflow

#### Step 2: Configure the Workflow

1. Update the PostgreSQL/database node with your credentials
2. Configure the email nodes with your SMTP settings
3. Customize email templates as needed
4. Save and activate the workflow

#### Step 3: Update the Webhook URL

1. Copy the webhook URL from your n8n workflow
2. Open `assets/js/form-handler.js`
3. Replace the placeholder URL:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://your-n8n-instance.cloud/webhook/demo-request';
   ```
4. Save the file

## Testing

1. Fill out the demo request form on your website
2. Check the n8n workflow execution
3. Verify that:
   - The database entry was created
   - The sales team received an email notification
   - The prospect received a confirmation email

## Database Schema

### Demo Requests Table

```sql
CREATE TABLE demo_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  team_size VARCHAR(50) NOT NULL,
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Whitepaper Downloads Table

```sql
CREATE TABLE whitepaper_downloads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  source VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

- Consider implementing rate limiting
- Add CAPTCHA to prevent automated submissions
- Validate inputs on both client and server side
- Use proper error handling

## Additional Resources

- See [n8n-integration.md](n8n-integration.md) for detailed workflow setup
- View the [form-handler.js](assets/js/form-handler.js) for form submission logic
