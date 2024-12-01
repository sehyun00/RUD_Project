// imageUploadModal.jsx
import React from "react";
import PropTypes from 'prop-types';
import Modal from 'react-modal'; 

// scss
import '../../assets/css/componentItems/imageUploadModal.scss';

// images
import gofullpagetestImage from '../../assets/images/gofullpagetest.png';
import cash_blurImage from '../../assets/images/cash_blur.png';
import stocks_blurImage from '../../assets/images/stocks_blur.png';

Modal.setAppElement('#root');

const ImageUploadModal = ({isModalOpen, toggleModal, }) => {
    return (

        <Modal
            className="info-container"
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            contentLabel="안내 메시지"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={false}
            tabIndex="-1">
            <div className="info-content">
                <div className="info-body">
                    <h2>도움말</h2>
                    <p>
                        1. chrome 웹 스토어에서{' '}
                        <a
                            href="https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl?hl=ko&utm_source=ext_sidebar"
                            target="_blank"
                            rel="noopener noreferrer">
                            Gofullpage
                        </a>
                        확장 프로그램 설치{' '}
                        <a
                            href="https://microsoftedge.microsoft.com/addons/detail/gofullpage-full-page-sc/hfaciehifhdcgoolaejkoncjciicbemc?refid=bingshortanswersdownload"
                            target="_blank"
                            rel="noopener noreferrer">
                            (Edge 브라우저)
                        </a>
                    </p>
                    <br/>
                    <p>
                        2. 원하는 페이지에서 우측 상단 확장프로그램 모음 → gofullpage 아이콘을 클릭 후 Download image (PNG)로 캡쳐
                    </p><br/>
                    <img className="info-image-1" src={gofullpagetestImage} alt="도움말 이미지 1"/>
                    <br/>
                    <br/>
                    <p>
                        3. 내 계좌 → 자산 페이지에서 우측 사이드 바 닫은 후 캡쳐.
                    </p><br/>
                    <img className="info-image-2" src={cash_blurImage} alt="도움말 이미지 2"/>
                    <br/>
                    <br/>
                    <p>
                        4. 우측 사이드 바 → 내 투자 페이지에서 사이드 바 닫은 후 캡쳐
                    </p><br/>
                    <img className="info-image-3" src={stocks_blurImage} alt="도움말 이미지 3"/>
                </div>
                <button className="info-button" onClick={toggleModal}>확인</button>
            </div>
        </Modal>
    )
}

ImageUploadModal.propTypes = {
    classes: PropTypes.object
};
export default ImageUploadModal;
