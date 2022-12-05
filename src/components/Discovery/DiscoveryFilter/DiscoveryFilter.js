import { Button, Divider, List } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CaptureDate from "./CaptureDate";
import DiscoveryAmount from "./DiscoveryAmount";
import DiscoveryHeading from "./DiscoveryHeading";
import "./DiscoveryFilter.css";

export default function DiscoveryFilter({
  handleFilterClick,
  sx,
  denomError,
  expiryDateError,
}) {
  const [, setSearchParams] = useSearchParams();

  const handleResetClick = () => {
    setSearchParams("");
  };

  return (
    <List sx={sx} className="filter-list">
      <Divider component="li" />
      <DiscoveryHeading heading="Filter By Amount">
        <List sx={{ padding: "8px 16px" }} component="div">
          <DiscoveryAmount heading="Min" />
        </List>
        <List sx={{ padding: "8px 16px" }} component="div">
          <DiscoveryAmount heading="Max" error={denomError} />
        </List>
      </DiscoveryHeading>
      <Divider component="li" />
      <DiscoveryHeading heading="Filter By Expiry Date">
        <List sx={{ padding: "8px 16px" }} component="div">
          <CaptureDate heading="From Date" />
        </List>
        <List sx={{ padding: "8px 16px" }} component="div">
          <CaptureDate heading="To Date" error={expiryDateError} />
        </List>
      </DiscoveryHeading>
      <List sx={{ padding: "8px 16px" }} component="div">
        <Divider component="li" />
        <Button
          fullWidth
          sx={{ color: "#fff", backgroundColor: "#3C286D", margin: "10px 0px" }}
          variant="contained"
          onClick={handleFilterClick}
          focusRipple
        >
          Filter
        </Button>
        <Button
          fullWidth
          sx={{ color: "#fff", backgroundColor: "#3C286D", margin: "10px 0px" }}
          variant="contained"
          onClick={handleResetClick}
          focusRipple
        >
          Reset Filter
        </Button>
      </List>
    </List>
  );
}
