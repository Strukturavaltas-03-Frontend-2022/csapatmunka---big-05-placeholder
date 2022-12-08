import { CustomerSumPipe } from './customer-sum.pipe';

describe('CustomerSumPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerSumPipe();
    expect(pipe).toBeTruthy();
  });
});
