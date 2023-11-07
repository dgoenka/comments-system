import styles from "./CommentsView.module.css";
import { Avatar, Card, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import user from "assets/user.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import NoBorderRadiusCard from "../../Reusables/NoBorderRadiusCard";
import { Comment } from "../../Store";

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
};

const CommentsView: React.FC<CommentViewProps> = ({
  name,
  imageUrl,
  contents,
  comments,
  level,
  index,
  total,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Box className={styles.cardStyle}>
      <div className={styles.nameRow}>
        <div className={styles.avatarHolder}>
          <Avatar src={imageUrl || user} className={styles.avatarStyles} />
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
            <div className={styles.lineReplyAndFurther}>
              {isShowing && <div className={styles.drawLineReplyRow} />}
              <Typography
                onClick={() => null}
                sx={{
                  color: "#3676D6",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  ...(isShowing ? { marginBottom: "20px" } : {}),
                }}
                variant={"body1"}
              >
                {`Reply`}
              </Typography>
              {isShowing && (
                <Typography
                  onClick={() => setIsShowing(false)}
                  sx={{
                    color: "#3676D6",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    ...(isShowing ? { marginBottom: "20px" } : {}),
                  }}
                  variant={"body1"}
                >
                  {`Hide Replies`}
                </Typography>
              )}
            </div>
            {comments?.length > 0 ? (
              isShowing ? (
                comments.map((comment, index) => (
                  <CommentsView
                    key={comment.id}
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
    </Box>
  );
};

export default React.memo(CommentsView);
