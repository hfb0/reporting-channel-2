export default {
  tags: ['Users'],
  description: 'User sign up.',
  operationId: 'createUser',
  requestBody: {
    description: "User's data.",
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateUserDTO',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'User created.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
    '400': {
      description: 'Bad request.',
    },
  },
};
