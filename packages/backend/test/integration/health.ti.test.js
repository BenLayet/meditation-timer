import { describe, it, expect } from 'vitest';
import fetch from 'node-fetch';
import { HEALTH_API_URL } from './ti-config.js';

describe('Health Check Integration Tests', () => {
  it('should be up', async () => {
    const response = await fetch(HEALTH_API_URL, { method: 'GET' });
    const health = await response.json();
    expect(health).toHaveProperty('status', 'UP');
  });
});