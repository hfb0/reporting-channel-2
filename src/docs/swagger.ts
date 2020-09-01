import getComplaints from './complaints/list-complaints.swagger';
import createComplaint from './complaints/create-complaint.swagger';
import createUser from './users/create-user.swagger';
import createSession from './sessions/create-session.swagger';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description:
      'A simple reporting API using the Express framework with TypeScript.',
    termsOfService: '',
    contact: {
      name: 'Henrique F. Barbosa',
      email: 'henrique-carlos@live.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333/api/v1',
      description: 'Local server',
    },
    {
      url: 'https://app-dev.herokuapp.com/api/v1',
      description: 'DEV Env',
    },
  ],

  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User id',
            format: 'uuid',
          },
          name: {
            type: 'string',
            description: 'User name',
            minLength: 5,
            example: 'João Kléber',
          },
          email: {
            type: 'string',
            description: 'User email',
            format: 'email',
          },
          cpf: {
            type: 'string',
            description: 'User cpf',
            example: '11903684481',
            minLength: 11,
            maxLength: 11,
          },
          active: {
            type: 'boolean',
            description: 'User status',
          },
          createdAt: {
            type: 'string',
            description: 'User creation time',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            description: 'User update time',
            format: 'date-time',
          },
        },
      },

      CreateUserDTO: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'User name',
            minLength: 5,
            example: 'João Kléber',
          },
          email: {
            type: 'string',
            description: 'User email',
            format: 'email',
          },
          cpf: {
            type: 'string',
            description: 'User cpf',
            example: '11903684481',
            minLength: 11,
            maxLength: 11,
          },
          password: {
            type: 'string',
            description: 'User password',
            example: '12345678',
            format: 'password',
            minLength: 8,
          },
        },
      },
      CreateSessionDTO: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'User email',
            format: 'email',
          },
          password: {
            type: 'string',
            description: 'User password',
            example: '12345678',
            format: 'password',
            minLength: 8,
          },
        },
      },
      AuthUserDTO: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'Session token',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg5MzIyNzUsImV4cCI6MTU5OTAxODY3NSwic3ViIjoiMjJjOTZkN2YtOTliYy00OGVmLThkMGQtODg1MTE3ZTlkYWQ2In0.b8rJxstxRiuLhGNI5o4vJYuLU0Buo4SRk2RICV3WJRY',
          },
          user: {
            $ref: '#/components/schemas/User',
          },
        },
      },
      Complaint: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Complaint id',
            format: 'uuid',
          },

          title: {
            type: 'string',
            description: 'Complaint title',
            example: 'Esgoto a céu aberto',
          },
          description: {
            type: 'string',
            description: 'Complaint description',
            example: 'Existe um esgoto a céu aberto nesta localidade.',
          },
          latitude: {
            type: 'number',
            description: 'Complaint latitude',
            example: -9.6638,
          },
          longitude: {
            type: 'number',
            description: 'Complaint longitude',
            example: -35.7271,
          },
          postalCode: {
            type: 'string',
            description: 'Complaint postal code',
            example: '57025-490',
          },
          country: {
            type: 'string',
            description: 'Complaint country',
            example: 'BR',
          },
          state: {
            type: 'string',
            description: 'Complaint state',
            example: 'Alagoas',
          },
          city: {
            type: 'string',
            description: 'Complaint city',
            example: 'Maceió',
          },
          neighborhood: {
            type: 'string',
            description: 'Complaint neighborhood',
            example: 'Poço',
          },
          street: {
            type: 'string',
            description: 'Complaint street',
            example: 'Rua João Omena de Andrade',
          },
          resolved: {
            type: 'boolean',
            description: 'Complaint resolved',
          },
          userId: {
            type: 'string',
            description: 'User id',
            format: 'uuid',
          },
          createdAt: {
            type: 'string',
            description: 'Complaint creation time',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            description: 'Complaint update time',
            format: 'date-time',
          },
        },
      },

      CreateComplaintDTO: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Complaint title',
            example: 'Esgoto a céu aberto',
          },
          description: {
            type: 'string',
            description: 'Complaint description',
            example: 'Existe um esgoto a céu aberto nesta localidade.',
          },
          latitude: {
            type: 'number',
            description: 'Complaint latitude',
            example: -9.6638,
          },
          longitude: {
            type: 'number',
            description: 'Complaint longitude',
            example: -35.7271,
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  paths: {
    '/users': {
      post: createUser,
    },
    '/sessions': {
      post: createSession,
    },
    '/complaints': {
      get: getComplaints,
      post: createComplaint,
    },
  },
};
