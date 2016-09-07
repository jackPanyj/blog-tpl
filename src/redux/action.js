import marked from 'marked'
const fetchUserInfoEnd = 'FETCH_USER_INFO_END'
const fetchIssueEnd = 'FETCH_ISSUE_END'
const url = 'https://api.github.com/'
function fetchUserInfo() {
  return dispatch => {
    fetch(`${url}jackpanyj`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: fetchUserInfoEnd,
        data
      })
    })
    .catch(err => console.log(err))
  }
}

function fetchIssue() {
  return dispatch => {
    fetch(`${url}repos/jackpanyj/learning-note/issues`)
    .then(res => res.json())
    .then(blogs => {
      blogs.forEach((val, index) => {
        let content = marked(val.body)
        blogs[index].content = content
        setTimeout(() => {
          $('pre code').each(function(i, block) {
            window.hljs.highlightBlock(block);
          });
        }, 1000)
      })
      dispatch({
        type: fetchIssueEnd,
        blogs
      })
    })
  }
}

export {fetchUserInfo, fetchUserInfoEnd, fetchIssue, fetchIssueEnd}