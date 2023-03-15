import { useEffect, useState } from "react";
import { LoginButton, SessionProvider } from "@inrupt/solid-ui-react";
import { Button, Container, FormGroup, TextField } from "@mui/material";

const LoginPage = () => {
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);

    return (
        <SessionProvider sessionId="log-in-example">
            <LoginButton 
                oidcIssuer={idp}
                redirectUrl={window.location.href}
            />
        </SessionProvider>
    );
}

export default LoginPage;