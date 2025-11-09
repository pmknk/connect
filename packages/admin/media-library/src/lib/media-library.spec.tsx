import { render } from '@testing-library/react';

import ContentMediaLibrary from './admin-media-library';

describe('ContentMediaLibrary', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ContentMediaLibrary />);
        expect(baseElement).toBeTruthy();
    });
});
