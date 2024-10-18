// feature
import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import '../../assets/css/components/imageUpload.scss';

const ImageUpload = ({ onSave }) => { // onSave prop 추가
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageChange = (file) => {
        if (file) {
            const newFile = {
                name: file.name,
                url: URL.createObjectURL(file),
            };
            setFiles((prevFiles) => [...prevFiles, newFile]);
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        selectedFiles.forEach(file => handleImageChange(file));
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSaveClick = () => {
        // 파일 저장 로직이 필요하다면 여기에 추가
        onSave(); // 부모 컴포넌트의 onSave 호출
    };

    return (
        <Container className="converter-container">
            <div className="files-container">
                <div className="files-container-box">
                    <div className="data-table-wrapper">
                        <table className="data-table2 dt-files">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>파일명</th>
                                    <th>작업</th>
                                </tr>
                            </thead>
                            <tbody className="dt-body">
                                {files.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">업로드된 파일이 없습니다.</td>
                                    </tr>
                                ) : (
                                    files.map((file, index) => (
                                        <tr className="dt-row" key={index}>
                                            <td className="dt-col">{index + 1}</td>
                                            <td className="dt-col">
                                                <span>{file.name}</span>
                                            </td>
                                            <td className="dt-col text-right">
                                                <button className="btn-close" onClick={() => removeFile(index)}>X</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                <tr>
                                    <td colSpan="2" className="text-right">
                                        <button className="btn btn-sm btn-light" onClick={handleAddFileClick}>
                                            파일 추가
                                        </button>
                                        <input 
                                            type="file" 
                                            id="pc-upload-add" 
                                            name="pc-upload" 
                                            multiple 
                                            className="file-input" 
                                            style={{ display: 'none' }} 
                                            ref={fileInputRef} 
                                            onChange={handleFileInputChange} 
                                        />
                                    </td>
                                    <td className="text-right">
                                        {files.length > 0 && (
                                            <button className="btn btn-primary" onClick={handleSaveClick}>저장하기</button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired, // prop 타입 정의
};

export default ImageUpload;
