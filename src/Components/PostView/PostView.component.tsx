import styles from "./PostView.module.css";
import { Avatar, Card, Typography } from "@mui/material";
import React from "react";
import user from "assets/user.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import NoBorderRadiusCard from "../../Reusables/NoBorderRadiusCard";

dayjs.extend(relativeTime);

type PostViewProps = {
  imageUrl: string;
  name: string;
  date: string;
  contents: string;
  title: string;
};

const PostView: React.FC<PostViewProps> = ({
  imageUrl,
  name,
  date,
  contents,
  title,
}) => {
  return (
    <NoBorderRadiusCard className={styles.cardStyle}>
      <div className={styles.nameRow}>
        <Avatar className={styles.avatarStyles} src={imageUrl || user} />
        <div className={styles.nameDateColumn}>
          <Typography
            variant={"subtitle1"}
            sx={{ fontWeight: "bold" }}
            className={styles.nameRowName}
          >
            {name}
          </Typography>
          <Typography variant={"subtitle2"} className={styles.nameRowTime}>
            {dayjs().to(dayjs(date, "MM/DD/YYYY"), true)}
          </Typography>
        </div>
      </div>
      {title && (
        <Typography sx={{ fontWeight: "bold" }} variant={"body1"}>
          {title}
        </Typography>
      )}
      {contents && <Typography variant={"body2"}>{contents}</Typography>}
    </NoBorderRadiusCard>
  );
};

export default React.memo(PostView);
