import { Component } from 'react';
import { Posts } from '../../components'
import './styles.css';
import { loadPosts } from '../../utils/load-posts';


export default class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  }

  render(){
    const { posts } = this.state;
    return(
      <section className="container">
        <Posts posts={posts}/>
      </section>
    );
  }
}