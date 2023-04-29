import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import InicioSesion from './InicioSesion';



// And in MyWrapper, you would override useSession with your mock:
jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
        session: {
            info: {
                webId: "https://uo271588.inrupt.net/profile/card#me",
                isLoggedIn: false,
            },
        },
    })
}));

describe("LogIn button", () => {
    test('Render Log In button', () => {

        render(<InicioSesion />);
        const boton = screen.getByText("Log In");
        expect(boton).toBeInTheDocument();
    });
});