import { AuthorityGuard } from './authority.guard';

describe('AuthorityGuard', () => {
  it('should be defined', () => {
    expect(new AuthorityGuard()).toBeDefined();
  });
});
