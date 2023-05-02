import { Session } from "@inrupt/solid-client-authn-browser";
import { createContainerAt, saveFileInContainer } from "@inrupt/solid-client";
import { getFile, isRawData, getContentType, getSourceUrl } from "@inrupt/solid-client";
import { MapType} from "../shared/shareddtypes";

export async function addMapPOD(session: Session, name: string, file: File, url: string) {
  try {

    //Comprobamos si existe la carpeta de mapas en el POD
    const fet = session.fetch;
    try{
      await getFile(
        url,
        { fetch: fet }
      );
    }catch(error){
      
      //En el caso de que la carpeta no exista la creamos para poder añadir los nuevos mapas
      await createContainerAt(url, { fetch: fet });
    }
  } catch (error) {
  }

  //Una vez que o bien la carpeta existe o bien la hemos creado añadimos el nuevo mapa o el mapa modificado
  try {
    await saveFileInContainer(url, file, {
      slug: file.name,
      contentType: file.type,
      fetch: session.fetch
    });
  } catch (error) {
    console.log("Problema al guardar datos en el POD")
  }
}

export async function getMapsPOD(session: Session, url: string): Promise<MapType[]> {
    let mapas:MapType[]=[];
    let map: MapType;
    if (session.info.isLoggedIn) {

      //Buscamos los elementos hijos del contenedor
      const fet = session.fetch;
      const file = await getFile(
        url,               // File in Pod to Read
        { fetch: fet }       // fetch from authenticated session
      );

      let fileText = await file.text()

      //Buscamos los mapas guardados

      var nombreMapas:string[] = []

      if(fileText.includes("ldp:contains")){
        nombreMapas = fileText.split("ldp:contains")[1].split(";")[0].replaceAll(">", "").replaceAll("<", "").replaceAll(" ", "").split(",");
      }
      

      //Si no hay ningun mapa devolvemos directamente un array vacio
      //En el caso de que exista algun mapa entonces cojemos y sacamos la informacion de cada mapa y lo añadimos a la lista de mapas a devolver

      if(nombreMapas.length === 0){
        return [];
      }else{
        for (var i = 0; i < nombreMapas.length; i++) {
          map = await readFileFromPod(url + nombreMapas[i], session, nombreMapas[i]);
          if (map) {
            mapas.push(map);
          }
        }
      }
    }
    return Promise.resolve(mapas);
}

async function readFileFromPod(fileURL: string, session: Session, name:string):Promise<MapType> {
  try {
    const fet = session.fetch;
    const file = await getFile(
      fileURL,               // File in Pod to Read
      { fetch: fet }       // fetch from authenticated session
    );

    let fileText = await file.text()
    let fileInfo = JSON.parse(fileText);

    console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`);
    console.log(`The file is ${isRawData(file) ? "not " : ""}a dataset.`);

    return fileInfo;

  } catch (err) {
    return Promise.reject();
  }
}
