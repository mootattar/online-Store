import { Skeleton, Card, CardContent, Box, Stack } from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 240, m: 2 }}>
      <CardContent>
        <Stack spacing={2}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ borderRadius: "10px" }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton variant="text" width="40%" />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={20}
                height={20}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="text" width="30%" />
            </Box>
          </Box>

          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />

          <Skeleton variant="text" width="100%" sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" width="30%" />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
