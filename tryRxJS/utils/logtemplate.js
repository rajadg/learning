/*jshint esversion: 6*/

const path = require("path");
const log4js = require("log4js");
const dateFormat = require("dateformat");

function setupLogging(logDefault = "debug", passThru=false) {
    const logTemplateStartTime = new Date();
    const scriptName = path.basename(process.argv[1], ".js");
    const timeStamp = dateFormat(logTemplateStartTime, "yyyy.mm.dd.HH.MM.ss");
    const logFile = path.join(path.dirname(process.argv[1]), "logs", `${scriptName}__${timeStamp}.log`);
    const appenders = { file_log: { type: "file", filename: logFile }, console_log: { type: "console" } };
    if (passThru) {
        appenders.console_log.layout = { type: 'messagePassThrough' };
    }
    const defaultAppenders = { appenders: ["file_log", "console_log"], level: logDefault };
    log4js.configure({ appenders: appenders, categories: { default: defaultAppenders } });
    console.log(`log_file: ${logFile}`);
    const logger = log4js.getLogger(scriptName.slice(0, 15).toLocaleUpperCase());
    logger.info(`Starting ${scriptName} ...`);
    process.on("exit", code => {
        const dur = new Date() - logTemplateStartTime;
        if (code > 0) {
            console.error(`Script Terminated unexpectedly. Please check ${logFile} for more details`);
        }
        logger.info(`${scriptName} Finished Execution.\n\nDuration: ${dur} millisecond(s)\n\n`);
    });
    return logger;
}

module.exports = {
    setupLogging: setupLogging
};
