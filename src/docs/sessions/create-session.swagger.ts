export default {
  tags: ['Sessions'],
  description: 'Sign in a user.',
  operationId: 'createSession',
  requestBody: {
    description: "Login's data.",
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateSessionDTO',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Session created.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AuthUserDTO',
          },
        },
      },
    },
    '400': {
      description: 'Bad request.',
    },
  },
};
