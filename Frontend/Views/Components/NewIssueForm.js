import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

const NewIssueForm = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setSubmitDisabled(!(title && comment));
  }, [title, comment]);

  // TODO api 분리
  const postIssue = async () => {
    try {
      return await axios.post('http://localhost:3000/api/v1/issues', {
        title,
        comment,
        userId: 1,
        milestoneId: 1,
        labels: [1],
        assignees: [1],
      });
    } catch (e) {
      // TODO 에러 처리 부분
      console.error(e);
    }
  };

  const createIssue = async () => {
    const result = await postIssue();
  };

  const onSubmitIssue = (e) => {
    let isTitle = false;
    let isComment = false;

    if (title.trim() === '') {
      setTitleError(true);
      isTitle = true;
    }
    if (comment.trim() === '') {
      setCommentError(true);
      isComment = true;
    }
    if (isTitle || isComment) {
      return;
    }
    e.preventDefault();
    createIssue();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <input type="text" placeholder="Title" onChange={onChangeTitle} />
      {titleError && <ErrorMessage message="제목을 입력해주세요." />}
      <input
        type="text"
        placeholder="Leave a comment"
        onChange={onChangeComment}
      />
      <input
        placeholder="Attach files by selecting here"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
      />
      {commentError && <ErrorMessage message="본문을 입력해주세요." />}
      <button type="button">Cancel</button>
      <button type="submit" onClick={onSubmitIssue} disabled={submitDisabled}>
        Submit new issue
      </button>
    </>
  );
};

export default NewIssueForm;