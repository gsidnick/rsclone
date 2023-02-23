import './Page404.css';
import React from 'react';
import Button from '../UI/Button/Button';
import { useTranslation } from 'react-i18next';

function Page404() {
  
  const { t } = useTranslation();

  return (
    <div className="pagenotfound">
      <h1 className="pagenotfound__heading">404</h1>
      <h2 className="pagenotfound__heading">{t('Sorry, this page not found!')}</h2>
      <div className="pagenotfound__monster"/>
      <Button className="" to="/">
        <>{t('Go home')}</>
      </Button>
    </div>
  );
}

export default Page404;
