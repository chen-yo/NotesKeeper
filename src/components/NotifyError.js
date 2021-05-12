import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { errorsActions } from "../store/errorsSlice";

export function NotifyError({ error }) {
  const dispatch = useDispatch();
  const { unhandled } = useSelector((state) => state.errors);
  
  const handleClose = () => {
    dispatch(errorsActions.setUnhandled(null));
  };

  if(!unhandled) return null

  return (
    <>
      <Modal show={true} onHide={handleClose} animation={true}>
        <Modal.Header closeButton className="text-danger">
          <Modal.Title>Oops, an error occured</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text">
          <p className="text-uppercase">Status code: {unhandled.statusCode}</p>
          <p className="text-muted fw-light">{unhandled.message}</p>
          <p className="text-muted fw-light pre">{JSON.stringify(unhandled, null, 2)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
