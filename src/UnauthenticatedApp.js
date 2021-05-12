import * as React from "react";
import { Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LoginForm } from "./features/user/LoginForm";
import { RegisterForm } from "./features/user/RegisterForm";
import { login } from "./features/user/userSlice";


export default function UnauthenticatedApp() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(true);

  const handleToggle = () => {
    setShowLogin((p) => !p);
  };

  let content = null;

  if (showLogin) {
    content = (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSubmit={(form) => dispatch(login(form))}></LoginForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-link" onClick={handleToggle}>
            Register
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  } else {
    content = (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm></RegisterForm>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" class="btn btn-link" onClick={handleToggle}>
            Login
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  return (
    <div>
      <Container css={{display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
        <div css={{
          display: 'flex',
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <i className="fas fa-sticky-note h1"></i>
          <h1 className="ml-2">Notes Keeper</h1>
        </div>
        <div css={{width: '100%'}}>{content}</div>
      </Container>
    </div>
  );
}
