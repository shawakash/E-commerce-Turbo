import { createServer } from "./server";
import { log } from "logger";
import adminRoute from './route/admin';
import { connect } from "./db/db";

const port = process.env.PORT || 5001;
const server = createServer();

server.use('/admin', adminRoute);

connect();

server.listen(port, () => {
  log(`api running on ${port}`);
});
