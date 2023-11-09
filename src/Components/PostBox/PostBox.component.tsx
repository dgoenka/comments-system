import React from "react";
import styles from "./PostBox.module.css";

type PostBoxProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  showTitle?: boolean;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
};
const PostBox: React.FC<PostBoxProps> = ({
  onSubmit,
  showTitle = true,
  onCancel,
}) => {
  return (
    <form className={styles.postbox} onSubmit={onSubmit}>
      {showTitle && (
        <input
          className={styles.postboxTitle}
          type={"text"}
          placeholder={"Title"}
        />
      )}
      <textarea
        name="myTextarea"
        className={styles.postboxMessage}
        placeholder="Message"
        minLength={10}
        maxLength={10000}
      />
      <div className={styles.postboxButtonRow}>
        {onCancel && (
          <button
            onClick={onCancel}
            className={styles.postboxCancelButton}
            type={"submit"}
          >
            Cancel
          </button>
        )}
        <button className={styles.postboxButton} type={"submit"}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostBox;
