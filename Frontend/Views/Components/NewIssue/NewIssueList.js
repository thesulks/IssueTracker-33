import React from 'react';
import styled from 'styled-components';

const NewIssueListWrapper = styled.div`
  border: 1px solid var(--border-gray);
  border-radius: 5px;
  position: absolute;
  right: 0px;
  width: 105%;
  z-index: 1;
  background-color: white;
  overflow: hidden;
`;

const ListItem = styled.div`
  border-bottom: 1px solid var(--border-gray);
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: var(--tab-blue);
    color: var(--font-white);
  }
  padding: 5px 10px;
  cursor: pointer;
`;

const NewIssueList = ({ selected, setSelected, data }) => {
  const onUpdateSelection = (e, row) => {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      setSelected(selected.filter((elem) => elem !== row));
    } else {
      setSelected([...selected, row]);
      e.target.classList.add('selected');
    }
  };

  return (
    <NewIssueListWrapper>
      {data.map((row) => (
        <ListItem key={row.id} onClick={(e) => onUpdateSelection(e, row)}>
          {row.username || row.name || row.title}
        </ListItem>
      ))}
    </NewIssueListWrapper>
  );
};

export default NewIssueList;
