import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import type { User } from "../types/auth";
import type { Page } from "../types/page";

type Props = {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
};

export const InquiryHeader = ({ user, onLogout, onNavigate }: Props) => {
  return (
    <Box
      sx={{
        mx: "auto",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              maxWidth: 800,
              width: "100%",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              問い合わせ管理
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <Typography>{user.name}</Typography>

              <Button color="inherit" onClick={onLogout}>
                ログアウト
              </Button>
            </Stack>
          </Box>
        </Toolbar>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            py: 1,
            bgcolor: "background.paper",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => onNavigate("list")}>一覧</Button>

          <Button onClick={() => onNavigate("create")}>新規登録</Button>
        </Stack>
      </AppBar>
    </Box>
  );
};
