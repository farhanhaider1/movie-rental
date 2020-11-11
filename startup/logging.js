require('express-async-errors');
const winston = require('winston'); //? to log exceptions
// const {format,transports} = require('winston');
// const { combine, timestamp, label, printf } = format;

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
//   });

module.exports = function(){
    const logger = winston.createLogger({
        format: combine(
            timestamp(),
            prettyPrint()
        ),
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'logfile.log' })
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: 'rejections.log' })
        ]
    });
    //*uncaught exception
    process.on('uncaughtException',(ex)=>{
        logger.log({
            level: 'info',
            message: 'WE GOT AN UNCAUGHT EXCEPTION'+ ex.message
        });
        winston.error(ex.message,ex);
    });
    //*unHANDLED exception
    process.on('unhandledRejection',(ex)=>{
        logger.log({
            level: 'info',
            message: 'WE GOT AN unHANDLED EXCEPTION'+ex.message
        });
        winston.error(ex.message,ex);
    });
  
    winston.add(new winston.transports.File({filename: 'logfile.log'}));
};