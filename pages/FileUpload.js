import React, { useState, useEffect } from "react";

const FileUpload = () => {
    const [file, setFile] = useState("");
    const onFileChange = (e) => {
    setFile(e.target.files[0]);
    }
    const uploadFile = () => {
    
    }
    return(
        <form>
            <label className="block text-gray-700 mb-2 heading" for="file-selector">
            upload file:
            </label>
            <label for="file-selector" className="custom-file-upload">
            choose a file +
            </label>
            <input type="file" id="file-selector" onChange={onFileChange}/>
            {/*<input type="button" id="upload" value="Upload" onClick={uploadFile} />*/}
            <button
                className="submit-btn hover:bg-gray-700 mb-4 font-medium py-2 px-4 rounded-lg min-w-fit w-1/6 md:w-1/8 lg:w-1/12"
                onClick={uploadFile}>
                Submit
            </button>
        </form>
    )
}
export default FileUpload; 