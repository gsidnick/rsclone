import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Auth from './Auth';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';

function AuthSignup() {
  const { authStore, modalStore } = useStores();
  const { t } = useTranslation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordPlalceholder = t('Password');
  const emailPlalceholder = t('Email');
  const namePlalceholder = t('Name');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function authButtonHandler() {
    authStore.signup(name, email, password);
    modalStore.closeModal();
  }

  function nameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function emailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function nameKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (emailInputRef.current !== null) emailInputRef.current.focus();
    }
  }

  function emailKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (passwordInputRef.current !== null) passwordInputRef.current.focus();
    }
  }

  function passwordKeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (passwordInputRef.current !== null) passwordInputRef.current.blur();
      authStore.signup(name, email, password);
      modalStore.closeModal();
    }
  }

  return (
    <Modal>
      <Auth>
        <div className="auth__form">
          <h1 className="auth__heading">{t('Sign Up')}</h1>
          <Input
            name="name"
            type="text"
            ref={nameInputRef}
            placeholder={namePlalceholder}
            value={name}
            onChange={nameChangeHandler}
            onKeyDown={nameKeyDownHandler}
          />
          <Input
            name="email"
            type="text"
            ref={emailInputRef}
            placeholder={emailPlalceholder}
            value={email}
            onChange={emailChangeHandler}
            onKeyDown={emailKeyDownHandler}
          />
          <Input
            name="password"
            type="password"
            ref={passwordInputRef}
            placeholder={passwordPlalceholder}
            value={password}
            onChange={passwordChangeHandler}
            onKeyDown={passwordKeyDownHandler}
          />
          <Button className="auth__button" onClick={authButtonHandler}>
            <>{t('Sign Up')}</>
          </Button>
          <Button className="button_back" onClick={() => modalStore.closeModal()}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="button__arrow"
                d="M33 20C34.1046 20 35 19.1046 35 18C35 16.8954 34.1046 16 33 16V20ZM1.58578 16.5858C0.804736 17.3668 0.804736 18.6332 1.58578 19.4142L14.3137 32.1421C15.0948 32.9232 16.3611 32.9232 17.1421 32.1421C17.9232 31.3611 17.9232 30.0948 17.1421 29.3137L5.82843 18L17.1421 6.68629C17.9232 5.90524 17.9232 4.63891 17.1421 3.85786C16.3611 3.07682 15.0948 3.07682 14.3137 3.85786L1.58578 16.5858ZM33 16L3 16V20L33 20V16Z"
                fill="black"
              />
            </svg>
          </Button>
        </div>
      </Auth>
    </Modal>
  );
}

export default observer(AuthSignup);
