export const ErrorMessages = {
    //Domain
    TEXT_EMPTY: 'Text cannot be empty',
    RECIPIENT_ID_EMPTY: 'Recipient ID cannot be empty',
    MESSAGE_REQUIRED: 'Message is required',

    // HTTP responses
    TEXT_AND_RECIPIENT_REQUIRED: 'Text and recipientId are required',
    MESSAGE_SENT: 'Message sent successfully',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
} as const;