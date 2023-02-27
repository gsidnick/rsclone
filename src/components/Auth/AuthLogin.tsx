import './Auth.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useStores from '../../hooks/useStores';
import { useTranslation } from 'react-i18next';
import ILoginFormInput from '../../interfaces/ILoginFormInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function AuthLogin() {
  const { authStore, modalStore } = useStores();
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordPlalceholder = t('Password');
  const emailPlalceholder = t('Email');

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required field')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Email should have correct format'),
    password: yup.string().required('Password is required field'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  function onSubmit(data: ILoginFormInput) {
    authStore.login(data.email, data.password);
    modalStore.closeModal();
  }

  function emailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="form__heading">Log In</h1>
      <Input
        {...register('email')}
        name="email"
        type="text"
        placeholder={emailPlalceholder}
        value={email}
        onChange={emailChangeHandler}
        error={!!errors.email}
        errorText={errors?.email?.message}
      />
      <Input
        {...register('password')}
        name="password"
        type="password"
        placeholder={passwordPlalceholder}
        value={password}
        onChange={passwordChangeHandler}
        error={!!errors.password}
        errorText={errors?.password?.message}
      />
      <Button className="form__button" type="submit">
        <>{t('Log In')}</>
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
    </form>
  );
}

export default observer(AuthLogin);
