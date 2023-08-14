import { createServer } from "./server";
import { log } from "logger";
import adminRoute from './route/admin';
import userRoute from './route/user'
import { connect } from "./db/db";

const port = process.env.PORT || 5001;
const server = createServer();

server.use('/admin', adminRoute);
server.use('/user', userRoute);

connect();

server.listen(port, () => {
  log(`api running on ${port}`);
});
