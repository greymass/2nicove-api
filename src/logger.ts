import winston from 'winston';

const { combine, timestamp, printf, prettyPrint, simple } = winston.format;

type TransportTypes =
	| winston.transports.ConsoleTransportInstance
	| winston.transports.FileTransportInstance;

const transports: TransportTypes[] = [new winston.transports.Console()];

const logformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

if (Bun.env.UNICOVE_LOG) {
	transports.push(
		new winston.transports.File({
			level: Bun.env.UNICOVE_LOG_LEVEL || 'info',
			filename: Bun.env.UNICOVE_LOG,
			format: logformat
		})
	);
}

if (Bun.env.UNICOVE_ERROR_LOG) {
	console.log(Bun.env);
	transports.push(
		new winston.transports.File({
			level: 'error',
			filename: Bun.env.UNICOVE_ERROR_LOG,
			format: logformat
		})
	);
}

export const logger = winston.createLogger({
	level: Bun.env.UNICOVE_LOG_LEVEL || 'info',
	format: combine(timestamp(), prettyPrint()),
	transports
});
