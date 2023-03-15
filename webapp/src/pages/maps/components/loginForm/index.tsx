import { useState, useEffect } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import {
  makeStyles,
  createStyles,
} from "@inrupt/prism-react-components";
import { Button, TextField } from "@material-ui/core";
import { useBem } from "@solid/lit-prism-patterns";
import styles from "./styles";
import config from "../../../../../config";

const useStyles = makeStyles((theme: any) => createStyles(styles(theme)));
const CONFIG = config();

export default function LoginForm() {
  const [idp, setIdp] = useState<string>("https://broker.pod.inrupt.com");
  const [currentUrl, setCurrentUrl] = useState<string>("https://localhost:3000");
  const bem = useBem(useStyles());
  const classes = useStyles();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <div className={classes.loginFormContainer}>
      <TextField
        id="idp"
        label="IDP"
        placeholder="Email"
        defaultValue={idp}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdp(e.target.value)}
        InputProps={{
          endAdornment: (
            <LoginButton
              authOptions={{ clientName: CONFIG.demoTitle }}
              oidcIssuer={idp}
              redirectUrl={currentUrl}
              onError={console.error}
            >
              <Button
                variant="contained"
              >
                Log In
              </Button>
            </LoginButton>
          )
        }}
      />
    </div>
  );
}