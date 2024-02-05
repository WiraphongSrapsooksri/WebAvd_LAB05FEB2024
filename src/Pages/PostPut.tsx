/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  Backdrop,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { TripsGetResponse } from "../Model/TripsGetResponse"
function PostPutPage() {
  const idx = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const countryRef = useRef<HTMLInputElement>();
  const coverImageRef = useRef<HTMLInputElement>();
  const detailRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const durationRef = useRef<HTMLInputElement>();
  const [data, setData] = useState<TripsGetResponse[]>([]);
  const [selectedDestination, setSelectedDestination] = useState(1);
  const [loading, setLoading] = useState(false);
  const [idxupdate, setidxupdate] = useState(false);
  const [isshowbttupdtae, setisshowbttupdtae] = useState(true);
  const handleIdxChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setidxupdate(event.target.value.trim() !== "");
    setisshowbttupdtae(true)
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          width={"100%"}
        >
          <Grid container spacing={2} sx={{ display: "block",padding:1}}>
            <Grid xs={4}>
              idx{" "}
              <TextField
                inputRef={idx}
                size="small"
                onChange={(event) => {
                  handleIdxChange(event);
                }}
              />
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Name{" "}
              <TextField
                inputRef={nameRef}
                size="small"
                value={data[0]?.name || ""}
              ></TextField>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Destination
              <Select
                sx={{ width: "100%" }}
                size="small"
                value={data[0]?.destinationid || selectedDestination}

                onChange={(event) => {
                  setSelectedDestination(+event.target.value);
                }}
              >
                <MenuItem value={1}>เอเชีย</MenuItem>
                <MenuItem value={2}>ยุโรป</MenuItem>
                <MenuItem value={3}>เอเชียตะวันออกเฉียงใต้</MenuItem>
                <MenuItem value={9}>ประเทศไทย</MenuItem>
              </Select>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Country <TextField inputRef={countryRef} size="small"  value={data[0]?.country || ""}></TextField>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              CoverImage{" "}
              <TextField inputRef={coverImageRef} size="small" value={data[0]?.coverimage || ""}></TextField>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Detail <TextField inputRef={detailRef} size="small" value={data[0]?.detail || ""}></TextField>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Price <TextField inputRef={priceRef} size="small" value={data[0]?.price || ""}></TextField>
            </Grid>
            <Grid xs={4} style={{ display: idxupdate ? "none" : "block" }}>
              Duration{" "}
              <TextField inputRef={durationRef} size="small" value={data[0]?.duration || ""}></TextField>
            </Grid>
          </Grid>

          <br />
          <br />
          <Grid container spacing={2}>
            <Grid xs={6} md={6}>
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={addNew}
                disabled={loading}
              >
                Add New
              </Button>
            </Grid>
            <Grid xs={6} md={6} style={{ display: !idxupdate ? "none" : "block" }}>
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={update}
                disabled={loading} 
              >
                Check by id
              </Button>
            </Grid>
            <Grid xs={6} md={6} style={{ display: isshowbttupdtae ? "none" : "block"}}>
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={update}
                disabled={loading} 
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );

  async function update() {
    const url = `https://cslab.it.msu.ac.th/tripbooking/trip/${idx.current?.value}`;
    const response = await axios.get(url);
    const trips: TripsGetResponse[] = response.data;
    console.log(trips.length);
    if (trips.length == 1) {
      setData(trips);
      setidxupdate(false);
      setisshowbttupdtae(false)
    } else {
      setidxupdate(true);
      // setisshowbttupdtae(false)
    }
    console.log(trips);
    return trips;
  }

  async function addNew() {
    const body = {
      name: nameRef.current?.value,
      country: countryRef.current?.value,
      destinationid: selectedDestination,
      coverimage: coverImageRef.current?.value,
      detail: detailRef.current?.value,
      price: priceRef.current?.value != "" ? priceRef.current?.value : 0,
      duration:
        durationRef.current?.value != "" ? durationRef.current?.value : 0,
    };

    setLoading(true); // Set loading to true before making the API call

    try {
      const url = `https://cslab.it.msu.ac.th/tripbooking/trip`;
      const response = await axios.post(url, body);

      if (response.status === 200) {
        // Handle success if needed
      } else {
        // Handle error if needed
      }

      const result = response.data;
      console.log(result);
    } catch (error) {
      // Handle API call error
      console.error("Error during API call:", error);
    } finally {
      setLoading(false); // Set loading back to false after the API response
    }
  }
}

export default PostPutPage;
