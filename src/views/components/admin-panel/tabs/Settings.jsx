import React, { useState, useEffect, useContext } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import CustomTooltip from '../../../shared/CustomTooltip';
import DeleteIcon from '../../../../assets/images/admin-delete.svg';
// import ShowIcon from '../../../../assets/images/admin-eye.svg';
// import state.admins from '../../../../assets/data/admins.json';
import { panelActions } from '../../../../store/actions';
import { Store } from '../../../../store/store';
import '../../../../assets/styles/components/admin-control-panel-users.scss';
import { getAdminCookie } from '../../../../helpers/CookieHelper';

export default function Settings({ setShowLoadingSpinner }) {
  const paginationSize = 10;
  const { state, dispatch } = useContext(Store);
  const [renderedAdmins, setRenderedAdmins] = useState([]);
  const [windowId, setWindowId] = useState(0);
  const [activeId, setActiveId] = useState(0);
  useEffect(() => {
    setRenderedAdmins(state.admins.slice(windowId, windowId + paginationSize));
  }, [setRenderedAdmins, state.admins, windowId]);

  useEffect(() => {
    async function fetchAdmins() {
      setShowLoadingSpinner(true);
      await panelActions.listAllAdmins(dispatch);
      setShowLoadingSpinner(false);
    }
    const token = getAdminCookie();
    if (token) fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAdmins = () =>
    renderedAdmins.map((admin, index) => (
      <tr key={index}>
        <td>{admin.id}</td>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td>
          <CustomTooltip operation="Delete">
            <img src={DeleteIcon} alt="delete admin" />
          </CustomTooltip>
        </td>
      </tr>
    ));

  const setPaginationIndex = (i) => {
    setActiveId(i);
    if (i === 0) setWindowId(0);
    else setWindowId(i * paginationSize);
  };

  const renderPaginationItems = () => {
    if (Math.ceil(state.admins.length / paginationSize) === 1) return;
    const pages = [];
    for (let i = 0; i < Math.ceil(state.admins.length / paginationSize); i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === activeId}
          onClick={() => setPaginationIndex(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <div className="admin-panel-users-wrapper">
      <h1>
        Admin Users <span>({state.admins.length})</span>
      </h1>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderAdmins()}</tbody>
      </Table>
      <Pagination size="md">{renderPaginationItems()}</Pagination>
    </div>
  );
}
