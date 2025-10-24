export const Blog = ({ title,content, author, id }) => {
  return (
    
    <div key={id} className="card" style={{ width: "75rem" }}>
      <div className="card-header"> <h3>{title} </h3></div>
      <div className="card-body">
        <p className="card-text">{content}</p>
        <div className ="card-footer text-muted"> A post from {author}</div>
      </div>
    </div>
  );
};
