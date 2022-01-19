import { useState, useEffect, useCallback } from "react";
import { Posts, Button, TextInput } from "../../components";
import "./styles.css";
import { loadPosts } from "../../utils/";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(9);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback( async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
    console.log('uhuu');
    
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = useCallback(() => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }, [allPosts, page, postsPerPage, posts ]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setSearchValue(value);
  }, []);
  
  return (
    <section className="container">
      <div className="header">
        <h1 className="title">Welcome to page of posts</h1>

        <h3>Apresentation</h3>
        <p>
          This is a page created with react.js using a fake api from JSON
          Placeholder. Here you can search for posts and surf by the all 100
          posts. And we are using a pagination too, in the bottom of the page
          you will find a button to load more posts if you want to see all
          posts, one by one.
        </p>
      </div>
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue} </h1>}
        <TextInput
          handleChange={handleChange}
          searchValue={searchValue}
          placeholder={"Type your search here"}
        />
      </div>

      {filteredPosts.length >= 1 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <h2>No posts found with the search</h2>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};