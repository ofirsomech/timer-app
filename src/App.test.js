import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Timer from "./components/Timer/Timer";
import ContainerTimer from "./components/ContainerTimer/ContainerTimer";

describe('Timer', () => {
    test('timer can be reset', () => {
        const initialTime = 60;
        render(<Timer initialTime={initialTime} id={'timer1'}/>);
        const resetButton = screen.getByText('Reset timer');

        fireEvent.click(resetButton);
        const timeLeft = screen.getByText('1');

        expect(timeLeft).toBeInTheDocument();
    });
});


describe('ContainerTimer', () => {
    test('ContainerTimer displays "Get your seat to mars" text', () => {
        render(<ContainerTimer/>);
        const text = screen.getByText('Get your seat to mars');

        expect(text).toBeInTheDocument();
    });
});

