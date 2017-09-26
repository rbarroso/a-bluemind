import { IssuesByProjectNamePipe } from './issues-by-project-name.pipe';

describe('IssuesByProjectNamePipe', () => {
  it('create an instance', () => {
    const pipe = new IssuesByProjectNamePipe();
    expect(pipe).toBeTruthy();
  });
});
