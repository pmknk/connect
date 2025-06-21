import React, { ComponentType, ReactNode } from 'react';

/**
 * Renders a React element or component.
 *
 * If the `element` is a component (a function), it creates a React element
 * using the provided `props`. If it's a regular React node (e.g., JSX, string, number),
 * it returns it directly.
 *
 * @param element - A React node or a component type to render.
 * @param props - Optional props to pass if `element` is a component.
 * @returns A rendered React element or the original React node.
 */
export const renderElement = (
    element: ReactNode | ComponentType<any>,
    props?: Record<string, any>
): ReactNode => {
    return typeof element === 'function'
        ? React.createElement(element, props)
        : element;
};
