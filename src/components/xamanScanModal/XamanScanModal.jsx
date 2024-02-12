import { Modal, Spinner } from 'react-bootstrap';

export default function XamanScanModal({ show, onHide, heading, img, instructions }) {
    return (
        <Modal
            show={show}
            keyboard={false}
            onHide={onHide}
            centered
        >
            <Modal.Body className="custom-modal-body">
                <div className="text-start p-3">
                    <Modal.Title className="fs-2 pb-2">{heading}</Modal.Title>
                    <ul className="list-group list-group-numbered">
                        {instructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="list-group-item ps-0 bg-transparent text-white border-0"
                            >
                                {instruction}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="img-container">
                    {img ? (
                        <img
                            src={img}
                            alt="qrcode"
                            className="p-3"
                        />
                    ) : (
                        <div className="p-4">
                            <Spinner
                                animation="border"
                                variant="primary"
                            />
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}
