import { serverContentLibrary } from './content-library';

describe('serverContentLibrary', () => {
    it('should work', () => {
        expect(serverContentLibrary()).toEqual('server-content-library');
    });
});
