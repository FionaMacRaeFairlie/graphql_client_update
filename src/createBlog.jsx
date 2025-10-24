import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';

const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $author: String!) {
    addNewBlog(title: $title, content: $content, author: $author) {
      title
      content
      author
      id
    }
  }
`;

const CreateBlog = () => {
  const [addNewBlog, { data, loading, error }] = useMutation(CREATE_BLOG);
   const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
        <h1>Add a blog post here</h1>
        <form
          className="form-group"
          onSubmit={(e) => {
            e.preventDefault();
             addNewBlog({ variables: { title,content, author } });
            setTitle("");
            setContent("");
            setAuthor("");
          }}
        >
          <label> Add title here</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label> Add a new post here</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label> and the author name here</label>
          <input
            className="form-control"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Button type="submit" className="btn btn-primary">
            Add Post
          </Button>
        </form>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default CreateBlog;
