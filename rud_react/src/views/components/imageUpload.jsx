import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { Container, Table, Button } from 'reactstrap';
import axios from 'axios';
import '../../assets/css/components/imageUpload.scss';

const ImageUpload = ({ onSave }) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles); // 파일 객체를 직접 추가
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSaveClick = async () => {
        if (files.length === 0) {
            alert("업로드할 파일이 없습니다.");
            return;
        }

        const formData = new FormData();
        files.forEach(file => {
            console.log("Appending file:", file.name);  // 추가된 로그
            formData.append('file', file); // 파일 객체를 직접 추가
        });

        try {
            const response = await axios.post('http://192.168.34.18:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload Success:', response.data);
            onSave(); // 부모 컴포넌트의 onSave 호출
        } catch (error) {
            console.error('Upload Error:', error);
            alert("파일 업로드 실패: " + (error.response ? error.response.data.error : "서버 오류"));
        }
    };

    return (
        <Container className="converter-container">
            <div className="files-container">
                <div className="files-container-box">
                    <div className="data-table-wrapper">
                        <Table className="data-table2 dt-files" striped>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>파일명</th>
                                    <th>작업</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="text-center">업로드된 파일이 없습니다.</td>
                                    </tr>
                                ) : (
                                    files.map((file, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{file.name}</td>
                                            <td className="text-right">
                                                <Button className="btn-close" onClick={() => removeFile(index)}>X</Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                <tr>
                                    <td className="text-right">
                                        <Button color="light" size="sm" onClick={handleAddFileClick}>
                                            파일 추가
                                        </Button>
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
                                    <td/>
                                    <td className="text-right">
                                        {files.length > 0 && (
                                            <Button color="primary" onClick={handleSaveClick}>저장하기</Button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Container>
    );
};

ImageUpload.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default ImageUpload;
