import { useState, useEffect } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import {
    createAclFromFallbackAcl,
    getResourceAcl,
    getSolidDatasetWithAcl,
    hasAccessibleAcl,
    hasFallbackAcl,
    hasResourceAcl,
    saveAclFor,
    setAgentDefaultAccess,
    setAgentResourceAccess,
    getAgentAccess
} from "@inrupt/solid-client";
import { read } from "fs";

type AmigoProps = {
    name: string,
    webId: string
}

function Amigo({ name, webId }: AmigoProps): JSX.Element {
    const { session } = useSession();

    const [access, setAccess] = useState(false);


    const getAmigoAccess = async () => {

        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDatasetWithAcl = await getSolidDatasetWithAcl(session.info.webId!.split("/profile")[0] + "/public/map/", { fetch: session.fetch });

        const permisos = getAgentAccess(myDatasetWithAcl, webId)
        
        console.log(permisos);

        if(permisos?.read){
            setAccess(true);
        }else{
            setAccess(false);
        }

        console.log(access);
    }

    useEffect(() => {
        getAmigoAccess();
    }, []);

    async function changePermissions(friendWebId: string) {
        // Fetch the SolidDataset and its associated ACLs, if available:
        const myDatasetWithAcl = await getSolidDatasetWithAcl(session.info.webId!.split("/profile")[0] + "/public/map/", { fetch: session.fetch });

        // Obtain the SolidDataset's own ACL, if available,
        // or initialise a new one, if possible:

        let resourceAcl;

        if (!hasResourceAcl(myDatasetWithAcl)) {
            if (!hasAccessibleAcl(myDatasetWithAcl)) {
                throw new Error(
                    "The current user does not have permission to change access rights to this Resource."
                );
            }
            if (!hasFallbackAcl(myDatasetWithAcl)) {
                throw new Error(
                    "The current user does not have permission to see who currently has access to this Resource."
                );
            }
            resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
        } else {
            resourceAcl = getResourceAcl(myDatasetWithAcl);
        }

        let updatedAcl;

        if (!access) {
            updatedAcl = setAgentResourceAccess(
                resourceAcl,
                friendWebId,
                { read: true, append: false, write: false, control: false }
            );

            updatedAcl = setAgentDefaultAccess(
                updatedAcl,
                friendWebId,
                { read: true, append: false, write: false, control: false }
            )

            setAccess(true);
        } else {
            updatedAcl = setAgentResourceAccess(
                resourceAcl,
                friendWebId,
                { read: false, append: false, write: false, control: false }
            );

            updatedAcl = setAgentDefaultAccess(
                updatedAcl,
                friendWebId,
                { read: false, append: false, write: false, control: false }
            )
            setAccess(false);
        }

        await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: session.fetch });
    }

    return (
        <>
            <div className="amigo">
                <p>{name}</p>
                <button className={access ? "green" : "red"} onClick={async () => {
                    await changePermissions(webId);
                }}></button>
            </div>
        </>
    );
}

export default Amigo;
