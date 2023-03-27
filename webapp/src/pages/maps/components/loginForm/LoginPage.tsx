import { useEffect, useState } from "react";
import { LoginButton, SessionProvider, LogoutButton } from "@inrupt/solid-ui-react";
import { Button, Container, FormGroup, TextField } from "@mui/material";

const LoginPage = () => {
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [setCurrentUrl]);

    return (
        <SessionProvider sessionId="login" onError={console.log} restorePreviousSession>
            <LoginButton 
                oidcIssuer={idp}
                redirectUrl={window.location.href}
            />
            <LogoutButton onError={console.log} />
        </SessionProvider>
    );
}

export default LoginPage;