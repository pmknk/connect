import { render } from '@testing-library/react';

import ContentProjectSettings from './project-settings';

describe('ContentProjectSettings', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ContentProjectSettings />);
        expect(baseElement).toBeTruthy();
    });
});
