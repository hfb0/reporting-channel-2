export default {
  tags: ['Complaints'],
  description: 'Create a complaint and return the complaint created.',
  operationId: 'createComplaints',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    description: 'A complaint with location',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateComplaintDTO',
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Complaint created.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Complaint',
          },
        },
      },
    },
    '400': {
      description: 'Bad request.',
    },
    '401': {
      description: 'Invalid JWT token.',
    },
    '404': {
      description: 'Address not found.',
    },
    '422': {
      description: 'The address has high granularity.',
    },
  },
};
