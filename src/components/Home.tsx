import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '../context/auth0-context';

function Home(): JSX.Element {
  let navigate = useNavigate();
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [posts, setPosts] = useState<any[]>([]);

  const deletePost = async (id: string) => {
    const accessToken = await getIdTokenClaims();
    await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/delete?postID=${id}`, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${accessToken.__raw}`,
      }),
    });
    _removePostFromView(id);
    navigate('/');
  };

  const _removePostFromView = (id: string) => {
    const index = posts.findIndex((post: { _id: string }) => post._id === id);
    if (index > -1) {
      const updatedPosts = [...posts];
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts); // Met à jour l'état pour refléter le changement
    }
  };

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blog/posts`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json = await response.json();
        setPosts(json);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="blog-area section">
      <div className="container">
        <div className="row">
          {posts && posts.map((post: { title: React.ReactNode; _id: any; author: any; }) => (
            <div className="col-lg-4 col-md-6" key={post._id}>
              <div className="card h-100">
                <div className="single-post post-style-1">
                  <div className="blog-image">
                    <img src="https://images.ctfassets.net/23aumh6u8s0i/7stduDuP1cBQXQpmzaBMTd/6f589aa58fe112ced6e1a3901a9c3dad/blog-image_psvipq" alt="Blog" />
                  </div>
                  <span className="avatar">
                    <img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" alt="Profile" />
                  </span>
                  <div className="blog-info">
                    <h4 className="title">
                      <span>
                        <b>{post.title}</b>
                      </span>
                    </h4>
                  </div>
                </div>
                <ul className="post-footer">
                  <li>
                    <Link to={`/post/${post._id}`} className="btn btn-sm btn-outline-secondary">View Post </Link>
                  </li>
                  <li>
                    {
                      isAuthenticated && (user.name === post.author) &&
                      <Link to={`/edit/${post._id}`} className="btn btn-sm btn-outline-secondary">Edit Post </Link>
                    }
                  </li>
                  <li>
                    {
                      isAuthenticated && (user.name === post.author) &&
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => deletePost(post._id)}>Delete Post</button>
                    }
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
