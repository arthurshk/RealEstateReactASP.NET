import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import PropertyList from './PropertyList.jsx';

jest.mock('axios');

describe('PropertyList Component', () => {
    test('fetches and displays properties', async () => {
        const properties = [
            { id: 1, title: 'Test Property 1', description: 'A lovely place', location: 'New York', price: 500000, imageUrl: 'http://example.com/image1.jpg' },
            { id: 2, title: 'Test Property 2', description: 'Another lovely place', location: 'Los Angeles', price: 750000, imageUrl: 'http://example.com/image2.jpg' }
        ];

        axios.get.mockResolvedValue({ data: properties });

        render(<PropertyList/>);

        expect(await screen.findByText(/Test Property 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Property 2/i)).toBeInTheDocument();
    });

    test('handles deletion of a property', async () => {
        const properties = [
            { id: 1, title: 'Test Property 1', description: 'A lovely place', location: 'New York', price: 500000, imageUrl: 'http://example.com/image1.jpg' }
        ];

        axios.get.mockResolvedValue({ data: properties });
        axios.delete.mockResolvedValue({});

        render(<PropertyList />);
        expect(await screen.findByText(/Test Property 1/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Delete/i));

        expect(axios.delete).toHaveBeenCalledWith('https://localhost:7014/api/properties/1');
    });
});