import * as React from "react";

function Logo(props) {
  return (
    <svg width="62px" height="62px" viewBox="0 0 512 512" fill="none" {...props}>
      <path fill="#fff" d="M0 0h512v512H0z" />
      <path
        d="M341.333 128v170.667h64v170.666H448V42.667c-58.88 0-106.667 47.786-106.667 85.333zm-106.666 64H192V42.667h-42.667V192h-42.666V42.667H64V192c0 47.147 38.187 85.333 85.333 85.333v192H192v-192c47.147 0 85.333-38.186 85.333-85.333V42.667h-42.666V192z"
        fill="#000"
      />
    </svg>
  );
}

const MemoLogo = React.memo(Logo);
export default MemoLogo;
