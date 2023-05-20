import React from "react";
import { Avatar, Box, Text } from "zmp-ui";
import { userInfo } from "zmp-sdk";

interface UserProps {
  user: userInfo;
}

const userData = {
  id: "2802822499267754069",
  name: "Nguyễn Đình Trung",
  avatar:
    "https://s120-ava-talk.zadn.vn/3/3/f/7/2/120/f02bf0c288008041976f147f27686f48.jpg",
  idByOA: undefined,
};

const UserCard: React.FunctionComponent<UserProps> = ({ user }) => {
  return (
    <Box flex>
      <Avatar
        story="default"
        online
        // src={user.avatar.startsWith("http") ? user.avatar : undefined}
        src={user?.avatar ?? userData.avatar}
      >
        {/* {user.avatar} */}
      </Avatar>
      <Box ml={4}>
        <Text.Title>{user?.name ?? userData.name}</Text.Title>
        <Text>{user?.id ?? userData.id}</Text>
      </Box>
    </Box>
  );
};

export default UserCard;
