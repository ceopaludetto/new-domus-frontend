import { Paper, PaperProps } from "@mui/material";

export function AuthenticationPaper({ children, sx, ...rest }: PaperProps) {
  return (
    <Paper elevation={0} sx={{ p: 5.5, my: 4, ...sx }} {...rest}>
      {children}
    </Paper>
  );
}
