import styles from "./Post.module.css";
import { getPost, getPosts, Post, useAppSelector } from "../../Store";
import PostView from "../../Components/PostView/PostView.component";
import { Link, useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import React from "react";
import NoBorderRadiusCard from "../../Reusables/NoBorderRadiusCard";
import CommentsView from "../../Components/CommentsView/CommentsView.component";

const PostComponent = () => {
  const param = useParams();
  const post = useAppSelector(getPost(param.postId));
  return (
    <div className={styles.pageRoot}>
      <div className={styles.commentsRoot}>
        {post ? (
          <>
            <PostView
              imageUrl={post?.author?.profilePicUrl}
              name={post?.author?.displayName}
              date={post?.date}
              contents={post?.contents}
              title={post?.title}
            />
            <NoBorderRadiusCard className={styles.cardStyle}>
              <Typography sx={{ fontWeight: "bold" }} variant={"body1"}>
                Comments
              </Typography>
            </NoBorderRadiusCard>

            {post?.comments?.length > 0 ? (
              <NoBorderRadiusCard className={styles.commentListHolder}>
                {post?.comments?.map((comment, index) => (
                  <div className={styles.commentListStyle}>
                    <CommentsView
                      key={comment.id}
                      name={comment.author.displayName}
                      date={comment.date}
                      contents={comment.contents}
                      comments={comment.comments}
                      imageUrl={comment.author.profilePicUrl}
                      level={0}
                      index={index}
                      total={post?.comments?.length}
                    />
                  </div>
                ))}
              </NoBorderRadiusCard>
            ) : (
              <NoBorderRadiusCard className={styles.cardStyle}>
                <Typography sx={{ textAlign: "center" }} variant={"body1"}>
                  No Comments
                </Typography>
              </NoBorderRadiusCard>
            )}
          </>
        ) : (
          <>
            <Typography variant={"h4"}>Post Not Found</Typography>
          </>
        )}
      </div>
    </div>
  );
};

PostComponent.title = "Post with AllPosts";

export default PostComponent;
