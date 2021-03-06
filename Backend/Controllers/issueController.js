const { getAllIssues, getIssueById } = require('../Services/issueService');
const { getAllCommentsByIssueId } = require('../Services/commentService');

const getIssues = async (req, res, next) => {
  try {
    const filterData = req.query;
    const issues = await getAllIssues(filterData);
    return res.json(issues);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getSpecifiedIssue = async (req, res, next) => {
  const { issueId } = req.params;
  try {
    const result = await getIssueById(issueId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getCommentsOfSpecifiedIssue = async (req, res) => {
  const { issueId } = req.params;
  try {
    const comments = await getAllCommentsByIssueId(issueId);
    return res.json({ comments });
  } catch (err) {
    return res.status(500).end();
  }
};

module.exports = { getIssues, getSpecifiedIssue, getCommentsOfSpecifiedIssue };
