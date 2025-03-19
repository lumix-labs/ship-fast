# N8n Integration for Demo Request Form

This document explains how to set up the n8n workflow for handling demo requests and whitepaper downloads from the LegacyBoost website.

## Setup Instructions

1. Create a new workflow in your n8n instance.
2. Add a **Webhook** node as the trigger:
   - Set Method to `POST`
   - Response Mode: `Last Node`
   - Authentication: Optional, depending on your security requirements

3. Add a **Switch** node to handle different form types:
   - Connect it to the Webhook node
   - Add a condition for `formType` equals `demo`
   - Add another condition for `formType` equals `whitepaper`

### For Demo Requests

4. Add a **Set** node after the first switch output:
   - Configure it to format the demo request data
   - Map fields: name, company, email, teamSize, timestamp

5. Add a **PostgreSQL/MySQL/MongoDB** node (depending on your DB preference):
   - Connect to your database
   - Create an "INSERT" operation to store the lead information
   - Map the fields from the Set node

6. Add an **Email** node:
   - Configure your SMTP settings
   - Set recipients:
     - To: Your sales team email
     - CC: Optional admin email
   - Set subject: "New Demo Request: {{$json.company}}"
   - Set HTML body with a template that includes all the lead information

7. Add another **Email** node for confirmation email:
   - Set recipient to the lead's email: `{{$json.email}}`
   - Set subject: "Your LegacyBoost Demo Request"
   - Set HTML body with a thank you message and next steps

### For Whitepaper Downloads

8. Add a **Set** node after the second switch output:
   - Configure it to format the whitepaper request data
   - Map fields: email, timestamp

9. Add a database node:
   - Connect to your database
   - Create an "INSERT" operation to store the whitepaper download
   - Map the fields from the Set node

10. Add an **Email** node:
    - Configure with your SMTP settings
    - Set recipient to the user's email: `{{$json.email}}`
    - Set subject: "Your LegacyBoost Whitepaper"
    - Set HTML body with download information
    - Attach the whitepaper PDF or include a secure download link

### Final Steps

11. Add a **Respond to Webhook** node at the end of both branches:
    - Set status code: 200
    - Set response body: `{"success": true}`

12. Save and activate your workflow.

13. Copy the webhook URL and update the `N8N_WEBHOOK_URL` variable in your `form-handler.js` file.

## Security Considerations

- Consider adding webhook authentication
- Implement rate limiting to prevent abuse
- Validate email addresses and input data
- Consider adding CAPTCHA to your forms

## Testing

1. Fill out the demo request form on your website
2. Verify data is stored in your database
3. Verify emails are sent correctly
4. Check that the success message appears on the website

## Troubleshooting

- Check the n8n execution logs if submissions aren't being processed
- Verify SMTP settings if emails aren't being sent
- Check browser console for JavaScript errors
- Verify that the webhook URL is correctly set in the form handler
