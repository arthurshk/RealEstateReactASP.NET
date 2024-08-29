import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyForm from './PropertyForm.jsx';
import '@testing-library/jest-dom/extend-expect';

describe('PropertyForm Component', () => {
    test('renders the form and submits data correctly', () => {
        render(<PropertyForm/>);

        expect(screen.getByLabelText(/Title:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Location:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Image URL:/i)).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Test Property' } });
        fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'A beautiful property.' } });
        fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'New York' } });
        fireEvent.change(screen.getByLabelText(/Price:/i), { target: { value: '500000' } });
        fireEvent.change(screen.getByLabelText(/Image URL:/i), { target: { value: 'http://example.com/image.jpg' } });

        const handleSubmit = jest.fn();
        render(<PropertyForm onSubmit={handleSubmit} />);
        fireEvent.click(screen.getByText(/Add Property/i));

        expect(handleSubmit).toHaveBeenCalled();
    });
});
