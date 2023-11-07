import styles from "./AllPosts.module.css";
import { getPosts, Post, useAppSelector } from "../../Store";
import PostView from "../../Components/PostView/PostView.component";
import { Link } from "react-router-dom";

const AllPostsComponent = () => {
  const commentsData = useAppSelector(getPosts);
  return (
    <div className={styles.pageRoot}>
      <div className={styles.commentsRoot}>
        {commentsData.map((post) => (
          <Link className={styles.linkStyle} to={`/post/${post.id}`}>
            <PostView
              imageUrl={post.author.profilePicUrl}
              name={post.author.displayName}
              date={post.date}
              contents={post.contents}
              title={post.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

AllPostsComponent.title = "All Posts";

export default AllPostsComponent;
