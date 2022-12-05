import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function DiscoveryCardSkeleton() {
  return (
    <Card
      className="landing-card"
      sx={{
        minWidth: 250,
        maxHeight: 256,
        borderRadius: 10,
        backgroundColor: "#F7FAFC",
        boxShadow: "0",
        margin: "5px",
      }}
    >
      <Skeleton sx={{ height: 126, width: 220, margin: "0 auto" }} />
      <Box className="card-content" sx={{ backgroundColor: "white" }}>
        <CardContent sx={{ textAlign: "left", padding: "5px 16px" }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
      </Box>
    </Card>
  );
}
