// import { useQuery, gql, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { Blog } from "./blog";
import { useQuery } from "@apollo/client/react";
import { useSubscription } from "@apollo/client/react";
import { gql } from "@apollo/client";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const GET_BLOGS = gql`
  query GetAllBlogs {
    getBlogs {
      id
      title
      content
      author
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

const Home = function () {
  const [blogs, setBlogs] = useState([]);
  const { loading, error, data } = useQuery(GET_BLOGS);
  const [blogUpdate, setBlogUpdate] = useState([]);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const showAlert = () => {
    setShow(true);
  };

  // setting subscription
  const { loading_ws, error_ws, data_ws } = useSubscription(
    UPDATE_BLOGS_SUBSCRIPTION,
    {
      onData: (data_ws) => {
        setBlogUpdate(data_ws.data.data.newBlog);
        console.log("data from subscription", data_ws.data.data.newBlog);
        console.log("blog update", blogUpdate);
        setBlogs((prevBlogs) => [...prevBlogs, data_ws.data.data.newBlog]);
        showAlert();
      },
    }
  );

  useEffect(() => {
    if (data?.getBlogs?.length > 0) {
      setBlogs(data.getBlogs);
    }
  }, [data]);

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
      <h1>Blog post</h1>
      {blogs.map(({ id, title, content, author }) => (
        <>
          <Blog title={title} content={content} author={author} id={id} />
        </>
      ))}
    </div>
  );
};

export default Home;
