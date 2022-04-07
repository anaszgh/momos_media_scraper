import winston from 'winston';
import {SeqTransport} from '@datalust/winston-seq';

const logger = winston.createLogger({
    transports: [
      new SeqTransport({
        serverUrl: "http://loglands.com:5341",
        apiKey: "IMTQwOZNlvCdRNrGWG8c",
        onError: (e => { console.error(e) }),
      })
    ]
  });

  export default logger;