import HttpMessagesData from "../data/http-code-messages.json"

interface CatchOptions {
  status?: boolean;
  message?: string;
  code?: number;
  options?: {
    status?: boolean;
    input?: number;
    [key: string]: any; // eslint-disable-line
  };
}

export function catchReponseMessage({
	code,
	message,
	options,
}: CatchOptions): CatchOptions {
	let object: CatchOptions = {
		status: code && code === 200 ? true : false,
		code: code || 500,
	}

	let messageError: CatchOptions
	for (messageError of HttpMessagesData) {
		if (messageError.code === code) {
			if (!message || message.length === 0)
				object.message = messageError.message
		}
	}

	if (message) object.message = message
	if (options) object = Object.assign(object, options)

	return object
}
