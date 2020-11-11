import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import IssueList from '../Components/IssueList/IssueList';

const issuesReducer = (issues, { type, data }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'setInitial':
      return data;
  }
};

const reloadReducer = (reload, { type }) => {
  // eslint-disable-next-line default-case
  switch (type) {
    case 'setInitial':
      return true;
    case 'switch':
      return !reload;
  }
};

export const IssuesContext = React.createContext();
export const ReloadContext = React.createContext();

const IssuesPage = () => {
  const [issues, issuesDispatch] = useReducer(issuesReducer, []);
  const [reload, reloadDispatch] = useReducer(reloadReducer, []);

  useEffect(async () => {
    const ISSUE_URL = `${process.env.API_URL}/${process.env.API_VERSION}/issues`;
    const queryString = window.location.search;

    try {
      const issueResolve = await axios.get(`${ISSUE_URL}${queryString}`, { withCredentials: true });
      issuesDispatch({ type: 'setInitial', data: issueResolve.data });
      reloadDispatch({ type: 'setInitial' });
    } catch (err) {
      window.location.href = process.env.WEB_URL;
    }
  }, [reload]);

  useEffect(() => {
    const reloadWhenPopstate = () => reloadDispatch({ type: 'switch' });
    window.addEventListener('popstate', reloadWhenPopstate);
    return () => window.removeEventListener('popstate', reloadWhenPopstate);
  }, []);

  return (
    <div>
      <ReloadContext.Provider value={{ reloadDispatch }}>
        <IssuesContext.Provider value={{ issues, issuesDispatch }}>
          <IssueList />
        </IssuesContext.Provider>
      </ReloadContext.Provider>
    </div>
  );
};

export default IssuesPage;
