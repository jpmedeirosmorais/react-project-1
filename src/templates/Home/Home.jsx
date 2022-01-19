import { Component } from "react";
import { Posts, Button, TextInput } from "../../components";
import "./styles.css";
import { loadPosts } from "../../utils/load-posts";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 9,
      searchValue: ''
    };
  }

  async componentDidMount() {
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(this.state.page, this.state.postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts,
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) 
    : 
    posts;

    return (
      <section className="container">
        <div className='header'>
          <h1 className="title">Welcome to page of posts</h1>

          <h3>Apresentation</h3>
          <p>
            This is a page created with react.js using a fake api from JSON Placeholder.
            Here you can search for posts and surf by the all 100 posts. And we are using a pagination too, in the bottom of the page you will find a button to load more posts if you want to see all posts, one by one.
          </p>
        </div>
        <div className='search-container'>
          {!!searchValue && <h1>Search value: {searchValue} </h1>}
          <TextInput 
            handleChange={this.handleChange} 
            searchValue={searchValue} 
            placeholder={'Type your search here'}
          />
        </div>
        
        {filteredPosts.length >= 1 ? 
          <Posts posts={filteredPosts} />
          :
          <h2>No posts found with the search</h2> 
        }
        
        <div className="button-container">
          {!searchValue && 
            <Button 
              text="Load more posts" 
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          }
        </div>
      </section>
    );
  }
}
