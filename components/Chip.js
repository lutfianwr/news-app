import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function ClickableChips({ setCountry }) {
  return (
    <Stack className="chip" direction="row" spacing={1}>
      <Chip
        label="english"
        variant="outlined"
        onClick={() => setCountry("en")}
      />
    </Stack>
  );
}
