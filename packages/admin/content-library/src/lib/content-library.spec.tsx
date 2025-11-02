import { render } from '@testing-library/react';

import ContentContentLibrary from './content-library';

describe('ContentContentLibrary', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ContentContentLibrary />);
        expect(baseElement).toBeTruthy();
    });
});
