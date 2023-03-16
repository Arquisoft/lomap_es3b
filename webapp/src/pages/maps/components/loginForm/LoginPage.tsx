import { useState } from "react";
import { LoginButton, SessionProvider, LogoutButton } from "@inrupt/solid-ui-react";

const LoginPage = () => {
    const [idp, setIdp] = useState("https://inrupt.net");

    return (
        <>
            <input type="url" value={idp} onChange={(e) => setIdp(e.target.value)} />
            <LoginButton
                oidcIssuer={idp}
                redirectUrl={"http://localhost:3000/map"}
                onError={console.log}
            />
            <LogoutButton onError={console.log} />
        </>
    );
}

export default LoginPage;