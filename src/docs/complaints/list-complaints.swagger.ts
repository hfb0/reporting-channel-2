export default {
  tags: ['Complaints'],
  description:
    'Returns all complaints from the system that the user has access to.',
  operationId: 'getComplaints',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'A list of Complaint.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Complaint',
            },
          },
        },
      },
    },
  },
};
