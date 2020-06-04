import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import CustomTooltip from '../../../shared/CustomTooltip';
import DeleteIcon from '../../../../assets/images/admin-delete.svg';
import ShowIcon from '../../../../assets/images/admin-eye.svg';
import AdminsData from '../../../../assets/data/admins.json';
import '../../../../assets/styles/components/admin-control-panel-users.scss';

export default function Settings() {
  const paginationSize = 10;
  const [renderedAdmins, setRenderedAdmins] = useState([]);
  const [windowId, setWindowId] = useState(0);
  const [activeId, setActiveId] = useState(0);
  useEffect(() => {
    setRenderedAdmins(AdminsData.slice(windowId, windowId + paginationSize));
  }, [setRenderedAdmins, windowId]);

  const renderAdmins = () =>
    renderedAdmins.map((admin, index) => (
      <tr key={index}>
        <td>{admin.id}</td>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td>{admin.password}</td>
        <td>
          <CustomTooltip operation="Show">
            <img src={ShowIcon} alt="show admin" />
          </CustomTooltip>
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
    if (Math.ceil(AdminsData.length / paginationSize) === 1) return;
    const pages = [];
    for (let i = 0; i < Math.ceil(AdminsData.length / paginationSize); i++) {
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
        Admin Users <span>({AdminsData.length})</span>
      </h1>
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderAdmins()}</tbody>
      </Table>
      <Pagination size="md">{renderPaginationItems()}</Pagination>
    </div>
  );
}
