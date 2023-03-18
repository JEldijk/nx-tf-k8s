// import * as winston from 'winston';

// // We query process.env direct, due to that Convict has not been loaded yet
// const transports = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
//   ? [new winston.transport({ format: winston.format.simple() })]
//   : [
//       new winston.transports.Console({
//         format: process.env.LOG_COLOR
//           ? winston.format.combine(
//               winston.format.colorize(),
//               winston.format.align(),
//               winston.format.printf(
//                 (info) => `${info.timestamp} ${info.level}: ${info.message}`
//               )
//             )
//           : winston.format.combine(
//               winston.format.align(),
//               winston.format.printf(
//                 (info) => `${info.timestamp} ${info.level}: ${info.message}`
//               )
//             ),
//       }),
//       new winston.transports.Console({
//         level: 'error',
//         format: winston.format.combine(
//           winston.format.printf((info) => `${info.stack}\n`)
//         ),
//       }),
//     ];

// export const winstonConfig: winston.LoggerOptions = {
//   level: process.env.LOG_LEVEL,

//   format: winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     winston.format.errors({ stack: true }),
//     winston.format.splat()
//   ),

//   transports,
// };
