//Without conditional statement
// import "@pnp/sp/webs";
// import "@pnp/sp/folders";
// import { addSP } from "../helpers/Pnpconfig";

// export async function FileUpload(file: File, departmentSelection: string, folderSelection: string) {
//   try {
//     const sp = addSP();

//     // Specify the document library name (Hierarchy) in the path
//     const documentLibraryName = "Hierarchy";
//     const folderPath = `${documentLibraryName}/${departmentSelection}/${folderSelection}`;

//     try {
//       // Attempt to get the folder to check its existence
//       await sp.web.getFolderByServerRelativePath(folderPath).getItem();
//     } catch (error) {
//       // If the folder doesn't exist, create it
//       await sp.web.folders.addUsingPath(folderPath);
//     }

//     // Upload the file to the specified folder
//     const result = await sp.web.getFolderByServerRelativePath(folderPath).files.addUsingPath(file.name, file, { Overwrite: true });
//     console.log(`Result of file upload: ${JSON.stringify(result)}`);
//   } catch (error) {
//     console.error("Error during file upload:", error);
//   }
// }

//With conditional statement
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import { addSP } from "../helpers/Pnpconfig";

export async function FileUpload(
  file: File,
  departmentSelection: string,
  folderSelection: string
) {
  try {
    const sp = addSP();
    const documentLibraryName = "HierarchyDocuments";
    const mainFolderPath = `${documentLibraryName}/${departmentSelection}`;
    const folderPath = `${mainFolderPath}/${folderSelection}`;

    // Check if the main folder exists
    let mainFolderExists = true;
    try {
      await sp.web.getFolderByServerRelativePath(mainFolderPath).getItem();
    } catch (error) {
      mainFolderExists = false;
      // console.error("Error checking main folder existence:", error);
    }

    // console.log("Main folder exists:", mainFolderExists);

    // If the main folder doesn't exist, create it
    if (!mainFolderExists) {
      console.log("Creating main folder...");
      try {
        await sp.web.folders.addUsingPath(mainFolderPath);
        // console.log("Main folder created.");
      } catch (error) {
        // console.error("Error creating main folder:", error);
        return;
      }
    }

    // Check if the subfolder exists
    let folderExists = true;
    try {
      await sp.web.getFolderByServerRelativePath(folderPath).getItem();
    } catch (error) {
      folderExists = false;
      // console.error("Error checking folder existence:", error);
    }

    console.log("Subfolder exists:", folderExists);

    // If the subfolder doesn't exist, create it
    if (!folderExists) {
      console.log("Creating subfolder...");
      try {
        await sp.web.folders.addUsingPath(folderPath);
        // console.log("Subfolder created.");
      } catch (error) {
        // console.error("Error creating subfolder:", error);
        return;
      }
    }

    // Upload the file
    const result = await sp.web
      .getFolderByServerRelativePath(folderPath)
      .files.addUsingPath(file.name, file, { Overwrite: true });
    console.log(`Result of file upload: ${JSON.stringify(result)}`);
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}
