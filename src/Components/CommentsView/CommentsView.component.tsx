import styles from "./CommentsView.module.css";
import { Avatar, Card, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import user from "assets/user.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import NoBorderRadiusCard from "../../Reusables/NoBorderRadiusCard";
import { Comment, useAppSelector } from "../../Store";
import { getReplyingTo, setReplyingTo } from "../../Store/replying";
import PostBox from "../PostBox/PostBox.component";
import { useDispatch } from "react-redux";

dayjs.extend(relativeTime);

type CommentViewProps = {
  imageUrl?: string;
  name: string;
  date: string;
  contents: string;
  comments?: Comment[];
  level: number;
  index: number;
  total: number;
  commentId: number | string;
};

const CommentsView: React.FC<CommentViewProps> = ({
  name,
  imageUrl,
  contents,
  comments,
  level,
  index,
  total,
  commentId,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const commentIdReplyingTo = useAppSelector(getReplyingTo);
  const dispatch = useDispatch();
  const isReplyingToThisComment = commentIdReplyingTo === commentId;
  return (
    <Box className={styles.cardStyle}>
      <div className={styles.nameRow}>
        <div className={styles.avatarHolder}>
          <div className={styles.avatarStyles}>
            <Avatar className={styles.avatarStyles} src={user} />
            <Avatar
              className={styles.avatarStylesOverlaid}
              src={imageUrl || user}
            />
          </div>
          {index < total - 1 && <div className={styles.drawLine} />}
        </div>
        <div className={styles.drawLineHorizontal} />
        <div className={styles.commentAndReplies}>
          <div className={styles.commentCloud}>
            <Typography
              variant={"subtitle1"}
              sx={{ fontWeight: "bold" }}
              className={styles.nameRowName}
            >
              {name}
            </Typography>

            {contents && <Typography variant={"body2"}>{contents}</Typography>}
          </div>
          <div className={styles.replyAndFurther}>
            <div
              className={`${styles.lineReplyAndFurther} ${
                isShowing ? styles.drawLineReplyRow : ""
              }`}
            >
              <div
                className={
                  isReplyingToThisComment
                    ? styles.lineReplyAndFurtherWhileReplying
                    : styles.lineReplyAndFurther
                }
              >
                {isReplyingToThisComment ? (
                  <PostBox
                    onSubmit={() => {
                      dispatch(setReplyingTo(null));
                    }}
                    onCancel={() => dispatch(setReplyingTo(null))}
                    showTitle={false}
                  />
                ) : (
                  <Typography
                    onClick={() => {
                      dispatch(setReplyingTo(commentId));
                    }}
                    sx={{
                      color: "#3676D6",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      ...(isShowing
                        ? { marginTop: "10px", marginBottom: "10px" }
                        : {}),
                    }}
                    variant={"body1"}
                  >
                    {`Reply`}
                  </Typography>
                )}
                {isShowing && (
                  <Typography
                    onClick={() => setIsShowing(false)}
                    sx={{
                      color: "#3676D6",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      ...(isShowing
                        ? { marginTop: "10px", marginBottom: "10px" }
                        : {}),
                    }}
                    variant={"body1"}
                  >
                    {`Hide Replies`}
                  </Typography>
                )}
              </div>
            </div>
            {comments?.length > 0 ? (
              isShowing ? (
                comments.map((comment, index) => (
                  <CommentsView
                    key={comment.id}
                    commentId={comment.id}
                    name={comment.author.displayName}
                    date={comment.date}
                    contents={comment.contents}
                    comments={comment.comments}
                    imageUrl={comment.author.profilePicUrl}
                    level={level + 1}
                    index={index}
                    total={comments.length}
                  />
                ))
              ) : (
                <div className={styles.nameRow}>
                  <Typography
                    onClick={() => setIsShowing(true)}
                    sx={{ fontWeight: "bold" }}
                    variant={"body1"}
                  >
                    {`${comments.length} Replies`}
                  </Typography>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
      {level === 0 && index === 0 && <div className={styles.firstRootItem} />}
    </Box>
  );
};

export default React.memo(CommentsView);
