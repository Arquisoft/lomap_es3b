import React, { useState } from "react";
import { Session } from "@inrupt/solid-client-authn-browser";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";
import { SolidDataset, getSolidDataset } from "@inrupt/solid-client";
import "./LoginForm.css";

const identityProviderUrl = "proveedor de identidad (supongo que inrupt)";
const userProfileUrl = "enlace al pod";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /** 
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const session = new Session();
    try {
      await session.login({
        oidcIssuer: identityProviderUrl,
        redirectUrl: window.location.href,
        handleRedirect: true,
        clientName: "My Inrupt App",
        username,
        password,
      });

      const fetchOptions = session.fetch(getFetch);
      const response = await fetch(userProfileUrl, fetchOptions);
      const profile = await response.text();

      console.log(profile);
    } catch (error) {
      setError("Failed to log in");
    }
  }*/

  const handleLogin = async () => {
    try {
      const session = getDefaultSession();
      const fetcher = session.fetch.bind(session);
      const response = await fetcher(username);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataset = await getSolidDataset(username, { fetch: fetcher });
      const profile = FOAF.getPerson(dataset, username);

      setUsername(FOAF.name.get(profile));
      setPassword(VCARD.hasPhoto.get(profile));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
