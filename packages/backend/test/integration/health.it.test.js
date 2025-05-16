import { checkApiHealth } from './api.client.js';

describe('Health Check Integration Tests', () => {
  test('should be up', async () => {
    const {status, body} = await checkApiHealth();
    expect(status).toBe(200);
    expect(body).toHaveProperty('status', 'UP');
    expect(body).toHaveProperty('environment', 'test');
    expect(body).toHaveProperty('version');
  });
});