import { SocialIcon } from "react-social-icons";

function TeamIcon ({ socialUrl }) {
  return <SocialIcon
    url={socialUrl}
    style={{ cursor: "pointer" }}
    bgColor="#f1f1f1" fgColor="var(--text)"
    target="_blank"
  />
}

export default TeamIcon;
