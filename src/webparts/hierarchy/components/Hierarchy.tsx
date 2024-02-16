import * as React from "react";
import { useState } from "react";
import { Upload, Select, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FileUpload } from "../../../helpers/Service";
import { IHierarchyProps } from "./IHierarchyProps";
import styles from "./Hierarchy.module.scss";
import "antd/dist/reset.css";

const { Option } = Select;

export default function Hierarchy(props: IHierarchyProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setSelectedFile(file);
    }
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedFolder(""); // Reset the selected folder when department changes
  };

  const handleFolderChange = (value: string) => {
    setSelectedFolder(value);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await FileUpload(selectedFile, selectedDepartment, selectedFolder);
    }
  };

  // Define folder options based on the selected department
  const folderOptions = () => {
    switch (selectedDepartment) {
      case "HR":
        return ["Payroll, recruitment"];
      case "Admin":
        return ["Policy, others"];
      case "Management":
        return ["Project", "Employee", "Manager"];
      case "Sales":
        return ["Report, Target"];
      default:
        return [];
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerBox}>Folder Hierarchy</div>
        <form style={{ padding: "30px 20px" }}>
          <table>
            <tr>
              <td>
                <label htmlFor="Departmentlists">Choose Department</label>
              </td>
              <td>
                <Select
                  id="Departmentlists"
                  onChange={handleDepartmentChange}
                  value={selectedDepartment}
                  style={{ width: 200 }}
                >
                  <Option value="" disabled>
                    Select your choice
                  </Option>
                  <Option value="HR">HR</Option>
                  <Option value="Admin">Admin</Option>
                  <Option value="Management">Management</Option>
                  <Option value="Sales">Sales</Option>
                </Select>
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="Folderlists">Choose Folder</label>
              </td>
              <td>
                <Select
                  id="Folderlists"
                  onChange={handleFolderChange}
                  value={selectedFolder}
                  style={{ width: 200 }}
                >
                  <Option value="" disabled>
                    Select your choice
                  </Option>
                  {folderOptions().map((folderOption, index) => (
                    <Option key={index} value={folderOption}>
                      {folderOption}
                    </Option>
                  ))}
                </Select>
              </td>
            </tr>
            {/* Add an Upload component for file selection */}
            <tr>
              <td>
                <Upload onChange={handleFileChange} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined rev={undefined} />}>
                    Select File
                  </Button>
                </Upload>
              </td>
              <td>
                <Button type="primary" onClick={handleUpload}>
                  Upload
                </Button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}
