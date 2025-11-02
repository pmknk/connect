import { render } from '@testing-library/react';

import ContentProjectInsights from './project-insights';

describe('ContentProjectInsights', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ContentProjectInsights />);
        expect(baseElement).toBeTruthy();
    });
});
