
const Comment = ({comments}) => {
  return (
    <div>
        Comments:
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>User {comment.userId}:</strong> {comment.text}
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Comment