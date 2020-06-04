import React, { useContext, useState, useEffect } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { Store } from '../../../../store/store';
import { formatDate } from '../../../../helpers/DatesHelper';
import DeleteIcon from '../../../../assets/images/admin-delete.svg';
import ShowIcon from '../../../../assets/images/admin-eye.svg';
import types from '../../../../store/types';
import '../../../../assets/styles/components/admin-control-panel-users.scss';
import DeleteUserDialog from '../../dialogs/DeleteUserDialog';
import CustomTooltip from '../../../shared/CustomTooltip';
export default function Users({ setShowUserDetails }) {
  const paginationSize = 10;
  const { state, dispatch } = useContext(Store);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [windowId, setWindowId] = useState(0);
  const [activeId, setActiveId] = useState(0);
  const [userId, setUserId] = useState(-1);
  const [showDialogFlag, setShowDialogFlag] = useState(false);

  useEffect(() => {
    setRenderedUsers(state.users.slice(windowId, windowId + paginationSize));
  }, [setRenderedUsers, state.users, windowId]);

  const redirectToUserDetails = (user) => {
    dispatch({
      type: types.panel.SET_SELECTED_USER,
      payload: user,
    });
    setShowUserDetails(true);
  };

  const renderUsers = () =>
    renderedUsers.map((user, index) => (
      <tr key={index}>
        <td>UNDEFINED</td>
        <td>{user.email || user.phone}</td>
        <td>{user.name}</td>
        <td>
          {user.joined_at !== '' ? formatDate(new Date(user.joined_at)) : ''}
        </td>
        <td>
          {user.last_login_at !== ''
            ? formatDate(new Date(user.last_login_at))
            : ''}
        </td>
        <td>
          <CustomTooltip operation="Show">
            <img
              src={ShowIcon}
              alt="show user"
              onClick={() => redirectToUserDetails(user)}
            />
          </CustomTooltip>
          <CustomTooltip operation="Delete">
            <img
              src={DeleteIcon}
              alt="delete user"
              onClick={() => {
                setShowDialogFlag(true);
                setUserId(user.id);
              }}
            />
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
    const pages = [];
    for (let i = 0; i < Math.ceil(state.users.length / paginationSize); i++) {
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
        Users <span>({state.users.length})</span>
      </h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Status</th>
            <th>Account ID</th>
            <th>Name</th>
            <th>Join Date</th>
            <th>Last Login Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </Table>
      <Pagination size="md">{renderPaginationItems()}</Pagination>
      <DeleteUserDialog
        showDialogFlag={showDialogFlag}
        resetShowDialogFlag={setShowDialogFlag}
        userId={userId}
      />
    </div>
  );
}
