import { main } from '@/logic/main/execute';
import { describe, expect, it } from '@jest/globals';

describe('main test', () => {
  it('main', () => {
    const result = main();
    expect(result).toEqual('test');
  });
});