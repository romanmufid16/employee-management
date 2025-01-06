import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console({})],
});

export default logger;

// import winston from "winston";

// const { combine, timestamp, printf, json } = winston.format;

// // Format log yang mudah dibaca
// const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
//   let log = `${timestamp} [${level}]: ${message}`;
//   if (Object.keys(metadata).length) {
//     log += ` | ${JSON.stringify(metadata)}`;
//   }
//   return log;
// });

// const logger = winston.createLogger({
//   level: "debug", // Tentukan level log yang diinginkan
//   format: combine(
//     timestamp(),
//     customFormat // Menggunakan format yang telah dibuat
//   ),
//   transports: [
//     new winston.transports.Console({
//       format: combine(
//         timestamp(),
//         winston.format.colorize(), // Memberikan warna pada level log
//         customFormat
//       ),
//     }),
//   ],
// });

// export default logger;
