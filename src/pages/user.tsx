import React from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { userInfo } from "zmp-sdk";

const userData = {
  id: "2802822499267754069",
  name: "Nguyễn Đình Trung",
  avatar:
    "https://s120-ava-talk.zadn.vn/3/3/f/7/2/120/f02bf0c288008041976f147f27686f48.jpg",
  idByOA: undefined,
};

const UserPage = () => {
  const user = useRecoilValue<userInfo>(userState);
  const navigate = useNavigate();
  return (
    <Page className="page">
      <Box
        flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Avatar
            story="default"
            size={96}
            online
            src={userData.avatar}
            // src={user.avatar.startsWith("http") ? user.avatar : undefined}
          >
            {/* {user.avatar} */}
          </Avatar>
        </Box>
        <Box flex flexDirection="row" alignItems="center" ml={8}>
          <Box>
            <Text.Title>{userData.name}</Text.Title>
          </Box>
          <Box ml={4}>
            <Button
              onClick={() => {
                navigate("/form");
              }}
              size="small"
              icon={<Icon icon="zi-edit" />}
            />
          </Box>
        </Box>
      </Box>
      <Box m={0} p={0} mt={4}>
        <div className="section-container">
          <List>
            <List.Item title="Display name" subTitle={userData.name} />
            <List.Item title="ID" subTitle={userData.id} />
          </List>
        </div>
      </Box>
    </Page>
  );
};

export default UserPage;
