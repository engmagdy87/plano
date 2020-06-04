import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import AdminLoginForm from '../components/admin-panel/AdminLoginForm';
import AdminControlPanel from '../components/admin-panel/AdminControlPanel';
import Loading from '../shared/Loading';
import Toast from '../shared/Toast';
import { Store } from '../../store/store';
import { getAdminCookie } from '../../helpers/CookieHelper';
import '../../assets/styles/containers/admin-panel.scss';

export default function AdminPanel() {
  const { state } = useContext(Store);

  const [adminToken, setAdminToken] = useState('');
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [toastData, setToastData] = useState();

  useEffect(() => {
    setToastData(state.toastData);
  }, [state.toastData]);

  useEffect(() => {
    setAdminToken(getAdminCookie());
  }, [state.token]);
  return (
    <div className="admin-panel-wrapper">
      {adminToken === undefined || adminToken === '' ? (
        <AdminLoginForm setShowLoadingSpinner={setShowLoadingSpinner} />
      ) : (
        <AdminControlPanel setShowLoadingSpinner={setShowLoadingSpinner} />
      )}
      <Loading smallLoader showLoadingSpinner={showLoadingSpinner} />
      <Toast {...toastData} />
    </div>
  );
}
