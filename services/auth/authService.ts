import { RegisterData, User } from '@/types';

// Centralised auth service to mock external APIs
export const authService = {
  async login(email: string, _password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email,
            fullName: 'Usuario Kambista',
            documentType: 'DNI',
            documentNumber: '12345678',
            phoneNumber: '999999999',
            dateOfBirth: '01/01/1990',
          },
          token: 'mock_jwt_token_12345',
        });
      }, 500);
    });
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: data.email,
            fullName: data.fullName,
            documentType: data.documentType,
            documentNumber: data.documentNumber,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
          },
          token: 'mock_jwt_token_12345',
        });
      }, 500);
    });
  }
};
