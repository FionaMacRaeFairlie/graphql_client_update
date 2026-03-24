import { useState } from "react";
import { useSubscription } from "@apollo/client/react";
import { gql } from "@apollo/client";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { useMutation } from "@apollo/client/react";
import Button from "react-bootstrap/Button";

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

const UPDATE_BLOGS_SUBSCRIPTION = gql`
  subscription BlogStream {
    newBlog {
      content
      id
      author
      title
    }
  }
`;
const CreateBlog = () => {
  const [addNewBlog, { data, loading, error }] = useMutation(CREATE_BLOG);
  const [blogUpdate, setBlogUpdate] = useState([]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const showAlert = () => {
    setShow(true);
  };

  const { loading_ws, error_ws, data_ws } = useSubscription(
    UPDATE_BLOGS_SUBSCRIPTION,
    {
      onData: (data_ws) => {
        setBlogUpdate(data_ws.data.data.newBlog);
        showAlert();
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (error_ws) return <p>Error : {error.message}</p>;

  return (
    <div>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={show} onClose={toggleShow} autohide delay={9000}>
          <Toast.Header>
            <strong className="me-auto">New Post by {blogUpdate.author}</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>
            <p>new blog post added</p>
            <p>{blogUpdate.title}</p>
            <p>{blogUpdate.content}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-6">
          <h1>Add a blog post here</h1>
          <form
            className="form-group"
            onSubmit={(e) => {
              e.preventDefault();
              addNewBlog({ variables: { title, content, author } });
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
    </div>
  );
};

export default CreateBlog;
