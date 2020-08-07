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

  const [adminToken, setAdminToken] = useState(getAdminCookie());
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [toastData, setToastData] = useState();

  useEffect(() => {
    setToastData(state.toastData);
  }, [state.toastData]);

  return (
    <div className="admin-panel-wrapper">
      {adminToken === undefined ? (
        <AdminLoginForm
          setShowLoadingSpinner={setShowLoadingSpinner}
          setAdminToken={setAdminToken}
        />
      ) : (
        <AdminControlPanel
          setShowLoadingSpinner={setShowLoadingSpinner}
          setAdminToken={setAdminToken}
        />
      )}
      <Loading
        loader="small"
        showLoadingSpinner={showLoadingSpinner}
        lang={state.lang}
      />
      <Toast {...toastData} />
    </div>
  );
}
